### MySQL docker helper files

This folder contains configuration files and a small Dockerfile used by the `mysql` service in `compose.yaml`.

Mounts from compose:
- `/var/lib/mysql` (persistent volume `mysql_data`)
- `./docker/mysql/utf8mb4.cnf` → `/etc/mysql/conf.d/utf8mb4.cnf`
- `./docker/mysql/my.cnf` → `/etc/mysql/conf.d/my.cnf`
- `./database` is mounted into the container at `/database`

Accessing the container:
- Open a shell in the mysql container:
  ```bash
  docker compose exec mysql bash
  ```

Importing a SQL file (from host):
```bash
docker compose exec mysql bash -c 'mysql -u task -p task < /database/database.sql'
```

Exporting the DB from the container:
```bash
docker compose exec mysql bash -c 'mysqldump -u task -p task > /database/export.sql'
```
