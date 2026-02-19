# Script 1: list_files.py
# Run this from the project root directory (e.g., ~/Desktop/projects/wherearethechildren)
# It lists all files recursively, excluding node_modules, in a Python list format for copying.

import os

def main():
    root_dir = '.'  # Current directory (project root)
    exclude_dirs = ['node_modules', '.git', '.next']
    file_list = []

    for root, dirs, files in os.walk(root_dir):
        # Modify dirs in place to skip excluded directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            # Get relative path from root
            rel_path = os.path.relpath(os.path.join(root, file), root_dir)
            file_list.append(rel_path)

    # Sort the list for consistency
    file_list.sort()

    # Print in Python list format
    print('file_list = [')
    for f in file_list:
        print(f"    '{f}',")
    print(']')

if __name__ == '__main__':
    main()
