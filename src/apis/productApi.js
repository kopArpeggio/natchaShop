import axios from "axios";
// import { sweetAlertError } from "../swal2/swal2";

const prefix = "product";

const GET_ALL_PRODUCT_API = `${prefix}/get-all-product`;
const CREATE_PRODUCT_API = `${prefix}/create-product`;
const UPDATE_PRODUCT_BY_ID_API = `${prefix}/update-product-by-id`;
const DELETE_PRODUCT_BY_ID_API = `${prefix}/delete-product-by-id`;

export const getAllProduct = async () => {
  try {
    const { data, status } = await axios.get(`${GET_ALL_PRODUCT_API}`);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    // sweetAlertError(err);
  }
};

export const createProduct = async (body) => {
  try {
    const { status } = await axios.post(`${CREATE_PRODUCT_API}`, body);

    if (status === 201) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
    console.log(err);

    // sweetAlertError(err);
  }
};

export const updateProductById = async (body) => {
  try {
    const { status } = await axios.put(
      `${UPDATE_PRODUCT_BY_ID_API}/${body?.id}`,
      body
    );

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    // sweetAlertError(err);
  }
};

export const deleteProductById = async (select) => {
  try {
    const { status } = await axios.post(`${DELETE_PRODUCT_BY_ID_API}`, select);

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    //   sweetAlertError(err);
  }
};
