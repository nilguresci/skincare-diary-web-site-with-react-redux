import axios from "axios";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { fConfig as db } from "../../firebaseConfig";
const options = {
  method: "GET",
  url: "https://sephora.p.rapidapi.com/categories/v2/list-root",
  headers: {
    "X-RapidAPI-Key": "f29d4c8020msh3eeb1ce5bb79a9ap10054ejsn6ec089b97a85",
    "X-RapidAPI-Host": "sephora.p.rapidapi.com",
  },
};

const config = {
  headers: {
    "X-RapidAPI-Key": "f29d4c8020msh3eeb1ce5bb79a9ap10054ejsn6ec089b97a85",
    "X-RapidAPI-Host": "sephora.p.rapidapi.com",
  },
};

const url = "https://sephora.p.rapidapi.com/categories/v2/list-root";
const urlMockApi = "https://6314996efa82b738f74a8bce.mockapi.io";
//with rapid api
const getProductCategories = async () => {
  // const result = await axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log("sephore ctegories", response.data.rootCategories);
  //     return response.data.rootCategories;
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
  const result = await axios.get(url, config);
  //.then((res) => {
  //   console.log("sephore ctegories", res.data.rootCategories);
  // });
  //   .catch((err) => {
  //     console.error(err);
  //   });
  console.log("serviceresult", result.data.rootCategories);
  return result.data.rootCategories;
};

const getProductCategories2 = async () => {
  const result = await axios.get(urlMockApi + "/categories");
  console.log("mock categories", result.data);
  return result.data;
};

const getProducts: any = async () => {
  const result = await axios.get(urlMockApi + "/Products");
  return result.data;
};

//found user
const findProduct: any = async (products: any, id: string) => {
  const result = products.find((product: any): any => {
    return product.id === id;
  });
  console.log("found", result);
  return result;
};

const getProductsWithId = async (id: string) => {
  console.log(id);

  const products: any = await getProducts();

  findProduct(products, id)
    .then((res: any) => {
      console.log("mock products", res);
      return res;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const getProducts2: any = async () => {
  const data = await getDocs(collection(db, "ProductCollection"));
  console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const getProductsByBrand: any = async (id: string) => {
  const data = query(
    collection(db, "ProductCollection"),
    where("BrandID", "==", id)
  );
  const querySnapshot = await getDocs(data);
  console.log(querySnapshot);
  const send: any = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    send.push(doc.data());
  });
  console.log(send);
  return send;
};

const productService = {
  getProductCategories,
  getProductCategories2,
  getProductsWithId,
  getProducts2,
  getProductsByBrand,
};
export default productService;
