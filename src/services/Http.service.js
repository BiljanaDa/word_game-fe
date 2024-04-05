import axios from "axios";

export default class HttpService {
  static client = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      Accept: "application/json",
    },
  });

  static async request({ method, url, data }) {
    const response = await this.client.request({
      method,
      url,
      data,
    });
    return response?.data;
  }
}
