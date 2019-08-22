#!/bin/bash
set -e

PID_FILE=/var/run/mssql-maintenace.pid

function start {

    if [ -f "${PID_FILE}" ]; then
        echo "mssql-maintenance already running!"
        exit 1
    fi

    /opt/mssql/bin/sqlservr &
    MSSQL_PID=$!

    echo -n $MSSQL_PID > ${PID_FILE}
    exit 0
}

function stop {

    if [ ! -f "${PID_FILE}" ]; then
        echo "mssql-maintenance is not running!"
        exit 1
    fi

    MSSQL_PID=`cat "${PID_FILE}"`

    kill ${MSSQL_PID}
    rm -rf "${PID_FILE}"
}


function clean {

    if [ -f "${PID_FILE}" ]; then
        echo "mssql-maintenance is running, stop it before clean!"
        exit 1
    fi

    rm -rf /var/opt/mssql/data/*
}

${@}