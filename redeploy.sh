#!/bin/sh

# 1. Fetch the latest code from remote
git pull -f origin main

# 2. Install Client dependencies
cd client && pnpm install

# 3. Build Client
pnpm run build && cd ..

# 4. Create and activate virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

# Install Python dependencies
pip install --no-cache-dir -r requirements.txt

# Deactivate virtual environment
deactivate


# 4. Restart application
pm2 restart ai-fastapi