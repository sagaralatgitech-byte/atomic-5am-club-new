# Google Calendar Integration Setup Guide

## Overview
The Atomic 5 AM Club now integrates directly with Google Calendar to sync your time blocks and schedule.

## Prerequisites
- Google Account
- Google Cloud Project with Calendar API enabled
- OAuth 2.0 Credentials (Client ID)

## Setup Steps

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Name it: "Atomic 5 AM Club"
4. Click "Create"

### 2. Enable Google Calendar API
1. In the Google Cloud Console, search for "Calendar API"
2. Click "Calendar API"
3. Click "Enable"

### 3. Create OAuth 2.0 Credentials
1. Go to "Credentials" in the left sidebar
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:5173` (if using Vite)
   - Your production domain
5. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `http://localhost:5173`
   - Your production domain
6. Click "Create"
7. Copy your Client ID

### 4. Create .env.local File
In the project root, create a `.env.local` file:

```
REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
REACT_APP_GOOGLE_API_KEY=your_api_key_here
```

Replace with your actual credentials from Google Cloud Console.

### 5. Verify Installation
1. Start the app: `npm run dev`
2. Go to Schedule tab
3. Add time blocks and activities
4. Click "Export" button
5. Sign in with Google when prompted
6. Events should appear in your Google Calendar

## Features

### ✅ What Works
- ✓ Direct sync to Google Calendar (no file download needed)
- ✓ Victory Hour scheduled as single event
- ✓ All time blocks synced with durations
- ✓ Automatic reminders (15 min before Victory Hour, 10 min before time blocks)
- ✓ Event descriptions with category and duration info
- ✓ One-click sync button in Schedule tab

### 📋 Event Details
Each synced event includes:
- **Event Name**: Activity name with category emoji
- **Start/End Time**: Exact time blocks
- **Duration**: From your specified duration
- **Reminders**: Notifications 10-15 minutes before
- **Category**: Color-coded by activity type
- **Description**: Category and duration details

## Troubleshooting

### Issue: "Unable to initialize Google Calendar"
**Solution**: 
- Check that API credentials are in `.env.local`
- Verify Calendar API is enabled in Google Cloud Console
- Check that your domain is in authorized JavaScript origins

### Issue: "Not signed in"
**Solution**:
- Click Export button again
- Sign in with your Google account
- Grant calendar permissions when prompted

### Issue: "Failed to create event"
**Solution**:
- Make sure you have at least one time block with activity
- Check that time format is correct (HH:MM AM/PM)
- Verify Google Calendar is accessible in your Google account

### Issue: Events appear but don't sync
**Solution**:
- Refresh Google Calendar (may take 30 seconds to appear)
- Check calendar visibility settings in Google Calendar
- Verify you're signed into the correct Google account

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_GOOGLE_CLIENT_ID` | OAuth 2.0 Client ID | `abc123.apps.googleusercontent.com` |
| `REACT_APP_GOOGLE_API_KEY` | Google API Key | `AIzaSyDxxx...` |

## Security Notes
- Keep `.env.local` in `.gitignore` (already configured)
- Never commit credentials to version control
- Use OAuth 2.0 for authorization (more secure than API key)
- Events are created in your primary calendar

## API Limits
- Free tier: 1 million requests per day
- Typical sync: 1-10 requests per schedule sync
- No daily limits for typical personal use

## Support
For issues with Google Calendar API:
- Check [Google Calendar API Documentation](https://developers.google.com/calendar)
- Review [OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- Check app logs for detailed error messages
