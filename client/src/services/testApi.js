import axios from "axios";

const api_product = import.meta.env.VITE_API_LINK_PRODUCT;
const api_all_roducts = import.meta.env.VITE_API_LINK_ALL_PRODUCTS;

export const productApi = () =>
  axios
    .get(api_product)
    .then((response) => {
      console.log("API response data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data from API:", error);
      throw error;
    });

// api all products
export const allProductsApi = () =>
  axios
    .get(api_all_roducts)
    .then((response) => {
      console.log("API response All data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data from API:", error);
      throw error;
    });
