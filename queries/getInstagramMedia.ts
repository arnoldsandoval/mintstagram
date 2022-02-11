import axios from "axios";

export const getInstagramMedia = async () => {
  const { data } = await axios.get("/api/media");
  return data;
};
