#!/usr/bin/env python3
"""
Durga Public School, Pilani - Automated Domain Migration & SEO Upgrade Tool
Use this script whenever switching domains or launching a new custom URL.

Usage:
    python update_domain.py "https://newdomain.com"
Example:
    python update_domain.py "https://dpspilani.edu.in"
"""

import sys
import glob
import re
import os

CURRENT_DEFAULT = "https://durgapublicschoolpilani.edu.in"

def update_domain(new_url):
    # Strip trailing slash
    new_url = new_url.strip().rstrip('/')
    if not new_url.startswith('http://') and not new_url.startswith('https://'):
        print("ERROR: Domain must start with http:// or https://")
        return

    print(f"Migrating domain from '{CURRENT_DEFAULT}' to '{new_url}'...\n")

    # 1. Update all HTML files
    html_files = sorted(glob.glob('*.html'))
    html_modified = 0
    for h in html_files:
        with open(h, 'r', encoding='utf-8') as f:
            content = f.read()
        if CURRENT_DEFAULT in content:
            new_content = content.replace(CURRENT_DEFAULT, new_url)
            with open(h, 'w', encoding='utf-8', newline='\r\n') as f:
                f.write(new_content)
            html_modified += 1
            print(f"  [HTML] Updated {h}")

    # 2. Update sitemap.xml
    if os.path.exists('sitemap.xml'):
        with open('sitemap.xml', 'r', encoding='utf-8') as f:
            sm = f.read()
        if CURRENT_DEFAULT in sm:
            new_sm = sm.replace(CURRENT_DEFAULT, new_url)
            with open('sitemap.xml', 'w', encoding='utf-8', newline='\r\n') as f:
                f.write(new_sm)
            print("  [SITEMAP] Updated sitemap.xml")

    # 3. Update robots.txt
    if os.path.exists('robots.txt'):
        with open('robots.txt', 'r', encoding='utf-8') as f:
            rb = f.read()
        if CURRENT_DEFAULT in rb:
            new_rb = rb.replace(CURRENT_DEFAULT, new_url)
            with open('robots.txt', 'w', encoding='utf-8', newline='\r\n') as f:
                f.write(new_rb)
            print("  [ROBOTS] Updated robots.txt")

    print(f"\nDomain migration complete! {html_modified} HTML files, sitemap.xml, and robots.txt synchronized to: {new_url}")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        target = sys.argv[1]
    else:
        print("Usage: python update_domain.py <NEW_URL>")
        print("Example: python update_domain.py https://dpspilani.edu.in")
        sys.exit(1)
    update_domain(target)

