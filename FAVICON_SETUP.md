# ApplyAce Favicon Setup Guide

## Current Setup

The website is configured to use ApplyAce branding instead of Lovable icons.

## Required Image Files

To complete the favicon setup, add the following ApplyAce logo files to the `/public` folder:

### Required Files:

1. **favicon.ico** (16x16, 32x32, 48x48 sizes)
   - Location: `/public/favicon.ico`
   - This is the main favicon shown in browser tabs

2. **favicon-16x16.png** (16x16 pixels)
   - Location: `/public/favicon-16x16.png`
   - For high-DPI displays

3. **favicon-32x32.png** (32x32 pixels)
   - Location: `/public/favicon-32x32.png`
   - Standard favicon size

4. **apple-touch-icon.png** (180x180 pixels)
   - Location: `/public/apple-touch-icon.png`
   - For iOS home screen icons

5. **og-image.png** (1200x630 pixels recommended)
   - Location: `/public/og-image.png`
   - For social media sharing (Open Graph)

## How to Create Favicon Files

### Option 1: Using Online Tools

1. **Favicon Generator:**
   - Visit: https://realfavicongenerator.net/
   - Upload your ApplyAce logo
   - Download the generated favicon package
   - Extract files to `/public` folder

2. **Favicon.io:**
   - Visit: https://favicon.io/
   - Upload your logo or create from text
   - Download and extract to `/public`

### Option 2: Manual Creation

1. Start with your ApplyAce logo (high resolution, square format)
2. Resize to required dimensions:
   - 16x16, 32x32, 48x48 for favicon.ico
   - 16x16, 32x32 for PNG favicons
   - 180x180 for Apple touch icon
   - 1200x630 for OG image
3. Save files with exact names listed above
4. Place all files in `/public` folder

## File Structure

After adding files, your `/public` folder should contain:

```
public/
├── favicon.ico              (main favicon)
├── favicon-16x16.png       (16x16 PNG)
├── favicon-32x32.png       (32x32 PNG)
├── apple-touch-icon.png    (180x180 for iOS)
├── og-image.png            (1200x630 for social sharing)
├── placeholder.svg
└── robots.txt
```

## HTML Configuration

The `index.html` file is already configured with:

- ✅ Favicon links for all sizes
- ✅ Apple touch icon
- ✅ Open Graph image references
- ✅ Twitter card image references

## Testing

After adding the files:

1. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache completely

2. **Test favicon:**
   - Check browser tab icon
   - Check bookmarks
   - Check browser history

3. **Test social sharing:**
   - Use Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Use Twitter Card Validator: https://cards-dev.twitter.com/validator
   - Enter your site URL to preview

## Current Status

- ✅ HTML favicon links configured
- ✅ Open Graph tags updated (removed Lovable references)
- ⏳ **Waiting for ApplyAce logo files to be added to `/public` folder**

## Notes

- The favicon.ico file should contain multiple sizes (16x16, 32x32, 48x48)
- Use PNG format for individual size files for better quality
- Ensure logo is readable at small sizes (16x16)
- Use transparent background for PNG files
- OG image should be 1200x630 pixels for optimal social media display

## ApplyAce Branding

- **Company:** ApplyAce
- **Website:** applyace.io
- **Email:** contactus@applyace.io
- **Logo:** ApplyAce logo should be used for all favicon files

---

**Next Step:** Add your ApplyAce logo files to the `/public` folder following the specifications above.
