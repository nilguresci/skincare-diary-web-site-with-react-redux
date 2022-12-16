import React from "react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { register, reset } from "../features/auth/authSlice";
import { IUser, IUserInitialInfo } from "../models/UserModel";

const Register = () => {
  const userTemp: IUser = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    setUser(userTemp);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const newObj: IUserInitialInfo = useSelector((state: any) => state.auth);

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

    if (user.password !== user.password2) {
      toast.error("Passwords do not match");
    } else {
      const userData: IUser = {
        name: user.name,
        email: user.email,
        password: user.password,
        password2: user.password2,
      };

      const userInitialInfoData: IUserInitialInfo = {
        user: userData,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
      };
      debugger;
      dispatch(register(userInitialInfoData));
    }
  };

  if (newObj.isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <section className="heading">
        <h1>
          <FaUser></FaUser>Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              placeholder="Enter your name"
              className="form-control"
              onChange={onChange}
            />
          </div>
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
            <input
              type="password"
              id="password2"
              name="password2"
              value={user.password2}
              placeholder="Enter password again"
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

export default Register;
