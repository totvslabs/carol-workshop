FROM mcr.microsoft.com/mssql/server:2017-latest
RUN apt-get update && apt-get install unzip -y && rm -rf /var/lib/apt/lists/*
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=totvs@123

ARG DB_URL
ARG DB_FILE
ARG DB_LOGS
ARG DB_NAME

ENV DB_URL ${DB_URL}
ENV DB_FILE ${DB_FILE}
ENV DB_LOGS ${DB_LOGS}
ENV DB_NAME ${DB_NAME}

EXPOSE 1433
ADD entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]