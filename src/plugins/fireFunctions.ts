// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCeFvsKeAZAVOv-Y3_5YpIt1iz5nLFeslc',
    authDomain: 'ifnanfaapp101.firebaseapp.com',
    projectId: 'ifnanfaapp101',
    storageBucket: 'ifnanfaapp101.appspot.com',
    messagingSenderId: '1024877003239',
    appId: '1:1024877003239:web:bb25aeee1a9216ed7f3d42',
    measurementId: 'G-QD44RZTNSD'
  }
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
