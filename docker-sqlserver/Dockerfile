FROM mcr.microsoft.com/mssql/server:2017-latest
RUN apt-get update && apt-get install unzip -y && rm -rf /var/lib/apt/lists/*
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=totvs@123

ARG DB_URL
ARG DB_FILE
ARG DB_LOGS
ARG DB_NAME

ENV DB_URL ${DB_URL:-https://www.dropbox.com/s/47nz9u2cocz8r4p/2019-08-22-protheus-base-congelada.zip?dl=0}
ENV DB_FILE ${DB_FILE:-P12125MNTDB.mdf}
ENV DB_LOGS ${DB_LOGS:-P12125MNTDB_log.ldf}
ENV DB_NAME ${DB_NAME:-P12125MNTDB}

EXPOSE 1433
ADD entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]
