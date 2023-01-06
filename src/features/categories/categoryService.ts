import axios from "axios";

const urlMockApi = "https://6314996efa82b738f74a8bce.mockapi.io";

const getCategories = async () => {
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
  const result = products.filter((product: any): any => {
    return product.catId === id;
  });
  console.log("found", result);
  return result;
};

const getProductsWithId = async (id: string) => {
  console.log(id);

  const products: any = await getProducts();

  return findProduct(products, id)
    .then((res: any) => {
      console.log("mock products", res);
      return res;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const categoryService = { getCategories, getProductsWithId };

export default categoryService;
