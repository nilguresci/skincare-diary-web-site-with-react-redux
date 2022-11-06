import React from "react";
import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  type User = {
    email: string;
    password: string;
  };
  const userTemp: User = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    setUser(userTemp);
  }, []);
  //setUser(userTemp);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  type userInitialInfo = {
    user: User | any;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
  };

  const newObj: userInitialInfo = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (newObj.isError) {
      toast.error(newObj.message);
    }

    if (newObj.isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [
    newObj.user,
    newObj.isError,
    newObj.isSuccess,
    newObj.message,
    navigate,
    dispatch,
  ]);

  const onChange = (e: any) => {
    setUser((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const userData: User = {
      email: user.email,
      password: user.password,
    };

    const userInitialInfoData: userInitialInfo = {
      user: userData,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: "",
    };

    dispatch(login(userInitialInfoData));
  };

  if (newObj.isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="heading">
        <h1>
          <FaSignInAlt></FaSignInAlt>Login
        </h1>
        <p>Login and Keep Skincare Diary</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              placeholder="Enter your email"
              className="form-control"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              placeholder="Enter password"
              className="form-control"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
