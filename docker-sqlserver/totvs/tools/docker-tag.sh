#!/bin/bash
set -e
set -x

# Get All versions
docker login -u ${DOCKER_USER} -p ${DOCKER_PASS} docker.totvs.io

docker build --no-cache -t docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db \
--build-arg 'SERVICE=\\10.171.67.193\Servidor_Robot' \
--build-arg USER=${NET_USER} --build-arg PASS=${NET_PASS} .

docker pull "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-5" || true
docker pull "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-4" || true
docker pull "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-3" || true
docker pull "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-2" || true
docker pull "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-1" || true
docker pull "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-0" || true
# Set new tags for the old ones

docker tag "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-4" "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-5" || true
docker tag "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-3" "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-4" || true
docker tag "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-2" "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-3" || true
docker tag "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-1" "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-2" || true
docker tag "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-0" "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-1" || true
docker tag docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-0"
docker tag docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db "docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db"

# Images publication
docker push docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db
docker push docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-0
docker push docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-1 || true
docker push docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-2 || true
docker push docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-3 || true
docker push docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-4 || true
docker push docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-5 || true

# Cleaning docker images
docker rmi docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db
docker rmi docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-0 || true
docker rmi docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-1 || true
docker rmi docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-2 || true
docker rmi docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-3 || true
docker rmi docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-4 || true
docker rmi docker.totvs.io/engpro/snapeshot-12125-bra-mssql-db:d-5 || true