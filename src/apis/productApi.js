import axios from "axios";
// import { sweetAlertError } from "../swal2/swal2";

const prefix = "product";

const GET_ALL_PRODUCT_API = `${prefix}/get-all-product`;
const CREATE_PRODUCT_API = `${prefix}/create-product`;
const UPDATE_PRODUCT_BY_ID_API = `${prefix}/update-product-by-id`;
const DELETE_PRODUCT_BY_ID_API = `${prefix}/delete-product-by-id`;
const GET_PRODUCT_BY_ID = `${prefix}/get-product-by-id`;
const GET_ALL_PRODUCT_BY_ID = `${prefix}/get-all-product-by-id`;
const SEARCH_PRODUCT = `${prefix}/search`;

export const getAllProduct = async (search) => {
  try {

    const { data, status } = await axios.get(
      `${GET_ALL_PRODUCT_API}/${search}`
    );

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    // sweetAlertError(err);
  }
};

export const SearchProduct = async (name) => {
  try {
    const { data, status } = await axios.post(`${SEARCH_PRODUCT}`, { name });

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    // sweetAlertError(err);
  }
};

export const getAllProductById = async (id) => {
  try {
    const { data, status } = await axios.post(`${GET_ALL_PRODUCT_BY_ID}`, {
      id,
    });

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
    const form = new FormData();
    form.append("picture", body?.picture);
    const { status } = await axios.post(
      `${CREATE_PRODUCT_API}`,
      { ...body, form },
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${body?.picture?._boundary}`,
        },
      }
    );

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
  console.log(body);
  try {
    const form = new FormData();
    form.append("picture", body?.picture);
    const { status } = await axios.put(
      `${UPDATE_PRODUCT_BY_ID_API}/${body?.id}`,
      { ...body, form },
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${body?.picture?._boundary}`,
        },
      }
    );

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
    console.log(err);

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

export const getProductById = async (id) => {
  try {
    const { status, data } = await axios.get(`${GET_PRODUCT_BY_ID}/${id}`);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
    console.log(err);
  }
};
