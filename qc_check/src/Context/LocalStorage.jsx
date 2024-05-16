const isLogggedIn = "isLoggedIn";


export const addLoginToken = () => {
    localStorage.setItem(isLogggedIn,true);
  };


  export const removeLogintoken = () => {
    localStorage.removeItem(isLogggedIn);
  };


  export const getLoginToken = () => {
    const x = localStorage.getItem(isLogggedIn);
    return x;
  };