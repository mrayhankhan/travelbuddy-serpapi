import subprocess
import sys
import io

# Fix Windows console encoding for Unicode characters
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Install pypdf (modern successor to PyPDF2)
subprocess.run([sys.executable, "-m", "pip", "install", "pypdf", "-q"], check=False)

from pypdf import PdfReader
import os

base = r"c:\Users\parsh\OneDrive\Desktop\HotelAPI\TravelAgent_HotelAPI"
pdfs = [
    "HotelAPI_for development agent.pdf",
    "HotelAPI features list.pdf",
    "HotelAPI (1).pdf",
    "HotelAPI SRS.pdf",
    "HotelAPI presentation.pdf"
]

for name in pdfs:
    path = os.path.join(base, name)
    print(f"\n{'='*60}")
    print(f"DOCUMENT: {name}")
    print(f"{'='*60}")
    try:
        reader = PdfReader(path)
        for page in reader.pages:
            text = page.extract_text()
            if text:
                print(text)
    except Exception as e:
        print(f"Error: {e}")
