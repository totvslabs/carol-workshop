#!/bin/bash
set -e

/opt/mssql/bin/sqlservr &
MSSQL_PID=$!

until nc -z localhost 1433; do
    sleep 1
done

bash /totvs/tools/mssql-attach.sh

trap "kill ${MSSQL_PID}" SIGINT SIGTERM
wait $MSSQL_PID
