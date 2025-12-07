import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.atomic5amclub.app',
  appName: 'Atomic 5 AM Club',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#4F46E5",
      showSpinner: false
    }
  }
};

export default config;
