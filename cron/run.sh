#!/bin/bash -l
DIR_PATH=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$DIR_PATH/.." 

mkdir -p cron/data
if [ ! -f cron/data/players-new.json ]; then
  echo '[]' >> cron/data/players-new.json
fi
mkdir -p cron/logs
if [ ! -f cron/logs/log.txt ]; then
  touch cron/logs/log.txt
fi

node --loader ts-node/esm --no-warnings cron/fetchStats.ts 2>&1 | tee cron/logs/log.txt
