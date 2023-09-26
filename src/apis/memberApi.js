import axios from "axios";
// import { sweetAlertError } from "../swal2/swal2";

const prefix = "member";

const REGISTER_API = `${prefix}/create-member`;
const UPDATE_MEMBER_BY_ID_API = `${prefix}/update-member-by-id`;

export const registerMember = async (body) => {
  try {
    const { status } = await axios.post(`${REGISTER_API}`, body);

    if (status === 201) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    // sweetAlertError(err);
  }
};

export const updateMemberById = async (body) => {
  try {
    const { status } = await axios.put(
      `${UPDATE_MEMBER_BY_ID_API}/${body?.id}`,
      body
    );

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
  }
};
