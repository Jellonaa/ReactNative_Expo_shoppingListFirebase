import { initializeApp } from "firebase/app"
import { getFirestore,collection,addDoc,serverTimestamp,query,onSnapshot,doc,deleteDoc } from "firebase/firestore"
import { firebaseConfig } from "../secret/firebaseConfig"

initializeApp(firebaseConfig)

const firestore = getFirestore()

const MESSAGES = 'messages'

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES,
    query,
    onSnapshot,
    doc,
    deleteDoc
}