import { BACKEND_URL } from "../constants";

const defaualtAPIConfig = (config) => {
  return Object.assign(
    {
      method: "POST",
      mode: "cors",
      //cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": BACKEND_URL,
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": 'POST'
      },
      //redirect: "follow",
      //referrerPolicy: "same-origin",
      body: JSON.stringify({}),
    },
    config
  );
};

export default async (url, body, config = {}) => {

  const res = await fetch(
    url,
    defaualtAPIConfig({ ...config, body: JSON.stringify(body) })
  );
  return await res.json();
};

export async function uploadImage( url, body ){

  const response = await fetch(url, {
    method: "POST",
    body
  })

  return await response.json()
}