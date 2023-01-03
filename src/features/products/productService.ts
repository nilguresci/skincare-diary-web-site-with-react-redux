import axios from "axios";

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

const getProductCategories = async () => {
  debugger;
  const result = await axios
    .request(options)
    .then(function (response) {
      console.log("sephore ctegories", response.data.rootCategories);
      debugger;
      return response.data.rootCategories;
    })
    .catch(function (error) {
      console.error(error);
    });
  // const result = await axios.get(url, config).then((res) => {
  //   console.log("sephore ctegories", res.data.rootCategories);
  // });
  //   .catch((err) => {
  //     console.error(err);
  //   });
  console.log("serviceresult", result);
  return result;
};

const productService = {
  getProductCategories,
};
export default productService;
