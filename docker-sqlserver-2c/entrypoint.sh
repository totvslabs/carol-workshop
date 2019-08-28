#!/bin/bash
#
# Copyright 2017-2019, TOTVS S.A.
# All rights reserved.
#
set -eo pipefail

[ ! -d "/database" ] && mkdir /database

# intentionally mixed spaces and tabs here
# tabs are stripped by "<<-EOF", spaces are kept in the output
# create sql file to create database and schema of product
cat >"/database/setup.sql" <<-EOF
CREATE DATABASE [${DB_NAME}] ON (FILENAME = '/database/${DB_FILE}'),(FILENAME = '/database/${DB_LOGS}') FOR ATTACH
EOF

cat >"/database/setup.sh" <<-EOF
#!/bin/bash
# wait for sql server to start
while ! timeout 1 bash -c "echo > /dev/tcp/localhost/1433" </dev/null 2>/dev/null; do sleep 1; done;
# wait for sql server finish startup transactions
sleep 3
# run the setup script to create the database and the schema
"/opt/mssql-tools/bin/sqlcmd" -S "localhost" -U "sa" -P "${SA_PASSWORD}" -i "/database/setup.sql"
EOF

if [ ! -f "/database/flag" ]; then
  echo "Downloading Database backup"
  wget -q -O /tmp/database.zip ${DB_URL}
  unzip /tmp/database.zip -d /database
  rm /tmp/database.zip
  touch /database/flag
  chmod +x /database/setup.sh
  /database/setup.sh &
fi

# run sql server process
"/opt/mssql/bin/sqlservr"

# If argument is not related, we assume that
# user wants to run his own process, for example
# a "bash" shell to explore this image
exec "$@"