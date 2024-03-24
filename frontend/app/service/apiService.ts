import { getAccessToken } from "../actions/serverActions";

export const apiService = {
  get: async function (url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log({ "result-data": result.data });
          resolve(result.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getWithToken: async function (url: string): Promise<any> {
    const token = await getAccessToken();
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log({ "result-data": result.data });
          resolve(result.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post: async (url: string, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  postWithToken: async (url: string, data: any): Promise<any> => {
    const token = await getAccessToken();
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};
