import api from "@/config/axiosInstance";
import { AuthSchemaType } from "../auth.schema";

const loginService = async (data: AuthSchemaType) => {
  console.log("url", api.defaults.baseURL);

  const response = await api.post("/auth/login", data);
  return response.data;
};
export default loginService;
