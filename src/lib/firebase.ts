// Import the functions you need from the SDKs you need

import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'blog-nodv.firebaseapp.com',
	databaseURL:
		'https://blog-nodv-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'blog-nodv',
	storageBucket: 'blog-nodv.appspot.com',
	messagingSenderId: '255721291089',
	appId: '1:255721291089:web:d08e9dae98a7de8284a770',
	measurementId: 'G-5YLX668RVM',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
