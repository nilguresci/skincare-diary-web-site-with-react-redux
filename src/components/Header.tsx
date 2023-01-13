import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
const Header = () => {
  type User = {
    name: string;
    email: string;
    password: string;
    password2: string;
  };

  type userInitialInfo = {
    user: User | any;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const user: userInitialInfo = useSelector((state: any) => state.auth);
  console.log(user.user);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Your Skincare Diary</Link>

        {user.user ? (
          <Link to="/myDiaries" className="myDiariesLink">
            My Diaries
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="logoutBtn">
        <ul>
          {user.user ? (
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt></FaSignOutAlt>
                <div>Logout</div>
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt></FaSignInAlt>Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser></FaUser>Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
