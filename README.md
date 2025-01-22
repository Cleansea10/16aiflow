<!-- markdownlint-disable MD030 -->

<img width="100%" src="https://github.com/16aiflowAI/16aiflow/blob/main/images/16aiflow.png?raw=true"></a>

# 16aiflow - Build LLM Apps Easily

[![Release Notes](https://img.shields.io/github/release/16aiflowAI/16aiflow)](https://github.com/16aiflowAI/16aiflow/releases)
[![Discord](https://img.shields.io/discord/1087698854775881778?label=Discord&logo=discord)](https://discord.gg/jbaHfsRVBW)
[![Twitter Follow](https://img.shields.io/twitter/follow/16aiflowAI?style=social)](https://twitter.com/16aiflowAI)
[![GitHub star chart](https://img.shields.io/github/stars/16aiflowAI/16aiflow?style=social)](https://star-history.com/#16aiflowAI/16aiflow)
[![GitHub fork](https://img.shields.io/github/forks/16aiflowAI/16aiflow?style=social)](https://github.com/16aiflowAI/16aiflow/fork)

English | [中文](./i18n/README-ZH.md) | [日本語](./i18n/README-JA.md) | [한국어](./i18n/README-KR.md)

<h3>Drag & drop UI to build your customized LLM flow</h3>
<a href="https://github.com/16aiflowAI/16aiflow">
<img width="100%" src="https://github.com/16aiflowAI/16aiflow/blob/main/images/16aiflow.gif?raw=true"></a>

## ⚡Quick Start

Download and Install [NodeJS](https://nodejs.org/en/download) >= 18.15.0

1. Install 16aiflow
    ```bash
    npm install -g 16aiflow
    ```
2. Start 16aiflow

    ```bash
    npx 16aiflow start
    ```

    With username & password

    ```bash
    npx 16aiflow start --16aiflow_USERNAME=user --16aiflow_PASSWORD=1234
    ```

3. Open [http://localhost:3000](http://localhost:3000)

## 🐳 Docker

### Docker Compose

1. Clone the 16aiflow project
2. Go to `docker` folder at the root of the project
3. Copy `.env.example` file, paste it into the same location, and rename to `.env` file
4. `docker compose up -d`
5. Open [http://localhost:3000](http://localhost:3000)
6. You can bring the containers down by `docker compose stop`

### Docker Image

1. Build the image locally:
    ```bash
    docker build --no-cache -t 16aiflow .
    ```
2. Run image:

    ```bash
    docker run -d --name 16aiflow -p 3000:3000 16aiflow
    ```

3. Stop image:
    ```bash
    docker stop 16aiflow
    ```

## 👨‍💻 Developers

16aiflow has 3 different modules in a single mono repository.

-   `server`: Node backend to serve API logics
-   `ui`: React frontend
-   `components`: Third-party nodes integrations
-   `api-documentation`: Auto-generated swagger-ui API docs from express

### Prerequisite

-   Install [PNPM](https://pnpm.io/installation)
    ```bash
    npm i -g pnpm
    ```

### Setup

1.  Clone the repository

    ```bash
    git clone https://github.com/16aiflowAI/16aiflow.git
    ```

2.  Go into repository folder

    ```bash
    cd 16aiflow
    ```

3.  Install all dependencies of all modules:

    ```bash
    pnpm install
    ```

4.  Build all the code:

    ```bash
    pnpm build
    ```

    <details>
    <summary>Exit code 134 (JavaScript heap out of memory)</summary>  
      If you get this error when running the above `build` script, try increasing the Node.js heap size and run the script again:

        export NODE_OPTIONS="--max-old-space-size=4096"
        pnpm build

    </details>

5.  Start the app:

    ```bash
    pnpm start
    ```

    You can now access the app on [http://localhost:3000](http://localhost:3000)

6.  For development build:

    -   Create `.env` file and specify the `VITE_PORT` (refer to `.env.example`) in `packages/ui`
    -   Create `.env` file and specify the `PORT` (refer to `.env.example`) in `packages/server`
    -   Run

        ```bash
        pnpm dev
        ```

    Any code changes will reload the app automatically on [http://localhost:8080](http://localhost:8080)

## 🔒 Authentication

To enable app level authentication, add `16aiflow_USERNAME` and `16aiflow_PASSWORD` to the `.env` file in `packages/server`:

```
16aiflow=user
16aiflow_PASSWORD=1234
```

## 🌱 Env Variables

16aiflow support different environment variables to configure your instance. You can specify the following variables in the `.env` file inside `packages/server` folder. Read [more](https://github.com/16aiflowAI/16aiflow/blob/main/CONTRIBUTING.md#-env-variables)

## 📖 Documentation

[16aiflow Docs](https://docs.16aiflowai.com/)

## 🌐 Self Host

Deploy 16aiflow self-hosted in your existing infrastructure, we support various [deployments](https://docs.16aiflowai.com/configuration/deployment)

-   [AWS](https://docs.16aiflowai.com/deployment/aws)
-   [Azure](https://docs.16aiflowai.com/deployment/azure)
-   [Digital Ocean](https://docs.16aiflowai.com/deployment/digital-ocean)
-   [GCP](https://docs.16aiflowai.com/deployment/gcp)
-   [Alibaba Cloud](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Flowise社区版)
-   <details>
      <summary>Others</summary>

    -   [Railway](https://docs.16aiflowai.com/deployment/railway)

        [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/pn4G8S?referralCode=WVNPD9)

    -   [Render](https://docs.16aiflowai.com/deployment/render)

        [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://docs.16aiflowai.com/deployment/render)

    -   [HuggingFace Spaces](https://docs.16aiflowai.com/deployment/hugging-face)


    -   [Elestio](https://elest.io/open-source/flowiseai)

        [![Deploy on Elestio](https://elest.io/images/logos/deploy-to-elestio-btn.png)](https://elest.io/open-source/flowiseai)

    -   [Sealos](https://cloud.sealos.io/?openapp=system-template%3FtemplateName%3Dflowise)

        [![](https://raw.githubusercontent.com/labring-actions/templates/main/Deploy-on-Sealos.svg)](https://cloud.sealos.io/?openapp=system-template%3FtemplateName%3Dflowise)

    -   [RepoCloud](https://repocloud.io/details/?app_id=29)

        [![Deploy on RepoCloud](https://d16t0pc4846x52.cloudfront.net/deploy.png)](https://repocloud.io/details/?app_id=29)

      </details>

## ☁️ 16aiflow Cloud

[Get Started with 16aiflow Cloud](https://16aiflow.com/)

## 📄 License

Source code in this repository is made available under the [Apache License Version 2.0](LICENSE.md).
