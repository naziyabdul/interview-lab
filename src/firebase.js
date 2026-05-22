import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';

const firebaseConfig = {
  apiKey:"AIzaSyBBbMscy2VK6lbiMtdcray4l5KdbTI9DOE",
  authDomain: "interview-lab-6fd60.firebaseapp.com",
  projectId: "interview-lab-6fd60",
  storageBucket: "interview-lab-6fd60.appspot.com",
  messagingSenderId:  "683254193075",
  appId: "1:683254193075:web:7c9a7494ed1cf0fcde89c6",
  databaseURL: "https://interview-lab-6fd60-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const logout = async () => {
  await signOut(auth);
};

export { ref, onValue, set, push };