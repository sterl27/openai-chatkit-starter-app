import os
import time
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Your list: [sora_url, src_url]
video_data = [
    # ["https://sora.chatgpt.com/d/gen_xxx", "https://videos.openai.com/..."],
]

DOWNLOAD_DIR = "sora_downloads"
MAX_WORKERS = 6
CHUNK_SIZE = 1024 * 1024  # 1MB
CONNECT_TIMEOUT = 10
READ_TIMEOUT = 60

os.makedirs(DOWNLOAD_DIR, exist_ok=True)

# Thread-safe print (so logs don't interleave badly)
print_lock = threading.Lock()

def log(msg: str):
    with print_lock:
        print(msg)

def create_session() -> requests.Session:
    session = requests.Session()
    retries = Retry(
        total=5,
        connect=5,
        read=5,
        backoff_factor=1.0,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"],
        raise_on_status=False,
    )
    adapter = HTTPAdapter(max_retries=retries, pool_connections=MAX_WORKERS, pool_maxsize=MAX_WORKERS)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session

def download_one(item, session: requests.Session):
    sora_url, src_url = item
    file_id = sora_url.rstrip("/").split("/")[-1] if sora_url else f"unknown_{int(time.time()*1000)}"
    filename = os.path.join(DOWNLOAD_DIR, f"{file_id}.mp4")
    temp_filename = filename + ".part"

    if not src_url:
        return ("skipped", file_id, "No source URL")

    # already done?
    if os.path.exists(filename) and os.path.getsize(filename) > 0:
        return ("skipped", file_id, "Already downloaded")

    try:
        with session.get(src_url, stream=True, timeout=(CONNECT_TIMEOUT, READ_TIMEOUT)) as resp:
            if resp.status_code == 403:
                return ("failed", file_id, "403 Forbidden (signed URL may be expired)")
            if resp.status_code >= 400:
                return ("failed", file_id, f"HTTP {resp.status_code}")

            expected = int(resp.headers.get("Content-Length", 0))
            downloaded = 0

            with open(temp_filename, "wb") as f:
                for chunk in resp.iter_content(chunk_size=CHUNK_SIZE):
                    if not chunk:
                        continue
                    f.write(chunk)
                    downloaded += len(chunk)

            if expected > 0 and downloaded != expected:
                try:
                    os.remove(temp_filename)
                except OSError:
                    pass
                return ("failed", file_id, f"Incomplete download ({downloaded}/{expected})")

            os.replace(temp_filename, filename)
            return ("ok", file_id, filename)

    except Exception as e:
        try:
            if os.path.exists(temp_filename):
                os.remove(temp_filename)
        except OSError:
            pass
        return ("failed", file_id, str(e))

def dedupe_by_src(data):
    seen = set()
    deduped = []
    for sora_url, src_url in data:
        key = src_url or f"none:{sora_url}"
        if key in seen:
            continue
        seen.add(key)
        deduped.append((sora_url, src_url))
    return deduped

def main():
    items = dedupe_by_src(video_data)
    log(f"Starting concurrent downloads to ./{DOWNLOAD_DIR} with {MAX_WORKERS} workers...")
    log(f"Input: {len(video_data)} | After de-dup: {len(items)}")

    session = create_session()

    ok = failed = skipped = 0
    start = time.time()

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = [executor.submit(download_one, item, session) for item in items]
        for fut in as_completed(futures):
            status, file_id, info = fut.result()
            if status == "ok":
                ok += 1
                log(f"[OK] {file_id} -> {info}")
            elif status == "failed":
                failed += 1
                log(f"[FAIL] {file_id}: {info}")
            else:
                skipped += 1
                log(f"[SKIP] {file_id}: {info}")

    elapsed = time.time() - start
    log("\nDone.")
    log(f"Success: {ok} | Failed: {failed} | Skipped: {skipped} | Elapsed: {elapsed:.1f}s")

if __name__ == "__main__":
    main()