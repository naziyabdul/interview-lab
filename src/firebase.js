import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBBbMscy2VK6lbiMtdcray4l5KdbTI9DOE",
  authDomain: "interview-lab-6fd60.firebaseapp.com",
  projectId: "interview-lab-6fd60",
  storageBucket: "interview-lab-6fd60.firebasestorage.app",
  messagingSenderId: "683254193075",
  appId: "1:683254193075:web:7c9a7494ed1cf0fcde89c6",
  measurementId: "G-L2LNZSLL1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (optional)
const analytics = getAnalytics(app);

// Auth setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign-in
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

// Logout
export const logout = async () => {
  await signOut(auth);
};