#!/bin/sh

# Ruta del directorio de backups
BACKUP_DIR="/backups"
mkdir -p $BACKUP_DIR

sleep 10

while true; do
  TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')
  mongodump --host=mongo_db --port=27017 --db=gym_db --username=admin --password=admin1234 --authenticationDatabase=admin --authenticationMechanism=SCRAM-SHA-1 --archive=$BACKUP_DIR/backup_$TIMESTAMP.gz
  echo "Backup creado en $BACKUP_DIR/backup_$TIMESTAMP.gz"
  sleep 1800
done
