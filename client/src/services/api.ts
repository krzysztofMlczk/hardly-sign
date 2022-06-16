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

export async function signFilesApi(formData: FormData) {
  const response = await axios.post("/documents", { file: formData });
  return response.data;
}

export async function verifyFilesApi({
  formData,
  ownerValue,
}: {
  formData: FormData;
  ownerValue: string;
}) {
  const response = await axios.post("/documents/verify", {
    file: formData,
    user_email: ownerValue,
  });
  return response.data;
}
