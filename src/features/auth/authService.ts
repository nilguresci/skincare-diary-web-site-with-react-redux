import axios from "axios";

const API_URL = "https:6314996efa82b738f74a8bce.mockapi.io/users";

//register user
const register = async (userData: object) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};

//get users
const usersList: any = async () => {
  const data = await axios.get(API_URL);
  //console.log(data.data);
  return data.data;
};

//found user
const foundUser: any = async (users: any, userData: any) => {
  const found = users.find((user: any): any => {
    return (
      user.user.email === userData.user.email &&
      user.user.password === userData.user.password
    );
  });
  console.log("found", found);
  return found;
};

//login user
const login = async (userData: any) => {
  const users: any = await usersList();
  console.log("users", users);

  foundUser(users, userData)
    .then((res: any) => {
      console.log("res", res);
      if (res) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      return res;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

//logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
