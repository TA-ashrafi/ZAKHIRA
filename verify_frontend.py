from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://127.0.0.1:5173", wait_until="networkidle")
    page.wait_for_timeout(1000)

    # Take Homepage Screenshot
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1280, "height": 800},
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
