import axios from "axios";

import type { User } from "../types/user";

// TODO: mocked for now
axios.defaults.baseURL = "https://dummyapi.io/data/v1/";
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
 * TODO: mocked for now
 * Requests authorization code to be sent to the user's email/SMS
 */
export async function requestAuthCode(): Promise<boolean> {
  // CHECK IF SERVER RESPONSE IS OK (200)
  // THEN IT MEANS THAT AUTH CODE HAS BEEN SUCCESSFULLY SENT TO USER EMAIL/SMS
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
}

/**
 * TODO: mocked for now
 * Checks auth code correctness
 */
// Alternatively: export async function checkAuthCodeCorrectness(): Promise<boolean> {}
export async function validateAuthCode(): Promise<User> {
  // CHECK IF SERVER RESPONSE IS OK (200)
  // THEN IT MEANS THAT AUTH CODE WAS CORRECT
  // SERVER SHOULD RETURN HERE A USER + JWT
  // JWT HAS TO BE SAVED IN localStorage
  // TODO: make separate file with localStorage related functions
  localStorage.setItem("token", "1234.5678.91011");
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
