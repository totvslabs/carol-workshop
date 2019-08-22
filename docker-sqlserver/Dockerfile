FROM alpine

#RUN apk update && apk add samba-client
#RUN smbclient -U ${USER} -c 'prompt off; recurse on; cd \Backup_Base_Congelada\P12\BRA\Protheus12.1.25\sql_dicbanco\DataBase; mget *.bak' ${SERVICE} ${PASS}

FROM mcr.microsoft.com/mssql/server
#FROM mcr.microsoft.com/mssql/server:2017-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=totvs@123

EXPOSE 1433

COPY *.bak /backup/
COPY *.mdf /backup/
COPY *.ldf /backup/
ADD totvs /totvs

RUN apt-get update || true; apt-get install -y \
    netcat
RUN bash /totvs/tools/mssql-restore.sh

CMD ["bash", "/totvs/tools/mssql.sh"]