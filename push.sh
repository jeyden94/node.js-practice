#!/bin/bash

# Generate a short hash (first 8 characters of current timestamp)
HASH=$(date +%s | sha256sum | head -c 8)

# Add all changes
git add .

# Commit with hash in message
git commit -m "Update - $HASH"

# Push to origin
git push origin main