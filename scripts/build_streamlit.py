"""Inline the Vite build into one self-contained HTML file for the Streamlit wrapper."""
import base64
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
OUT = ROOT / "streamlit_build" / "index.html"


def main():
    html = (DIST / "index.html").read_text()

    def inline_script(m):
        js = (DIST / m.group(1).lstrip("/")).read_text().replace("</script", "<\\/script")
        return f'<script type="module">{js}</script>'

    def inline_style(m):
        return f"<style>{(DIST / m.group(1).lstrip('/')).read_text()}</style>"

    html = re.sub(r'<script type="module" crossorigin src="([^"]+)"></script>', inline_script, html)
    html = re.sub(r'<link rel="stylesheet" crossorigin href="([^"]+)">', inline_style, html)

    logo = base64.b64encode((DIST / "tle-logo.svg").read_bytes()).decode()
    html = html.replace("/tle-logo.svg", f"data:image/svg+xml;base64,{logo}")

    if 'src="/assets' in html or 'href="/assets' in html:
        raise SystemExit("Unresolved /assets reference left in build")

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(html)
    print(f"Wrote {OUT.relative_to(ROOT)} ({len(html) // 1024} KB)")


if __name__ == "__main__":
    main()
