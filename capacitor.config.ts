import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'dewpoint tracker',
  webDir: '.next/server/app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
