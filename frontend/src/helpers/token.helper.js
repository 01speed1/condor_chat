import jwtDecoder from "jwt-decode";

const decodeUserToken = () => {
  const token = localStorage.getItem("token");
  if (token) return jwtDecoder(token);
  return {}
};

export { decodeUserToken }
