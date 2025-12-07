# 📱 QUICK START GUIDE - Atomic 5 AM Club

## ⚡ 5-Minute Setup (For Users)

### Option 1: Use Online (No Installation)
1. Visit: **[Your-Website-URL]**
2. Use immediately on any device!

### Option 2: Install on Android
1. Open **[Your-Website-URL]** in Chrome on Android
2. Tap menu (⋮) → "Add to Home screen"
3. Name it "5 AM Club" and tap "Add"
4. App icon appears on home screen!

---

## 🚀 For Developers (Local Setup)

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- Text editor (VS Code recommended)

### Setup Steps
```bash
# 1. Navigate to project folder
cd atomic-5am-club

# 2. Run setup script
# On Windows:
setup.bat

# On Mac/Linux:
chmod +x setup.sh
./setup.sh

# 3. Start development server
npm run dev

# 4. Open browser
http://localhost:3000
```

---

## 📦 Deploy Online (Free Hosting)

### Vercel (Recommended - Easiest)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel
```

### Netlify (Alternative)
```bash
# Build first
npm run build

# Drag 'dist' folder to:
https://app.netlify.com/drop
```

---

## 💡 Daily Usage

### Morning Routine (5:00-6:00 AM)
1. **MOVE** (5:00-5:20): Exercise
2. **REFLECT** (5:20-5:40): Meditate/Journal
3. **GROW** (5:40-6:00): Read/Learn

### Throughout Day
- Check off habits as completed
- Follow time blocks
- Add tasks to list

### Weekly
- Review goals every Sunday
- Check streaks
- Plan next week

---

## 🔔 Get Phone Alerts

### Steps:
1. Go to "Schedule" tab
2. Fill in time blocks
3. Click "Export to Calendar"
4. Open .ics file on phone
5. Import to Google Calendar
6. Enable notifications

**You'll get alerts 10-15 min before each block!**

---

## 🎯 Key Features

### ✅ Morning 20/20/20 Formula
Track your Victory Hour routine

### ✅ Atomic Habits Tracker
- Build 1% better daily
- Track streaks
- Never miss twice

### ✅ Time Blocking
- Plan your day (5 AM - 11 PM)
- 90/90/1 Rule for deep work
- 60/10 Method for focus

### ✅ Identity-Based Habits
- Define who you want to become
- Every habit is a vote

### ✅ Habit Stacking
- Link new habits to existing ones
- Make them automatic

### ✅ Weekly Planning
- Set goals by category
- Review progress

### ✅ Gratitude Journal
- Write 3 daily gratitudes
- Boost happiness

---

## 🛠️ Troubleshooting

### App not loading?
- Clear browser cache
- Use Chrome browser
- Check internet connection

### Data not saving?
- Don't clear browser data
- Check storage settings

### Can't install on phone?
- Must use HTTPS URL
- Use Chrome on Android
- Check manifest.json exists

### Icons missing?
- Add icon-192.png to public/
- Add icon-512.png to public/
- Rebuild: npm run build

---

## 📚 Resources

### Books
- Atomic Habits by James Clear
- The 5 AM Club by Robin Sharma

### Guides
- Full Guide: `ANDROID_DEPLOYMENT_GUIDE.md`
- README: `README.md`

### Links
- Vite: https://vitejs.dev
- React: https://react.dev
- Tailwind: https://tailwindcss.com

---

## ⚡ Command Cheat Sheet

```bash
# Development
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview build

# Deployment
vercel              # Deploy to Vercel
netlify deploy      # Deploy to Netlify
git push            # Push to GitHub

# Maintenance
npm update          # Update dependencies
npm run lint        # Check code quality
```

---

## 🎨 Customization

### Change Colors
Edit `AtomicProductivityApp.jsx`:
- Find: `bg-amber-500`
- Replace with your color

### Change App Name
Update in:
- `index.html`
- `manifest.json`
- `package.json`

### Add Features
Modify `AtomicProductivityApp.jsx`

---

## ✅ Pre-Launch Checklist

Before deploying:
- [ ] All features work locally
- [ ] Icons added (192px, 512px)
- [ ] Production build successful
- [ ] Tested on Android phone
- [ ] Calendar export works
- [ ] Data persists after reload

---

## 💪 Tips for Success

1. **Start Small**: Begin with 2-3 habits
2. **Be Consistent**: Track daily
3. **Never Miss Twice**: One miss is okay
4. **Celebrate Wins**: Every completion counts
5. **Review Weekly**: Check progress Sundays
6. **Adjust**: Customize to fit your life

---

## 🌟 You're Ready!

Everything you need is here:
- ✅ Full app code
- ✅ Deployment guides
- ✅ Setup scripts
- ✅ Documentation

**Start building your atomic habits today!** 🚀

---

**Questions?**
- Check `ANDROID_DEPLOYMENT_GUIDE.md` for detailed help
- Review `README.md` for full documentation
- Test locally before deploying

**Good luck!** 🌅
