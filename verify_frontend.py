import os
from playwright.sync_api import sync_playwright

os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
os.makedirs("/home/jules/verification/videos", exist_ok=True)

def run_cuj(page):
    # 1. Load Homepage
    page.goto("http://localhost:5173", wait_until="domcontentloaded")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/homepage.png")

    # 2. Visit Login Page
    page.goto("http://localhost:5173/login", wait_until="domcontentloaded")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/login.png")

    # 3. Visit Admin Analytics
    page.goto("http://localhost:5173/admin/analytics", wait_until="domcontentloaded")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/admin_analytics.png")

    # 4. Visit Shipping Info
    page.goto("http://localhost:5173/shipping-info", wait_until="domcontentloaded")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/shipping_info.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
