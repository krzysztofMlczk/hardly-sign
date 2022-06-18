import axios from "axios";

// TODO: mocked for now
axios.defaults.baseURL = "http://localhost:8000/api/v1";
// axios.defaults.headers.post["Access-Control-Allow-Headers"] = "*";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] =
// "http://localhost:8000";
// axios.defaults.headers.post["Accept"] = "*/*";
// axios.defaults.headers.Authorization = `Token ${token}`;

/**
 * TODO: mocked for now
 * Requests user data from backend (based on auth token)
 */
type UserViaTokenResponse = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};
export async function getUserViaToken(): Promise<UserViaTokenResponse> {
  const result = await axios.get("/accounts/me/");
  return result.data;
}

/**
 * Requests authorization code to be sent to the user's email/SMS
 */
export async function requestAuthCode(credentials: {
  email: string;
  password: string;
}): Promise<{ access: string; refresh: string }> {
  // TODO: error handling xD
  // Validate credentials (email + password)
  const response = await axios.post("/accounts/token/", credentials);
  // Request auth code using received access token
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.access}`;
  await axios.get("/accounts/totp/create/", {
    // headers: {
    //   authorization: `Bearer ${response.data.access}`,
    // },
  });
  const data = response.data;
  return data;
}

// Alternatively: export async function checkAuthCodeCorrectness(): Promise<boolean> {}
export async function validateAuthCode(
  token: string
): Promise<{ access: string; refresh: string }> {
  const response = await axios.post("/accounts/totp/login/", { token });
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.access}`;
  return response.data;
}

export async function signFilesApi(data: FormData) {
  const response = await axios({
    method: "POST",
    responseType: "arraybuffer",
    url: "/documents/",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  window.open(url);

  return response.data;
}

export async function verifyFilesApi(data: FormData): Promise<boolean> {
  const response = await axios({
    method: "POST",
    url: "/documents/verify/",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.status === 200;
}

export interface IFile {
  id: number;
  name: string;
  uploaded: string;
  user: string;
}

export async function getFilesHistory(): Promise<Array<IFile>> {
  const response = await axios.get("/documents/");
  return response.data;
}

export async function getFile(id: number) {
  const response = await axios({
    method: "GET",
    responseType: "arraybuffer",
    url: `/documents/${id}/download`,
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  window.open(url);
}
