# My Web Page [💻]
<br/><br/>

[Access Webpage Here](https://me.zemingzhang.com/Windows-Desktop-Profile/index.html)
# 🖥️ <br/> ⌨️ 🖱️<br/>

<br/><br/><br/><br/>
``` 
me.zemingzhang.com/Windows-Desktop-Profile/index.html
```


## CI/CD (dev -> tg -> prod)
This repo now includes a GitHub Actions pipeline for this static site:

- `develop` branch -> deploys to **dev** environment.
- `tg` branch -> deploys to **tg** environment.
- `main` branch -> deploys to **prod** environment.

Workflow file:
- `.github/workflows/static-cicd.yml`

### Required GitHub Environment Secrets
Create the same secret names under each environment (`dev`, `tg`, `prod`):

- `SSH_HOST`
- `SSH_PORT` (optional, defaults to `22`)
- `SSH_USERNAME`
- `SSH_PRIVATE_KEY`
- `DEPLOY_PATH` (absolute target directory on your server)

Suggested site mapping for your domain:
- Prod (`main`) -> `https://me.zemingzhang.com/Windows-Desktop-Profile/index.html`
- Dev/TG -> separate server paths or subfolders (for example `/var/www/dev/Windows-Desktop-Profile` and `/var/www/tg/Windows-Desktop-Profile`).
