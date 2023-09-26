import axios from "axios";
// import { sweetAlertError } from "../swal2/swal2";

const LOGIN_API = `/login`;

export const loginMember = async (body) => {
  try {
    const { status, data } = await axios.post(`${LOGIN_API}`, body);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    // sweetAlertError(err);
  }
};
export const userData = async () => {
  try {
    const { status, data } = await axios.get(``);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    // sweetAlertError(err);
  }
};
