import axios from "axios";

const authenticate = async (email, password) => {
  try {
    const response = await axios.post("/auth/sign_in", {
      email: email,
      password: password
    });
    await storeAuthCredentials(response); //had "await" before
    return { authenticated: true };
  } catch (error) {
    return { authenticated: false, message: error.response.data.errors[0] };
  }
};

const register = async(email, password, password_confirmation) => {
  try {
    const response = await axios.post("/auth", {
      email: email,
      password: password,
      password_confirmation: password_confirmation
    });
    await storeAuthCredentials(response);
    debugger;
    return { authenticated: true };
  } catch (error) {
    return { authenticated: false, message: error.response.data.errors[0] };
  }
};

const logOut = async() => {
  try {
    await axios.delete("/auth/sign_out", {})
    window.sessionStorage.removeItem('credentials')
    return {authenticated: false}
  } catch(error) {

  }
}

const storeAuthCredentials = ({ headers }) => {
  const credentials = {
    uid: headers["uid"],
    client: headers["client"],
    access_token: headers["access-token"],
    expiry: headers["expiry"],
    token_type: "Bearer"
  };
  sessionStorage.setItem("credentials", JSON.stringify(credentials));
};

export { authenticate, register, logOut }