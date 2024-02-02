import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkSgfCcFvuJ6uVVGZJkNOo0xQLeNi47FI",
  authDomain: "kontorva-aff07.firebaseapp.com",
  projectId: "kontorva-aff07",
  storageBucket: "kontorva-aff07.appspot.com",
  messagingSenderId: "858952906331",
  appId: "1:858952906331:web:017022bb667c388509717e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
