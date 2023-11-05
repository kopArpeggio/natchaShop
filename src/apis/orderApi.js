import axios from "axios";
// import { sweetAlertError } from "../swal2/swal2";

const prefix = "order";

const CREATE_ORDER_API = `${prefix}/create-order`;
const GET_ORDER_API = `${prefix}/get-order`;
const GET_ORDER_BY_ID_API = `${prefix}/get-order-by-id`;
const UPDATE_ORDER_BY_ID_API = `${prefix}/update-order-by-id`;
const GET_ORDER_BY_USER_API = `${prefix}/get-order-by-user`;
const GET_ORDER_DETAIL_BY_ID_API = `${prefix}/get-orderdetail-by-order-id`;
const GET_ORDER_DETAIL_BY_ID_ARRAY_API = `${prefix}/get-orderdetail-by-order-id-array`;

export const getOrder = async () => {
  try {
    const { status, data } = await axios.get(`${GET_ORDER_API}`);

    if (status === 200) {
      console.log(data);
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
    console.log(err);
  }
};

export const getUserOrder = async () => {
  try {
    const { status, data } = await axios.get(`${GET_ORDER_BY_USER_API}`);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
    console.log(err);
  }
};

export const getOrderDetailByOrderId = async (orderId) => {
  try {
    const { status, data } = await axios.post(`${GET_ORDER_DETAIL_BY_ID_API}`, {
      orderId: orderId,
    });

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
    console.log(err);
  }
};
export const getOrderDetailByOrderIdArray = async () => {
  try {
    const { status, data } = await axios.get(
      `${GET_ORDER_DETAIL_BY_ID_ARRAY_API}`
    );

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
    console.log(err);
  }
};

export const getOrderById = async (id) => {
  try {
    const { status, data } = await axios.get(`${GET_ORDER_BY_ID_API}/${id}`);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
  }
};

export const updateOrderById = async (value) => {
  try {
    const { status, data } = await axios.put(
      `${UPDATE_ORDER_BY_ID_API}`,
      value
    );

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
    console.log(err);
  }
};

export const createOrder = async (body) => {
  try {
    const form = new FormData();
    form.append("picture", body?.file);

    const { status, data } = await axios.post(
      `${CREATE_ORDER_API}`,
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

    console.log(data);
  } catch (error) {
    const err = error?.response?.data?.error;
    console.log(err);

    // sweetAlertError(err);
  }
};
