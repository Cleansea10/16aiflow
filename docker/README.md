# 16aiflow Docker Hub Image

Starts Flowise from [DockerHub Image](https://hub.docker.com/r/flowiseai/flowise)

## Usage

1. Create `.env` file and specify the `PORT` (refer to `.env.example`)
2. `docker compose up -d`
3. Open [http://localhost:3000](http://localhost:3000)
4. You can bring the containers down by `docker compose stop`

## 🔒 Authentication

1. Create `.env` file and specify the `PORT`, `16aiflow_USERNAME`, and `16aiflow_PASSWORD` (refer to `.env.example`)
2. Pass `16aiflow_USERNAME` and `16aiflow_PASSWORD` to the `docker-compose.yml` file:
    ```
    environment:
        - PORT=${PORT}
        - 16aiflow_USERNAME=${16aiflow_USERNAME}
        - 16aiflow_PASSWORD=${16aiflow_PASSWORD}
    ```
3. `docker compose up -d`
4. Open [http://localhost:3000](http://localhost:3000)
5. You can bring the containers down by `docker compose stop`

## 🌱 Env Variables

If you like to persist your data (flows, logs, apikeys, credentials), set these variables in the `.env` file inside `docker` folder:

-   DATABASE_PATH=/root/.16aiflow
-   APIKEY_PATH=/root/.16aiflow
-   LOG_PATH=/root/.16aiflow/logs
-   SECRETKEY_PATH=/root/.16aiflow
-   BLOB_STORAGE_PATH=/root/.16aiflow/storage

Flowise also support different environment variables to configure your instance. Read [more](https://docs.flowiseai.com/environment-variables)
