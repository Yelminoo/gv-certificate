This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## GV Certificate - Gemstone Certificate Generator

Professional gemstone certificate generator with QR verification and digital signature support.

## Getting Started

### PostgreSQL + Prisma Setup (DigitalOcean)

1. Copy env template and add your DigitalOcean connection string:

```bash
cp .env.example .env.local
```

2. Set `DATABASE_URL` in `.env.local`.

3. Install dependencies and generate Prisma Client:

```bash
npm install
npm run prisma:generate
```

4. Create/apply database migration:

```bash
npm run prisma:migrate -- --name init
```

### Image Upload Storage (DigitalOcean Spaces)

Uploads are stored in DigitalOcean Spaces via `/api/upload`.

1. Add Spaces values in `.env.local`:
  - `SPACES_REGION`
  - `SPACES_BUCKET`
  - `SPACES_ACCESS_KEY_ID`
  - `SPACES_SECRET_ACCESS_KEY`
  - `SPACES_PROJECT_PREFIX` (example: `gv-certificate/uploads`)

2. Keep one shared Space and separate projects by prefix:
  - `project-a/uploads/...`
  - `project-b/uploads/...`

3. Upload API returns:
  - `url` (public image URL)
  - `key` (object key in Spaces)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Printing Certificates (7" x 4")

The certificates are designed to print at exactly **7 inches wide × 4 inches tall**.

### Browser Print Settings:
1. Click the "Print / Save PDF" button on the certificate page
2. In the print dialog, configure:
   - **Paper size**: Custom or 7 × 4 inches
   - **Scale**: 100% (IMPORTANT - do not use "Fit to page")
   - **Margins**: None
   - **Layout**: Landscape
   - **Background graphics**: Enabled (to print colors and gradients)

### Save as PDF:
1. Click "Print / Save PDF"
2. Select "Save as PDF" or "Microsoft Print to PDF" as destination
3. Use the same settings as above
4. The PDF will be exactly 7" × 4" and ready for professional printing

### Professional Printing:
- The certificate is designed at 300 DPI for print quality
- Use high-quality cardstock paper (7" × 4" custom cut)
- Recommended paper weight: 250-300 GSM
- Enable color printing for best results

## Certificate Logging

Every certificate generated is automatically saved:

### Storage Options:

**1. Cloudflare D1 Database (Production):**
- Certificates stored in serverless SQL database
- Image uploads tracked in database
- Fast queries and searches
- See [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) for setup instructions

**2. File-based Logging (Development):**
- Logs are stored in the `/logs` directory at the project root
- Two formats are created daily:
  - `certificates_YYYY-MM-DD.log` - Human-readable text format
  - `certificates_YYYY-MM-DD.json` - Machine-readable JSON format

### Cloudflare D1 Setup (Legacy)

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create gv-certificates

# Run migrations
wrangler d1 execute gv-certificates --file=./migrations/0001_initial_schema.sql
```

See detailed instructions in [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md)

### API Endpoints

**Save Certificate:**
```
POST /api/certificates
```

**Get Certificate:**
```
GET /api/certificates?certNo=CERT001
```

**Search Certificates:**
```
GET /api/certificates?search=ruby
```

### Logged Information:
- Timestamp of certificate creation
- Certificate number
- Issue date
- Gemstone identification
- Weight, dimensions, cut, shape, color
- Comments
- Origin information
- Verifier and certifier names
- Uploaded image filename
- Signature information

### Viewing Logs:
- Open the `/logs` directory in your project
- Text logs can be viewed in any text editor
- JSON logs can be parsed programmatically or viewed in a JSON viewer

**Note:** Log files are excluded from version control (.gitignore)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
