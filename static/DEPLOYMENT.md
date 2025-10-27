# Deployment Guide - FarmDirect

Quick guide to deploy your FarmDirect static website to various hosting platforms.

## 📁 Project Structure

The `static` folder contains everything needed for deployment:
- `index.html` - Homepage
- `pages/` - All 18 inner pages
- `scripts/` - 4 JavaScript files
- `styles/` - Custom CSS
- `assets/` - Images and icons folder
- `README.md` - Complete documentation

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free)

1. **Create a new repository** on GitHub
2. **Upload the static folder contents**:
   ```bash
   cd static
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/farmdirect.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: main / root
   - Save
4. **Access your site**: `https://yourusername.github.io/farmdirect/`

### Option 2: Netlify (Free)

**Method A: Drag & Drop**
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login
3. Drag the `static` folder to the upload area
4. Site deploys automatically
5. Custom domain available

**Method B: Git Integration**
1. Push code to GitHub/GitLab
2. Connect repository to Netlify
3. Build settings:
   - Base directory: `static`
   - Build command: (leave empty)
   - Publish directory: `.` or `/`
4. Deploy

### Option 3: Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Configure:
   - Root Directory: `static`
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
4. Deploy

### Option 4: Cloudflare Pages (Free)

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect Git repository
3. Configure:
   - Build command: (leave empty)
   - Build output directory: `static`
4. Deploy

### Option 5: Traditional Web Hosting

**For cPanel/Shared Hosting:**
1. Access your hosting File Manager or FTP
2. Navigate to `public_html` or `www` folder
3. Upload all contents of the `static` folder
4. Ensure `index.html` is in the root
5. Access via your domain

**FTP Upload:**
```bash
# Using FileZilla or any FTP client
- Host: ftp.yourdomain.com
- Username: your_username
- Password: your_password
- Upload path: /public_html/
```

### Option 6: Amazon S3 (Static Website Hosting)

1. Create S3 bucket
2. Enable static website hosting
3. Upload static folder contents
4. Set bucket policy for public read
5. Access via S3 endpoint or CloudFront

## ⚙️ Configuration

### Update Site URL

If deploying to a subdirectory, update links in HTML files:
```html
<!-- Change -->
<a href="pages/products.html">
<!-- To -->
<a href="/subdirectory/pages/products.html">
```

### Custom Domain

**For GitHub Pages:**
1. Add CNAME file with your domain
2. Update DNS records:
   - Type: CNAME
   - Name: www
   - Value: yourusername.github.io

**For Netlify/Vercel:**
1. Go to domain settings
2. Add custom domain
3. Update DNS as instructed

## 🔧 Pre-Deployment Checklist

- [ ] Test all pages locally
- [ ] Verify all links work
- [ ] Check responsive design
- [ ] Test cart functionality
- [ ] Verify localStorage works
- [ ] Check images load correctly
- [ ] Test demo login
- [ ] Validate HTML/CSS
- [ ] Check browser compatibility
- [ ] Test on mobile devices

## 📱 Testing Locally

Open `index.html` in a browser directly, or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve static

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 🎨 Customization Before Deploy

### 1. Update Branding
- Replace logo in header
- Update company name
- Change color scheme in Tailwind config

### 2. Update Contact Information
- Email addresses
- Phone numbers
- Physical address
- Social media links

### 3. Replace Images
- Add your product images to `assets/images/`
- Update image URLs in JavaScript files
- Replace placeholder images

### 4. Configure Products
- Edit `scripts/home.js`
- Update product data
- Add real product information

## 🔒 Security Considerations

**Before Production:**
- [ ] Implement real backend authentication
- [ ] Add payment gateway integration
- [ ] Enable HTTPS (automatic on most platforms)
- [ ] Add form validation server-side
- [ ] Implement rate limiting
- [ ] Add CSRF protection for forms
- [ ] Sanitize all user inputs
- [ ] Don't store sensitive data in localStorage

## 📊 Analytics Setup

### Google Analytics
Add before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Common Issues

**Issue**: Pages show 404 errors
- **Solution**: Ensure all HTML files are in correct directories

**Issue**: CSS not loading
- **Solution**: Check Tailwind CDN link is present

**Issue**: JavaScript not working
- **Solution**: Verify script files are linked correctly

**Issue**: Images not displaying
- **Solution**: Use absolute URLs or check paths

## 📞 Support

For deployment help:
- Check README.md for detailed documentation
- Review this guide
- Contact: support@farmdirect.lk

## 🎉 Post-Deployment

After successful deployment:
1. Test all functionality
2. Share the URL
3. Monitor performance
4. Collect user feedback
5. Plan improvements

---

**Ready to launch!** 🚀

Your FarmDirect platform is now ready to connect farmers with consumers.