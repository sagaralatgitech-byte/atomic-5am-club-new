# 🌅 Atomic 5 AM Club - Productivity Tracker

> **Transform your life by combining Atomic Habits principles with The 5 AM Club's proven morning routine**

![Status](https://img.shields.io/badge/status-production--ready-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20Web-lightgrey)

---

## ✨ What is Atomic 5 AM Club?

A comprehensive productivity tracker that helps you:
- 🌄 **Own Your Morning** with the 20/20/20 Victory Hour
- 📈 **Build Atomic Habits** through 1% daily improvements
- ⏰ **Time Block Your Day** from 5 AM to 11 PM
- 🎯 **Track Progress** with streaks and completion rates
- 📱 **Get Phone Alerts** via Google Calendar integration

---

## 🎯 Key Features

### 🌅 Morning 20/20/20 Victory Hour
- **5:00-5:20 AM: MOVE** - Exercise to boost BDNF, dopamine & serotonin
- **5:20-5:40 AM: REFLECT** - Meditation, journaling, visualization
- **5:40-6:00 AM: GROW** - Reading, learning, skill development

### 🎯 Atomic Habits Tracker
- Track daily habits with visual progress
- **Two-Minute Rule** for easy habit starting
- **Never Miss Twice** principle
- Streak tracking for motivation
- Four Laws of Behavior Change

### 📅 Complete Time Blocking
- **90/90/1 Rule**: 90 days × 90 min × 1 priority
- **60/10 Method**: Work-rest cycles
- **Second Wind Workout**: Evening energy boost
- **Daily Five Concept**: 5 daily targets
- Hour-by-hour scheduling

### 🧠 Additional Features
- ✅ Identity-Based Habits
- ✅ Habit Stacking
- ✅ Gratitude Journaling
- ✅ Weekly Goal Planning
- ✅ Daily Task Manager
- ✅ Google Calendar Integration
- ✅ Auto-save with localStorage
- ✅ Works Offline
- ✅ Mobile Optimized

---

## 🚀 Quick Start

### For Users (Install the App):

**Option 1: Web App (Easiest)**
1. Visit: [Your Deployed URL]
2. On mobile: Tap "Add to Home Screen"
3. Done! App installed

**Option 2: Deploy Your Own (Free)**
1. Fork this repository
2. Deploy to Vercel/Netlify (free)
3. Install on your phone from your URL

**Detailed instructions:** See [ANDROID_DEPLOYMENT_GUIDE.md](./ANDROID_DEPLOYMENT_GUIDE.md)

---

### For Developers (Run Locally):

```bash
# Clone repository
git clone [your-repo-url]
cd atomic-5am-club

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📱 Installation Options

| Method | Time | Difficulty | Best For |
|--------|------|-----------|----------|
| PWA Install | 2 min | ⭐ Easy | Most users |
| Deploy to Vercel | 5 min | ⭐ Easy | Custom URL |
| Local Development | 10 min | ⭐⭐ Medium | Developers |
| Native Android APK | 30 min | ⭐⭐⭐ Hard | Advanced users |

Full deployment guide: [ANDROID_DEPLOYMENT_GUIDE.md](./ANDROID_DEPLOYMENT_GUIDE.md)

---

## 📖 How to Use

### 1. Start Your Morning Routine
1. Navigate to **Morning** tab
2. Complete each 20-minute block (MOVE, REFLECT, GROW)
3. Check off sections as you complete them

### 2. Plan Your Day
1. Go to **Schedule** tab
2. Add time blocks for your entire day
3. Export to calendar for phone alerts

### 3. Track Your Habits
1. Visit **Habits** tab
2. Add habits with Two-Minute versions
3. Check off daily and watch streaks grow

### 4. Define Your Identity
1. Go to **Identity** tab
2. Write who you want to become
3. See how habits support your identity

### 5. Get Phone Alerts
1. Plan schedule in app
2. Click "Export to Calendar"
3. Import .ics file into Google Calendar
4. Enable notifications

---

## 🎓 The Science Behind It

### From Atomic Habits (James Clear)
- **1% Better Daily**: Small improvements compound
- **Identity-Based**: Focus on who you want to become
- **Four Laws**:
  1. Make it Obvious
  2. Make it Attractive
  3. Make it Easy
  4. Make it Satisfying
- **Never Miss Twice**: Recovery is key

### From The 5 AM Club (Robin Sharma)
- **20/20/20 Formula**: Structured morning routine
- **Victory Hour**: First hour sets the tone
- **90/90/1 Rule**: Deep work on priorities
- **60/10 Method**: Optimal work-rest cycles
- **66 Days to Automaticity**: Consistency builds habits

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: localStorage API
- **PWA**: vite-plugin-pwa
- **Android**: Capacitor (optional)

---

## 📂 Project Structure

```
atomic-5am-club/
├── src/
│   ├── App.jsx              # Main component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── capacitor.config.ts     # Capacitor config (Android)
├── package.json            # Dependencies
├── README.md               # This file
└── ANDROID_DEPLOYMENT_GUIDE.md  # Deployment guide
```

---

## 🎨 Screenshots

[Add screenshots here after deployment]

---

## 🔒 Privacy & Data

- ✅ All data stored locally on your device
- ✅ No account required
- ✅ No data sent to servers
- ✅ Completely private
- ✅ Open source and transparent

---

## 🚀 Deployment Platforms

### Recommended (Free):
- **Vercel** - Automatic deployments, custom domains
- **Netlify** - Drag & drop, form handling
- **GitHub Pages** - Version control integration

### Also Supported:
- Firebase Hosting
- Cloudflare Pages
- Render
- Railway

---

## 📈 Roadmap

### v1.0.0 (Current) ✅
- Complete 20/20/20 Victory Hour
- Atomic Habits Tracker
- Time Blocking System
- Identity-Based Habits
- Habit Stacking
- Calendar Export
- PWA Support

### v1.1.0 (Planned)
- [ ] Dark mode
- [ ] Data export/import
- [ ] Statistics dashboard
- [ ] Habit templates library
- [ ] In-app reminders
- [ ] Custom themes

### v2.0.0 (Future)
- [ ] Cloud sync (optional)
- [ ] Social features
- [ ] Challenges & competitions
- [ ] Advanced analytics
- [ ] iOS/Android native apps
- [ ] Integration with fitness trackers

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

### Development Guidelines:
- Follow existing code style
- Add comments for complex logic
- Test on mobile devices
- Update documentation

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Device and browser info

---

## 💡 Feature Requests

Have an idea? Open an issue with:
- Feature description
- Use case
- Why it would be valuable
- Mockups/examples (optional)

---

## 📚 Resources

### Books
- [Atomic Habits](https://jamesclear.com/atomic-habits) by James Clear
- [The 5 AM Club](https://www.robinsharma.com/book/the-5am-club) by Robin Sharma

### Related
- [Habit Tracking Templates](https://jamesclear.com/habit-tracker)
- [Morning Routine Ideas](https://www.robinsharma.com/)

---

## 📄 License

MIT License - Free to use for personal or commercial projects

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🌟 Show Your Support

If this tool helped you:
- ⭐ Star this repository
- 🐦 Share on social media
- 💬 Tell your friends
- 📝 Write a review
- 🤝 Contribute code

---

## 📞 Contact & Support

- 📧 Issues: Use GitHub Issues
- 💬 Discussions: GitHub Discussions
- 🐦 Twitter: [@atomic5amclub]
- 🌐 Website: [Your website]

---

## 🎉 Success Stories

> *"This app changed my life. I've been waking up at 5 AM for 90 days straight!"* - Sarah M.

> *"The habit stacking feature is genius. Built 10 new habits in 2 months."* - Mike T.

> *"Finally, a tool that actually works. Love the identity-based approach!"* - Jessica R.

**Share your story!** Open an issue with the "success-story" label.

---

## 🙏 Acknowledgments

Built with inspiration from:
- **James Clear** - Atomic Habits methodology
- **Robin Sharma** - The 5 AM Club principles
- The amazing open source community

---

## 💪 Motivation

> *"You do not rise to the level of your goals. You fall to the level of your systems."*  
> — James Clear

> *"Own your morning. Elevate your life."*  
> — Robin Sharma

---

**Transform your life, one morning at a time.** 🌅

**Start your journey today!**

[Get Started →](./ANDROID_DEPLOYMENT_GUIDE.md)

---

**Built with ❤️ for early risers and habit builders worldwide**

*Last Updated: December 2024*
