#!/bin/bash
cd $HOME/code/CoSlippiLeaderboard
NODE_BIN=/usr/local/bin/node
"$NODE_BIN" --loader ts-node/esm --no-warnings $HOME/code/CoSlippiLeaderboard/cron/fetchStats.ts 2>&1 | tee $HOME/code/CoSlippiLeaderboard/cron/logs/log.txt
