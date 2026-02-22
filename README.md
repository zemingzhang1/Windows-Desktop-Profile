# My Web Page [💻]
<br/><br/>

[Access Webpage Here](https://me.zemingzhang.com/Windows-Desktop-Profile/index.html)
# 🖥️ <br/> ⌨️ 🖱️<br/>

<br/><br/><br/><br/>
``` 
me.zemingzhang.com/Windows-Desktop-Profile/index.html
```


## CI/CD (all branches + manual deploy)
This repo includes a GitHub Actions pipeline for this static site.

Workflow file:
- `.github/workflows/main.yml`

Branch routing (automatic):
- `main` -> **prod**
- `tg` -> **tg**
- every other branch -> **dev**

Manual trigger (`workflow_dispatch`):
- You can pick `auto`, `dev`, `tg`, or `prod`.
- `prod` manual deploy is allowed only from the `main` branch.

### Required GitHub Environment Secrets
Create these same secret names under each environment (`dev`, `tg`, `prod`):

- `SSH_HOST`
- `SSH_PORT` (optional, defaults to `22`)
- `SSH_USERNAME`
- `SSH_PRIVATE_KEY`
- `DEPLOY_PATH` (absolute target directory on your server)

Suggested site mapping for your domain:
- Prod (`main`) -> `https://me.zemingzhang.com/Windows-Desktop-Profile/index.html`
- Dev/TG -> separate server paths or subfolders (for example `/var/www/dev/Windows-Desktop-Profile` and `/var/www/tg/Windows-Desktop-Profile`).
