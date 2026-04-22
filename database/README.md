# Database folder

This folder is mounted into the mysql container at `/database` and can hold SQL files you want to import.

To import a SQL file into the `task` database (container has user `task` / password `task`):

```bash
docker compose exec mysql bash -c 'mysql -u task -p task < /database/database.sql'
```

To export the database from the container back to the `database` folder:

```bash
docker compose exec mysql bash -c 'mysqldump -u task -p task > /database/export.sql'
```
