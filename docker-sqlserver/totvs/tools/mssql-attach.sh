#!/bin/bash
set -e

for file in `find /data -iname '*.mdf'`; do
    filepath=`dirname ${file}`
    filename=`basename ${file}`
    dbname=${filename%%.*}

    for log in `find /data -iname "${dbname}*.ldf"`; do
        logpath=${log}
    done

    cat <<EOF >/tmp/${dbname}.sql
USE [master]
CREATE DATABASE ${dbname} ON (FILENAME = '${file}'), (FILENAME = '${logpath}') FOR ATTACH;
EOF

    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i /tmp/${dbname}.sql
    rm -rf /tmp/${dbname}.sql
done
