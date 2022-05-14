import axios from "axios";

import type { User } from "../types/user";

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
export async function getUserViaToken(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dummy: User = {
        email: "example_name@email.com",
        username: "ExampleName",
        token: "1234.5678.91011",
      };
      resolve(dummy);
    }, 1500);
  });
}

/**
 * Requests authorization code to be sent to the user's email/SMS
 */
export async function requestAuthCode(credentials: {
  email: string;
  password: string;
}): Promise<{ access: string; refresh: string }> {
  // TODO: error handling xD
  const response = await axios.post("/accounts/token/", credentials);
  await axios.get("/accounts/totp/create/", {
    headers: {
      authorization: `Bearer ${response.data.access}`,
    },
  });
  const data = response.data;
  return data;
}

/**
 * TODO: mocked for now
 * Checks auth code correctness
 */
// Alternatively: export async function checkAuthCodeCorrectness(): Promise<boolean> {}
export async function validateAuthCode(token: string): Promise<User> {
  const response = await axios.post("/accounts/totp/login", { token });

  return new Promise((resolve) => {
    setTimeout(() => {
      const dummy: User = {
        email: "example_name@email.com",
        username: "ExampleName",
        token: "1234.5678.91011",
      };
      resolve(dummy);
    }, 1500);
  });
}
