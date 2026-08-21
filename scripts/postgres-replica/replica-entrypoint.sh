#!/bin/bash
# Runs every time the replica container starts.
# On first boot (empty data dir) it clones the primary with pg_basebackup, using
# -R so Postgres writes standby.signal and primary_conninfo for us automatically.
# On every later restart, Postgres just starts normally and resumes streaming.
set -e

if [ -z "$(ls -A /var/lib/postgresql/data 2>/dev/null)" ]; then
  echo "postgres-replica: empty data directory, cloning from ${PRIMARY_HOST}..."

  until pg_basebackup \
    -h "${PRIMARY_HOST}" \
    -p "${PRIMARY_PORT}" \
    -D /var/lib/postgresql/data \
    -U "${PGUSER}" \
    -Fp -Xs -P -R; do
    echo "postgres-replica: primary not ready yet, retrying in 2s..."
    sleep 2
  done

  chmod 0700 /var/lib/postgresql/data
  echo "postgres-replica: clone complete, starting as standby."
fi

exec docker-entrypoint.sh postgres