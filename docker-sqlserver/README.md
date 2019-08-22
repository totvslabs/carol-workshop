# snapshot-mssql-db

Este repositório permite criar um container contendo MSSQL + Backup da Base congelada com dicionário no Banco.

## Criando uma imagem

Para criar um container utilize o comando:

```bash
~$ docker build -t docker.totvs.io/my.user/snapeshot-mssql-db-12.1.25Bra \
--build-arg 'SERVICE=\\10.171.67.193\Servidor_Robot' \
--build-arg 'USER=sp01\seu.usuario' --build-arg 'PASS=sua@senha' .

```
*Importante*: é necessário possuir usuário/senha de rede TOTVS bem como possuir acesso à pasta de rede da Automação conforme a documentação:

```

Backup: \\10.171.67.193\Servidor_Robot\Backup_Base_Congelada\P12\P12Atual

Backup: \\10.171.67.193\Servidor_Robot\Backup_Base_Congelada\P12\P12Inov

Fonte:http://tdn.totvs.com/display/public/F1/3.+Base+Congelada
```
Neste script é utilizada a versão com dicionário no banco.

##Utilizando a umagem: 

Utilize o comando:

```
~$ docker run --rm -ti --network host docker.totvs.io/my.user/snapeshot-mssql-db-12.1.25Bra bash /totvs/tools/mssql.sh
```

Desta forma o banco de dados será carregado com usuário e senha "padrão" desta imagem: sa/Sn@pshot2020

Caso deseje utilizar sua própria senha para o usuário SA utilize o comando:

```
~$ docker run --rm -ti --network host -e SA_PASSWORD="Minh@senha123" docker.totvs.io/my.user/snapeshot-mssql-db-12.1.25Bra bash /totvs/tools/mssql.sh
```

Database location
---

https://www.dropbox.com/sh/ltzp8nlcf5e6en7/AABi6_KU4oneN_zd5VWmAHYDa?dl=0

