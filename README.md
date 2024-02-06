# Stremio Addon Manager
Manage your Stremio addons with ease.

**WARNING: Use this at your own risk.  This is not an official Stremio product and may break your Stremio installation.  No support or warranty is given.**

## Features
- Re-order your addons (including Cinemeta)
- Remove non-protected addons

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Docker
Run the following commands to build and run the app in a Docker container:

```bash
$ docker build -t stremio-addon-manager .
$ docker run -p 8080:80 stremio-addon-manager
```

The app will be accessible at `http://localhost:8080`.

## Thanks
Big thank you to `Sleeyax` and `<Code/>` for the conversations and code snippets that made this really easy to implement.
