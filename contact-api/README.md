# Portfolio Contact API

Custom email API for the portfolio contact form. Sends inquiries to your Gmail inbox via SMTP — no Formspree, Web3Forms, or other form SaaS.

**Stack:** Node.js only (`http` + `tls`) — zero npm dependencies.

---

## Local development

1. Copy env file and add your **Gmail App Password**:

   ```powershell
   cd contact-api
   copy env.example .env
   ```

2. Edit `.env`:

   ```env
   SMTP_USER=sumitchatterjee502@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   CONTACT_TO=sumitchatterjee502@gmail.com
   ALLOWED_ORIGINS=http://localhost:3000,https://sumitchatterjee502.github.io
   PORT=8787
   ```

   **Gmail App Password:** Google Account → Security → 2-Step Verification → App passwords → Mail.

3. Start the API:

   ```powershell
   npm run dev
   ```

4. In another terminal, start the portfolio (`portfolio/.env.local` should contain `NEXT_PUBLIC_CONTACT_API_URL=http://localhost:8787`):

   ```powershell
   cd portfolio
   npm run dev
   ```

5. Open http://localhost:3000 → click **Hire Me** → submit the form.

---

## Deploy to Render (one click)

1. Push this repo to GitHub (if not already).

2. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**.

3. Connect repository **`sumitchatterjee502.github.io`**.

4. Render reads [`render.yaml`](../render.yaml) at the repo root and creates **`portfolio-contact-api`**.

5. When prompted, set secret env vars:
   - **`SMTP_USER`** → `sumitchatterjee502@gmail.com`
   - **`SMTP_PASS`** → your Gmail App Password (16 chars, no spaces)

6. Click **Apply**. Wait for deploy to finish.

7. Copy your service URL, e.g. `https://portfolio-contact-api.onrender.com`.

8. Verify health check:

   ```
   https://portfolio-contact-api.onrender.com/health
   ```

   Should return: `{"ok":true,"service":"portfolio-contact-api"}`

9. Link the live portfolio to the API:
   - GitHub repo → **Settings** → **Secrets and variables** → **Actions**
   - New secret: **`CONTACT_API_URL`** = `https://portfolio-contact-api.onrender.com` (no trailing slash)
   - Push any commit to `main` (or re-run the Deploy workflow) to rebuild the site with the API URL baked in.

10. Test on https://sumitchatterjee502.github.io — submit the contact form.

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SMTP_USER` | Yes | Gmail address used to send mail |
| `SMTP_PASS` | Yes | Gmail App Password |
| `SMTP_HOST` | No | Default `smtp.gmail.com` |
| `SMTP_PORT` | No | Default `465` |
| `CONTACT_TO` | No | Inbox for inquiries (default: `SMTP_USER`) |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins |
| `PORT` | No | Set automatically on Render |

---

## API

**POST** `/api/contact`

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "phone": "+91 98765 43210",
  "message": "Project details...",
  "subject": "Hire Me — Portfolio Inquiry",
  "source": "Navbar"
}
```

**GET** `/health` — service status
