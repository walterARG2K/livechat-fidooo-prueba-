import { tokenDecode } from "@/utils/decodeToken";
import { validateTokenExpiration } from "@/utils/exiprationToken";
import { getCookie } from "@/utils/getCookie";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuth: boolean | null;
  userData: {
    name: string;
    email: string;
    uid: string;
    photo: string;
  } | null;
  isExpired: boolean | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  isAuth:
    getCookie("accessToken") !== undefined
      ? !validateTokenExpiration(getCookie("accessToken")!)
      : false,
  accessToken:
    getCookie("accessToken") !== undefined ? getCookie("accessToken")! : null,
  userData:
    getCookie("accessToken") !== undefined
      ? {
          name: getCookie("name")!,
          email: tokenDecode(getCookie("accessToken")!).email,
          uid: tokenDecode(getCookie("accessToken")!).sub,
          photo: getCookie("photo")!,
        }
      : null,
  isExpired:
    getCookie("accessToken") !== undefined
      ? validateTokenExpiration(getCookie("accessToken")!)
      : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { isAuth, name, email, uid, accessToken, photo } = action.payload;
      state.isAuth = isAuth;
      state.accessToken = accessToken;
      state.userData = {
        email,
        name,
        uid,
        photo,
      };
    },
    removeUser: (state, action) => {
      (state.isAuth = false), (state.accessToken = null);
      state.userData = null;
      state.isExpired = null;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
