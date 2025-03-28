// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCo8ebutSH9qGJOI8k3KrP1AJzlz1UaAqs',
	authDomain: 'gym-training-4c002.firebaseapp.com',
	projectId: 'gym-training-4c002',
	storageBucket: 'gym-training-4c002.firebasestorage.app',
	messagingSenderId: '865749432652',
	appId: '1:865749432652:web:84d534ab5032c0c8a337e9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
