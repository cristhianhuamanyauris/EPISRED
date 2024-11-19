import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => 
      initializeApp({ 
        projectId: "episbook", 
        appId: "1:551006974681:web:67efccde9e149636d144c8", 
        storageBucket: "episbook.firebasestorage.app", 
        apiKey: "AIzaSyDREYX6KfVG25uSdf4t4sBGFww6WxQ91wk", 
        authDomain: "episbook.firebaseapp.com", 
        messagingSenderId: "551006974681" 
      })
    ), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
  ],
};
