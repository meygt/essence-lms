#!/bin/bash
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/opt/lms/backups"
mkdir -p $BACKUP_DIR

# Database backup
echo "Creating database backup..."
PGPASSWORD="Essence123##" pg_dump -h 168.231.68.22 -U postgres -d essenceqa_lms > "$BACKUP_DIR/db_backup_$DATE.sql"

# Compress backup
gzip "$BACKUP_DIR/db_backup_$DATE.sql"

# Keep only last 7 days of backups
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: db_backup_$DATE.sql.gz"