import axios from "axios";
// import { sweetAlertError } from "../swal2/swal2";

const prefix = "order";

const CREATE_ORDER_API = `${prefix}/create-order`;
const GET_ORDER_API = `${prefix}/get-order`;
const GET_ORDER_BY_ID_API = `${prefix}/get-order-by-id`;

export const getOrder = async () => {
  try {
    const { status, data } = await axios.get(`${GET_ORDER_API}`);

    if (status === 200) {
      console.log(data);
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
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

export const createOrder = async (body) => {
  try {
    console.log(body);
    const form = new FormData();
    form.append("picture", body?.file);

    const { status } = await axios.post(
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
  } catch (error) {
    const err = error?.response?.data?.error;

    // sweetAlertError(err);
  }
};
