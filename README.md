# Western Restaurant Netlify Site

A bilingual Western cowboy restaurant website built with Next.js for Netlify. It includes a reservation form that emails a configured Gmail inbox and a Google-protected admin page.

## Local Setup

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` before testing auth or email delivery.

## Netlify Environment Variables

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAILS`
- `RESERVATION_TO_EMAIL`
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`

`GMAIL_APP_PASSWORD` should be a Gmail app password, not your normal Google account password.
