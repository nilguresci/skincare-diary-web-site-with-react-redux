import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DiaryForm from "../components/DiaryForm";
const KeepDiary = () => {
  type User = {
    email: string;
    password: string;
    name: string;
  };

  type userInitialInfo = {
    user: User;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
  };

  const navigate = useNavigate();

  const newObj: userInitialInfo = useSelector((state: any) => state.auth);
  console.log("aaaa", newObj);

  const localStorageData = localStorage.getItem("user");

  useEffect(() => {
    if (!newObj.user || newObj.user === null) {
      navigate("/login");
    }
  }, [newObj, navigate]);
  return (
    <div>
      <section className="heading">
        <h1>
          {" "}
          Welcome{" "}
          {localStorageData
            ? JSON.parse(localStorageData).name
            : newObj && newObj.user.name}
        </h1>
        <p>Keep your skincare diary</p>
      </section>
      <DiaryForm />
    </div>
  );
};

export default KeepDiary;
