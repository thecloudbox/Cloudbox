# TheCloudbox - Quick Start Guide

Get TheCloudbox running locally in 60 seconds!

## Fastest Start (Recommended)

```bash
chmod +x start-local.sh
./start-local.sh
```

That's it! Access the app at **http://localhost:3000**

## What You Get

- **Main Website**: http://localhost:3000
- **CloudSentinel AIOps**: http://localhost:3000/cloudsentinel
- **Logo Options**: http://localhost:3000/1 through http://localhost:3000/5
- **Services Page**: http://localhost:3000/services
- **Blog**: http://localhost:3000/blog
- **Case Studies**: http://localhost:3000/case-studies
- **Pricing**: http://localhost:3000/pricing

## Manual Setup (if script fails)

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cat > .env.local << EOF
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=TheCloudbox
EOF

# 3. Start dev server
npm run dev
```

## Full Deployment Options

For production deployment, use the comprehensive setup script:

```bash
chmod +x setup.sh
./setup.sh
```

Choose from:
1. Local Development
2. Docker Compose (Full Stack)
3. Kubernetes (Production)
4. Vagrant VM (Testing)
5. CloudSentinel Demo Setup

## Prerequisites

- **Node.js**: 20.x or higher
- **npm**: 10.x or higher

Check versions:
```bash
node --version  # Should be v20+
npm --version   # Should be 10+
```

## Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm run dev
```

### Dependencies fail to install
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Build errors
```bash
# Clean build and restart
rm -rf .next
npm run build
npm run dev
```

## Next Steps

1. **Customize Content**: Edit files in `app/` directory
2. **Add Services**: Update `lib/services-data.ts`
3. **Blog Posts**: Add to `lib/blog-data.ts`
4. **Branding**: Choose logo at /1 through /5
5. **Deploy**: Run `./setup.sh` for production options

## Project Structure

```
/opt/cloudbox/
├── app/                    # Next.js pages
│   ├── page.tsx           # Homepage
│   ├── cloudsentinel/     # AIOps platform
│   ├── blog/              # Blog pages
│   └── services/          # Services page
├── components/            # React components
│   ├── cloudsentinel/     # AIOps components
│   └── ui/               # UI components
├── lib/                   # Utilities & data
│   ├── aiops/            # CloudSentinel logic
│   └── blog-data.ts      # Blog content
├── public/               # Static assets
├── setup.sh              # Full deployment script
└── start-local.sh        # Quick start script
```

## Support

For issues or questions:
- Email: contact@thecloudbox.com
- Review logs: Check terminal output
- Check README.md for detailed docs

---

**TheCloudbox** - Delivering Infrastructure Solutions
