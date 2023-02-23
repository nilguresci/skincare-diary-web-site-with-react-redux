import { collection, getDocs, addDoc } from "firebase/firestore";
import { fConfig as db } from "../../firebaseConfig";

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

const getData = async () => {
  const data = await getDocs(collection(db, "BrandCollection"));
  console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const testService = {
  getData,
  addData,
};

export default testService;
