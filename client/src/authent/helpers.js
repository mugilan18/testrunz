import cookie from "js-cookie";

// set cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
// remove cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// get from cookie

// req server with token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// set localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};
// auth user by cookie and localstorage
export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};
// access user from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChkd = getCookie("token");
    if (cookieChkd) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      }
      return false;
    }
  }
};

export const signOut = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

export const updateUserLS = (res, next) => {
  console.log("update user in LS");
  if (typeof window !== undefined) {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = res.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
