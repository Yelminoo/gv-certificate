# Cloudflare D1 Setup Instructions

## Prerequisites
- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)
- Logged in to Wrangler (`wrangler login`)

## Step 1: Create D1 Database

```bash
# Create the D1 database
wrangler d1 create gv-certificates

# Copy the database_id from the output and update wrangler.toml
```

## Step 2: Run Database Migrations

```bash
# Apply the schema migration
wrangler d1 execute gv-certificates --file=./migrations/0001_initial_schema.sql

# Verify the tables were created
wrangler d1 execute gv-certificates --command="SELECT name FROM sqlite_master WHERE type='table';"
```

## Step 3: Create R2 Bucket (Optional - for image storage)

```bash
# Create R2 bucket for images
wrangler r2 bucket create gv-certificate-images
```

## Step 4: Update Configuration

1. Update `wrangler.toml` with your database_id
2. Copy `.dev.vars.example` to `.dev.vars` and fill in values

## Step 5: Local Development

```bash
# Run with Cloudflare bindings locally
wrangler pages dev .next --compatibility-date=2024-01-01 --d1=DB=gv-certificates

# Or use the regular dev server (will use file-based logging)
npm run dev
```

## Step 6: Deploy to Cloudflare Pages

```bash
# Build the application
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy .next

# Or connect your GitHub repository for automatic deployments
```

## Environment Variables (Cloudflare Pages)

In Cloudflare Pages dashboard:
1. Go to Settings > Environment Variables
2. Add D1 binding: DB → gv-certificates
3. Add R2 binding (if using): IMAGES → gv-certificate-images

## Database Queries

### View all certificates
```bash
wrangler d1 execute gv-certificates --command="SELECT * FROM certificates ORDER BY created_at DESC LIMIT 10;"
```

### Search for a certificate
```bash
wrangler d1 execute gv-certificates --command="SELECT * FROM certificates WHERE certificate_no = 'CERT001';"
```

### View all uploads
```bash
wrangler d1 execute gv-certificates --command="SELECT * FROM uploads ORDER BY uploaded_at DESC LIMIT 10;"
```

### Export database
```bash
wrangler d1 export gv-certificates --output=backup.sql
```

## API Endpoints

### Save Certificate
```bash
POST /api/certificates
Content-Type: application/json

{
  "certificateNo": "CERT001",
  "date": "2026-02-19",
  "identification": "Natural Ruby",
  "weight": "2.50",
  ...
}
```

### Get Certificate by Number
```bash
GET /api/certificates?certNo=CERT001
```

### Search Certificates
```bash
GET /api/certificates?search=ruby
```

### Get All Certificates
```bash
GET /api/certificates?limit=100&offset=0
```

## Troubleshooting

### Database not available locally
- Make sure you're running with wrangler
- Or the app will fall back to file-based logging

### Migration errors
- Check SQL syntax in migration file
- Ensure database_id is correct in wrangler.toml

### Deployment issues
- Verify all bindings are configured in Cloudflare Pages
- Check build output for errors
- Review function logs in Cloudflare dashboard
