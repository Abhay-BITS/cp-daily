from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

ROOT = Path(__file__).parent

st.set_page_config(
    page_title="CP Daily | TLE Eliminators",
    page_icon=str(ROOT / "public" / "tle-logo.svg"),
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown(
    """
    <style>
      header[data-testid="stHeader"], #MainMenu, footer, [data-testid="stToolbar"], [data-testid="stDecoration"] { display: none !important; }
      .block-container, [data-testid="stAppViewBlockContainer"] { padding: 0 !important; max-width: 100% !important; }
      [data-testid="stVerticalBlock"] { gap: 0 !important; }
      iframe { display: block; height: 100vh !important; border: 0; }
      html, body, [data-testid="stAppViewContainer"], [data-testid="stMain"], .main { overflow: hidden !important; }
    </style>
    """,
    unsafe_allow_html=True,
)


@st.cache_data
def load_app() -> str:
    return (ROOT / "streamlit_build" / "index.html").read_text()


components.html(load_app(), height=900, scrolling=True)
