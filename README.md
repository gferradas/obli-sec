# Server

API Server made with Node.js and Express.js
Meant to be a middleman between the client and the database.

## Usage

### Local Install

1. Clone the repository
2. Run `npm install` to install the dependencies (you can use the pnpm or bun if you want)
3. Run `npm run start` to start the server

### Docker

1. Pull the image from Docker Hub: `docker pull iotashine/obli-server:latest`
   - Theres multiple tags available
   - `latest` is the latest stable version
   - `bun` runs on bun instead of node
   - `alpine` is a less stable but smaller version
2. Run the image:
   ```bash
   docker run -p 443:443 -e "DB_HOST=<your_DB_instance_here>" -e "DB_PORT=3306" -e "DB_USER=<your_DB_User" -e "DB_PASS=<your_DB_Password>" -e "PORT=443" iotashine/obli-server:latest
   ```
   - You can also use `docker-compose` to run the image
   - Example `docker-compose.yml` file:
   ```yml
   version: 3
   services:
     server:
       image: iotashine/obli-server:latest
       ports:
         - 443:443
       environment:
         - DB_HOST=<your_DB_instance_here>
         - DB_PORT=3306
         - DB_USER=<your_DB_User>
         - DB_PASS=<your_DB_Password>
         - PORT=443
   ```

You can also clone the repository and build the image yourself.

```bash
git clone git@github.com:gferradas/obli-sec.git
git switch server
npm install
npm run build
```

## API Endpoints

- /base
- /checkout
- /checkToken
- /choferesRoutes
- /disableTFA
- /googleLogin
- /login
- /register
- /requestQr
- /verify

## Project Structure

```
└── 📁obli-sec
    └── .dockerignore
    └── .eslintrc.js
    └── .gitignore
    └── .prettierrc
    └── app.js
    └── buildImages.sh
    └── 📁config
        └── database.js
        └── server.js
    └── DockerfileAlpine
    └── DockerfileBun
    └── DockerfileLatest
    └── package-lock.json
    └── package.json
    └── pushImages.sh
    └── README.md
    └── 📁routes
        └── base.js
        └── checkout.js
        └── checkToken.js
        └── choferesRoutes.js
        └── disableTFA.js
        └── googleLogin.js
        └── login.js
        └── register.js
        └── requestQr.js
        └── verify.js
    └── 📁utils
        └── create2fa.js
        └── cryptoUtils.js
        └── regex.js
        └── verify.js
```
