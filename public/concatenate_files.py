# Script 2: concatenate_files.py
# Place this script in ./public/ and run it from there.
# Paste the file_list from Script 1 below, then comment out any paths you want to exclude.
# It will read the contents of the specified files (relative to the project root) and write them
# to output.txt in the same directory (./public/), separated by headers.

import os

file_list = [
    # '.env.example',
    # '.env.local',
    # '.gitignore',
    # 'README.md',
    'app/action/page.tsx',
    'app/blackbox/page.tsx',
    'app/crisis/page.tsx',
    'app/globals.css',
    'app/layout.tsx',
    'app/page.tsx',
    'app/pipeline/page.tsx',
    'app/risks/page.tsx',
    'app/sources/page.tsx',
    'components/Navbar.tsx',
    # 'components/OIGFunnel.tsx',
    # 'next-env.d.ts',
    # 'package-lock.json',
    'package.json',
    'postcss.config.mjs',
    # 'public/concatenate_files.py',
    # 'public/list_files.py',
    
    # Error reading file: 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte
    'public/project_images/og-image.jpg',
    # 'public/project_images/og-image_prompt.txt',
    'tsconfig.json',
    # 'wherearethechildren/.gitignore',
    # 'wherearethechildren/README.md',
    # 'wherearethechildren/app/favicon.ico',
    'wherearethechildren/app/globals.css',
    'wherearethechildren/app/layout.tsx',
    'wherearethechildren/app/page.tsx',
    'wherearethechildren/eslint.config.mjs',
    'wherearethechildren/next-env.d.ts',
    'wherearethechildren/next.config.ts',
    # 'wherearethechildren/package-lock.json',
    # 'wherearethechildren/package.json',
    'wherearethechildren/postcss.config.mjs',
    # 'wherearethechildren/public/file.svg',
    # 'wherearethechildren/public/globe.svg',
    # 'wherearethechildren/public/next.svg',
    # 'wherearethechildren/public/vercel.svg',
    # 'wherearethechildren/public/window.svg',
    'wherearethechildren/tsconfig.json',
]


def main():
    output_file = 'output.txt'
    root_dir = '..'  # Project root is one level up from ./public/

    with open(output_file, 'w', encoding='utf-8') as out:
        for rel_path in file_list:
            full_path = os.path.join(root_dir, rel_path)
            if os.path.exists(full_path):
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    out.write(f"===== {rel_path} =====\n")
                    out.write(content)
                    out.write("\n\n")
                except Exception as e:
                    out.write(f"===== {rel_path} =====\n")
                    out.write(f"Error reading file: {str(e)}\n\n")
            else:
                out.write(f"===== {rel_path} =====\n")
                out.write("File not found.\n\n")

    print(f"Output written to {output_file}")

if __name__ == '__main__':
    main()
