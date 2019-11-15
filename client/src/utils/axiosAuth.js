import axios from "axios";

const axiosAuth = () => {
  return axios.create({
    headers: {
      authorization: sessionStorage.getItem("token")
    }
  });
};

export default axiosAuth;