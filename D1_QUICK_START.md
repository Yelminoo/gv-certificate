# Quick Start: Cloudflare D1 Integration

## Overview
This application now supports Cloudflare D1 database for storing certificates and tracking image uploads.

## Features
✅ Certificate data storage in D1 database
✅ Image upload tracking
✅ Search and query certificates
✅ Automatic fallback to file logging in local dev
✅ RESTful API for certificate management

## Quick Setup (5 minutes)

### 1. Install Wrangler
```bash
npm install -g wrangler
```

### 2. Login to Cloudflare
```bash
wrangler login
```

### 3. Create Database
```bash
wrangler d1 create gv-certificates
```

**Important:** Copy the `database_id` from the output!

### 4. Update Configuration
Edit `wrangler.toml` and replace `YOUR_DATABASE_ID`:
```toml
database_id = "your-actual-database-id-here"
```

### 5. Run Migration
```bash
npm run db:migrate
```

### 6. Test It
```bash
# View tables
npm run db:query "SELECT name FROM sqlite_master WHERE type='table';"

# Should show: certificates, uploads
```

## Using NPM Scripts

```bash
# Migrate database schema
npm run db:migrate

# Run custom query
npm run db:query "SELECT * FROM certificates LIMIT 5;"

# List all D1 databases
npm run db:list

# Get database info
npm run db:info

# Run local dev with D1
npm run cf:dev

# Deploy to Cloudflare Pages
npm run cf:deploy
```

## Database Schema

### Certificates Table
- `id` - Auto-increment primary key
- `certificate_no` - Unique certificate number
- `issue_date` - Date of issue
- `identification` - Gemstone type
- `weight` - Carat weight
- `dimensions`, `cut`, `shape`, `color` - Optional properties
- `comment1`, `comment2` - Lab comments
- `origin` - Geographic origin
- `verified_by`, `certified_by` - Gemologist names
- `image_url`, `signature_url` - File URLs
- `created_at`, `updated_at` - Timestamps

### Uploads Table
- `id` - Auto-increment primary key
- `file_name` - Stored filename
- `original_name` - Original upload name
- `file_size`, `mime_type` - File metadata
- `url` - Public URL
- `uploaded_at` - Timestamp

## API Usage Examples

### Save a Certificate
```javascript
const response = await fetch('/api/certificates', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    certificateNo: 'CERT001',
    date: '2026-02-19',
    identification: 'Natural Ruby',
    weight: '2.50',
    // ... other fields
  })
})
```

### Get Certificate by Number
```javascript
const response = await fetch('/api/certificates?certNo=CERT001')
const certificate = await response.json()
```

### Search Certificates
```javascript
const response = await fetch('/api/certificates?search=ruby')
const { certificates, count } = await response.json()
```

### Get All Certificates (Paginated)
```javascript
const response = await fetch('/api/certificates?limit=50&offset=0')
const { certificates, count } = await response.json()
```

## Local Development

### Without D1 (File-based logging)
```bash
npm run dev
```
Certificates will be logged to `/logs` directory.

### With D1 (Full features)
```bash
npm run cf:dev
```
Certificates will be saved to D1 database.

## Production Deployment

### Option 1: Cloudflare Pages (Recommended)
```bash
npm run cf:deploy
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Connect repository in Cloudflare Pages
3. Configure bindings:
   - D1: `DB` → `gv-certificates`
4. Deploy automatically on push

## Troubleshooting

**"Database not available"**
- You're in local dev mode without Wrangler
- Use `npm run cf:dev` instead of `npm run dev`
- Or accept file-based logging for development

**"Table not found"**
- Run migration: `npm run db:migrate`
- Verify: `npm run db:query "SELECT * FROM certificates;"`

**"Permission denied"**
- Check Cloudflare account has D1 enabled
- Verify `wrangler login` is successful

## Data Export & Backup

```bash
# Export to SQL file
wrangler d1 export gv-certificates --output=backup.sql

# View recent certificates
npm run db:query "SELECT certificate_no, identification, created_at FROM certificates ORDER BY created_at DESC LIMIT 10;"

# Count total certificates
npm run db:query "SELECT COUNT(*) as total FROM certificates;"
```

## Next Steps

1. ✅ Setup D1 database
2. ✅ Create first certificate
3. 📊 Query your certificates via API
4. 🚀 Deploy to Cloudflare Pages
5. 🔍 Build search functionality in UI

For detailed documentation, see [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md)
