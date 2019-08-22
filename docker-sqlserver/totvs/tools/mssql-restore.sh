#!/bin/bash
set -e

if [ -z "$SA_PASSWORD" ] ; then
    echo "password empty, using container default"
    export SA_PASSWORD=totvs@123
fi

mkdir -p /data

bash /totvs/tools/mssql-maintenance.sh start

until nc -z localhost 1433; do
    sleep 1
done

for file in `find /backup -iname '*.bak'`; do
    filepath=`dirname ${file}`
    filename=`basename ${file}`
    dbname=${filename%%.*}

    cat <<EOF >/tmp/${dbname}.sql
USE [master]
RESTORE DATABASE [${dbname}] FROM  DISK = N'${file}' WITH  FILE = 1,  MOVE N'${dbname}' TO N'/data/${dbname}.mdf',  MOVE N'${dbname}_log' TO N'/data/${dbname}_log.ldf',  NOUNLOAD,  STATS = 5
EOF

    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i /tmp/${dbname}.sql
    rm -rf /tmp/${dbname}.sql

    rm -rf ${file}
done

bash /totvs/tools/mssql-maintenance.sh stop

while nc -z localhost 1433; do
    sleep 1
done

bash /totvs/tools/mssql-maintenance.sh clean