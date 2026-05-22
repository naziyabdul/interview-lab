import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "interview-lab-6fd60.firebaseapp.com",
  projectId: "interview-lab-6fd60",
  storageBucket: "interview-lab-6fd60.appspot.com",
  messagingSenderId: "683254193075",
  appId: "1:683254193075:web:7c9a7494ed1cf0fcde89c6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const logout = async () => {
  await signOut(auth);
};