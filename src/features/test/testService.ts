import { collection, getDocs, addDoc } from "firebase/firestore";
import { fConfig as db } from "../../firebaseConfig";

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://support.google.com/firebase/answer/7015592
// const firebaseConfig : any = {
//   fConfig,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

const TestCollection = collection(db, "TestCollection");

//register user
const addData = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "TestCollection"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const testService = {
  //getData,
  addData,
};

export default testService;
