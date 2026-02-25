# Viewing & Managing Your D1 Database

## 📊 View Your Database in Cloudflare Dashboard

### Access Your Database:
1. Go to: **https://dash.cloudflare.com/**
2. Select your account
3. Click **Workers & Pages** in the left sidebar
4. Click **D1 SQL Database**
5. Select **gv-certificates**

### In the Dashboard You Can:
- 📝 Run SQL queries directly
- 📊 View all tables and data
- 📈 See database metrics (rows, size, operations)
- 🔍 Browse table contents
- 📥 Export data
- ⚙️ Manage settings

**Your Database ID:** `7ec53162-9b5b-411d-a229-49485aae3bb9`

**Direct Link:** https://dash.cloudflare.com/?to=/:account/workers/d1

---

# 🚀 Hosting on Cloudflare Pages

## Option 1: Quick Deploy (Fastest)

### Step 1: Build Your App
```bash
cd 'C:\Users\User\GV Certificate\gv-certificate'
npm run build
```

### Step 2: Deploy to Cloudflare Pages
```bash
npx wrangler pages deploy .next --project-name=gv-certificate
```

### Step 3: Configure D1 Binding
After first deployment:
1. Go to **Cloudflare Dashboard** → **Workers & Pages**
2. Click your **gv-certificate** project
3. Go to **Settings** → **Functions**
4. Scroll to **D1 database bindings**
5. Click **Add binding**
   - Variable name: `DB`
   - D1 database: `gv-certificates`
6. Click **Save**

### Step 4: Redeploy
```bash
npx wrangler pages deploy .next --project-name=gv-certificate
```

Your app will be live at: `https://gv-certificate.pages.dev`

---

## Option 2: GitHub Integration (Recommended for Production)

### Step 1: Push to GitHub
```bash
cd 'C:\Users\User\GV Certificate\gv-certificate'
git add .
git commit -m "Add Cloudflare D1 integration"
git push origin main
```

### Step 2: Connect to Cloudflare Pages
1. Go to **https://dash.cloudflare.com/**
2. Click **Workers & Pages**
3. Click **Create application**
4. Select **Pages** tab
5. Click **Connect to Git**
6. Select your **gv-certificate** repository
7. Configure build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
8. Click **Save and Deploy**

### Step 3: Add D1 Binding
1. In your Pages project, go to **Settings** → **Functions**
2. Under **D1 database bindings**:
   - Variable name: `DB`
   - D1 database: `gv-certificates`
3. Click **Save**

### Step 4: Trigger Redeploy
1. Go to **Deployments** tab
2. Click **Retry deployment** on the latest deployment

**Done!** Every push to GitHub will automatically deploy.

---

## 🗄️ Using Remote Database (Production)

Currently you're using **local D1** database. To use the **remote (production)** database:

### Migrate to Remote Database
```bash
npm run db:migrate -- --remote
```

### Query Remote Database
```bash
wrangler d1 execute gv-certificates --remote --command="SELECT * FROM certificates;"
```

### View Remote Data
```bash
wrangler d1 execute gv-certificates --remote --command="SELECT certificate_no, identification, created_at FROM certificates ORDER BY created_at DESC LIMIT 10;"
```

---

## 📱 Access Your Deployed App

After deployment, your app will be available at:

**Default URL:** `https://gv-certificate.pages.dev`

**Custom Domain:** You can add a custom domain in Cloudflare Pages settings.

---

## 🔧 Environment Setup

### For Production (Remote D1):
Your deployed app automatically uses the remote D1 database via the binding.

### For Local Development with Remote D1:
```bash
# Use remote database locally
npm run cf:dev
```

This will:
- Connect to your remote D1 database
- Serve your app locally
- Perfect for testing before deployment

---

## 📊 Monitoring & Management

### View Database Activity
```bash
# Count certificates
wrangler d1 execute gv-certificates --remote --command="SELECT COUNT(*) as total FROM certificates;"

# Recent uploads
wrangler d1 execute gv-certificates --remote --command="SELECT * FROM uploads ORDER BY uploaded_at DESC LIMIT 5;"

# Search certificates
wrangler d1 execute gv-certificates --remote --command="SELECT * FROM certificates WHERE identification LIKE '%Ruby%';"
```

### Export Database
```bash
# Backup your remote database
wrangler d1 export gv-certificates --remote --output=backup.sql
```

### Database Metrics in Dashboard:
- Total rows
- Database size
- Read/Write operations
- Query performance

---

## 🎯 Quick Reference

**Dashboard:** https://dash.cloudflare.com/

**View D1:** Workers & Pages → D1 SQL Database → gv-certificates

**Deploy App:** 
```bash
npm run build
npx wrangler pages deploy .next --project-name=gv-certificate
```

**Check Deployment:**
```bash
wrangler pages deployment list --project-name=gv-certificate
```

**Your Database ID:** `7ec53162-9b5b-411d-a229-49485aae3bb9`

---

## 🆘 Common Issues

**"Database not found on deploy"**
- Make sure D1 binding is configured in Pages settings
- Variable name must be exactly `DB`

**"Different data locally vs production"**
- Local uses `.wrangler/state/` database
- Production uses remote Cloudflare D1
- They are separate databases

**"Build fails on Cloudflare"**
- Check build logs in Cloudflare dashboard
- Ensure all dependencies are in `package.json`
- Verify build command is `npm run build`
