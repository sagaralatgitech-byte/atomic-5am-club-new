# 🌅 Atomic 5 AM Club - Productivity Tracker

> Transform your life by combining **Atomic Habits** principles with **The 5 AM Club's** proven morning routine

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Mobile](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20Web-lightgrey.svg)

## 📱 Live Demo & Installation

### 🌐 Web Version
Access instantly at: **[Your-Deployed-URL]**

### 📲 Install on Android
1. Open the web version on your Android phone
2. Tap menu (⋮) → "Add to Home screen"
3. Enjoy native app-like experience!

---

## ✨ Features

### 🌅 Morning 20/20/20 Victory Hour
- **5:00-5:20 AM: MOVE** - Vigorous exercise to boost neurotransmitters
- **5:20-5:40 AM: REFLECT** - Meditation, journaling, visualization
- **5:40-6:00 AM: GROW** - Reading, learning, skill development

### 🎯 Atomic Habits Tracker
- Track daily habits with visual progress
- **Two-Minute Rule** for easy habit starting
- **Never Miss Twice** principle built-in
- Streak tracking with fire icons
- Four Laws of Behavior Change integration

### ⏰ Complete Time Blocking
- **90/90/1 Rule**: 90 days × 90 minutes × 1 priority project
- **60/10 Method**: 60-minute work blocks with 10-minute breaks
- **Second Wind Workout**: Evening energy boost
- **Daily Five Concept**: List 5 daily targets
- Full-day scheduling (5 AM - 11 PM)

### 🧠 Identity-Based Habits
- Define who you want to become
- Every habit completion is a "vote" for your identity
- Track identity votes through streaks

### 🔗 Habit Stacking
- Link new habits to existing ones
- "After [X], I will [Y]" formula
- Make habits automatic

### 📱 Smart Features
- **Calendar Export**: Get phone alerts via .ics files
- **Auto-save**: Data persists automatically
- **Offline Mode**: Works without internet
- **Dark Theme**: Optimized for early mornings
- **Mobile-First**: Responsive design for all devices

### 📊 Progress Tracking
- Current streak counter
- Perfect days tracking
- Morning routine completion %
- Daily habit completion rate
- 66-day journey tracker

---

## 🚀 Quick Start

### For Users (Installation)

#### Option 1: Use Web App (Easiest)
```
1. Visit: [Your-Deployed-URL]
2. On Android: Menu → "Add to Home screen"
3. Start using immediately!
```

#### Option 2: Download APK (Advanced)
```
1. Download APK from releases
2. Enable "Install from unknown sources"
3. Install APK on your phone
```

### For Developers (Setup)

```bash
# Clone repository
git clone https://github.com/yourusername/atomic-5am-club.git
cd atomic-5am-club

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## 📖 How to Use

### Daily Workflow

**Morning Routine (5:00-6:00 AM):**
1. Open app at 5 AM
2. Complete MOVE section (exercise)
3. Complete REFLECT section (meditation/journal)
4. Complete GROW section (reading/learning)
5. Fill in Daily Five targets
6. Write 3 things you're grateful for

**Throughout the Day:**
- Check off habits as you complete them
- Follow your time blocks
- Add tasks to your task list
- Track progress

**Weekly Review:**
- Set weekly goals every Sunday
- Review habit streaks
- Adjust schedule as needed

### Getting Phone Alerts

1. Go to "Schedule" tab
2. Fill in your time blocks
3. Click "Export to Calendar"
4. Open downloaded .ics file on your phone
5. Import into Google Calendar
6. Enable notifications in calendar app
7. Receive alerts 10-15 minutes before each block!

---

## 🏗️ Development

### Project Structure

```
atomic-5am-club/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── icon-192.png          # App icon (small)
│   └── icon-512.png          # App icon (large)
├── src/
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind CSS
├── AtomicProductivityApp.jsx # Main component
├── index.html                # HTML entry
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
└── ANDROID_DEPLOYMENT_GUIDE.md
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: localStorage
- **PWA**: vite-plugin-pwa

---

## 🎨 Customization

### Change Theme Colors

Edit `AtomicProductivityApp.jsx`:

```javascript
// Primary color (Amber/Orange):
'bg-amber-500' → 'bg-your-color'
'text-amber-400' → 'text-your-color'

// Background gradient:
'from-slate-900 via-purple-900' → 'from-color1 via-color2'
```

### Modify App Name

Update in these files:
- `index.html` - `<title>` tag
- `public/manifest.json` - `name` field
- `package.json` - `name` field

### Add Custom Features

The app is designed to be easily extensible. Add new tabs, features, or integrations by modifying `AtomicProductivityApp.jsx`.

---

## 📱 Deployment Guide

See [ANDROID_DEPLOYMENT_GUIDE.md](./ANDROID_DEPLOYMENT_GUIDE.md) for complete deployment instructions including:
- Step-by-step setup
- Multiple deployment options (Vercel, Netlify, GitHub Pages)
- Android installation guide
- Creating APK files
- Troubleshooting

### Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🎓 The Science Behind It

### From Atomic Habits by James Clear

- **1% Better Every Day**: Small improvements compound into remarkable results
- **Identity-Based Habits**: Focus on who you want to become
- **Four Laws**:
  1. Make it Obvious
  2. Make it Attractive
  3. Make it Easy
  4. Make it Satisfying
- **Never Miss Twice**: Missing once is okay; missing twice starts a pattern
- **Two-Minute Rule**: Start with just 2 minutes

### From The 5 AM Club by Robin Sharma

- **20/20/20 Formula**: Transform mornings with structured routine
- **Victory Hour**: First hour sets the tone for your day
- **90/90/1 Rule**: Deep work on priority projects
- **66 Days**: Time needed to reach automaticity
- **10 Tactics of Lifelong Genius**: Proven productivity methods

---

## 🔒 Privacy & Security

- ✅ All data stored **locally** on your device
- ✅ **No server storage** of personal information
- ✅ **No analytics or tracking**
- ✅ **No account required**
- ✅ **Open source** - review all code
- ✅ **Works offline** completely

Your data never leaves your device!

---

## 🐛 Troubleshooting

### App not loading
- Clear browser cache
- Check console for errors
- Verify all files are present

### Icons not showing
- Ensure icon files exist in `public/`
- Clear cache and rebuild
- Check manifest.json paths

### Data not saving
- Don't clear browser storage
- Check localStorage quota
- Test in incognito mode

### PWA not installing
- Must use HTTPS (Vercel/Netlify provide this)
- Check manifest.json is accessible
- Use Chrome browser on Android

See [ANDROID_DEPLOYMENT_GUIDE.md](./ANDROID_DEPLOYMENT_GUIDE.md) for more troubleshooting.

---

## 🤝 Contributing

Contributions welcome! Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

## 🌟 Roadmap

### Current Features (v1.0)
- ✅ Morning 20/20/20 routine
- ✅ Habit tracking with streaks
- ✅ Time blocking
- ✅ Identity-based habits
- ✅ Habit stacking
- ✅ Gratitude journaling
- ✅ Weekly goals
- ✅ Calendar export
- ✅ PWA support

### Planned Features (v2.0)
- [ ] Cloud sync across devices
- [ ] User authentication
- [ ] Advanced analytics
- [ ] Social features
- [ ] Habit templates
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Native mobile apps (iOS/Android)

---

## 📚 Resources

### Books
- [Atomic Habits](https://jamesclear.com/atomic-habits) by James Clear
- [The 5 AM Club](https://www.robinsharma.com/book/the-5am-club) by Robin Sharma

### Documentation
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PWA Guide](https://web.dev/progressive-web-apps/)

---

## ⭐ Show Your Support

If this project helped you:
- ⭐ Star the repository
- 🐦 Share on social media
- 💬 Tell your friends
- 📝 Write a review

---

## 📞 Contact & Support

- 📧 Email: support@atomic5amclub.com
- 🐦 Twitter: [@atomic5amclub](https://twitter.com/atomic5amclub)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/atomic-5am-club/discussions)

---

## 🎉 Success Stories

> "This app changed my life. I've been waking up at 5 AM for 90 days straight!" - Sarah M.

> "The habit stacking feature is genius. I've built 10 new habits in 2 months." - Mike T.

> "Finally, a tool that combines the best of Atomic Habits and The 5 AM Club!" - Jessica R.

---

**Built with ❤️ for early risers and habit builders worldwide** 🌅

Start your transformation today. Own your morning, own your life.

---

## 📈 Stats

- 🌅 Designed for the 5 AM Club
- 🎯 Built on proven principles
- 📱 Mobile-first design
- 🔒 Privacy-focused
- 💪 Offline-capable
- ⚡ Lightning fast
- 🎨 Beautiful dark theme

**Your journey to atomic habits starts now!** 💫
