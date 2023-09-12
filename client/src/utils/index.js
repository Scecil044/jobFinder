import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8800/api-v1";

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json"
});

export const apiRequest = async ({ url, data, token, method }) => {
  try {
    const response = await API(url, {
      method: method || GET,
      data: data,
      headers: {
        "content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ""
      }
    });
    return response?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    return { status: err.success, message: err.message };
  }
};

export const handleFileUpload = async uploadFile => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "jobFinder");

  try {
    const response = await axios.post("https://api.cloudinary.com/v1_1/dbts75z4y/image/upload/", formData);
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export const updateUrl = ({ pageNum, query, cmpLoc, sort, navigate, location, jType, exp }) => {
  const params = new URLSearchParams();
  if (pageNum && pageNum > 1) {
    params.set("page", pageNum);
  }
  if (query) {
    params.set("search", query);
  }
  if (cmpLoc) {
    params.set("location", cmpLoc);
  }
  if (sort) {
    params.set("sort", sort);
  }
  if (jType) {
    params.set("jtype", jType);
  }
  if (exp) {
    params.set("exp", exp);
  }
  const newUrl = `${location.pathname}?${params.toString()}`;
  navigate(newUrl, { replace: true });
  return newUrl;
};
