import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let p;
    if (type === "GET") {
      p = axios.get(url, { params: data });
    } else {
      p = axios.post(url, data);
    }

    p.then((response) => {
      resolve(response.data);
    }).catch((err) => {
      message.error("ajax failure: " + err.message);
    });
  });
}
