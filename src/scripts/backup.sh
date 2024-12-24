#!/bin/bash

BACKUP_DIR="/home/joey/Documents/Security/project6/backups"
TIMESTAMP=$(date +"%F_%T")
BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"

# Load environment variables
dotenv -e "/home/joey/Documents/Security/project6/.env" -- bash -c '

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Perform the backup
PGPASSWORD=$DB_PASSWORD pg_dump -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -F c -b -v -f "$BACKUP_FILE"

# Optional: Remove backups older than 7 days
find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;