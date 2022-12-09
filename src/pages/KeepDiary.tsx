import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DiaryForm from "../components/DiaryForm";
import { FaPlus } from "react-icons/fa";
import { GiCoveredJar } from "react-icons/gi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProductModal from "../components/ProductModal";
import ListGroup from "react-bootstrap/ListGroup";

import Table from "react-bootstrap/Table";

const KeepDiary = (props: any) => {
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

  const [count, setCount] = useState(0);
  let btnId: any = 0;
  let openModal: any = 0;

  const [list, setList] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => {
    setModalShow(true);
  };

  const generateButtons = (count: any) => {
    console.log("parent handle save");
    let buttons = [];

    for (let i = 0; i < count; i++) {
      btnId++;

      buttons.push(
        <div>
          <Button
            variant="primary"
            id={"addProduct" + btnId}
            onClick={() => handleShow()}
          >
            <GiCoveredJar />
          </Button>
        </div>
      );
    }

    return buttons;
  };

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
      {count > 0 ? (
        <div>
          <p>Products you use today</p>
        </div>
      ) : (
        <p>You didn't add any product today.</p>
      )}

      <div className="plusContainer">
        {generateButtons(count)}
        <button
          type="submit"
          id={"addProduct" + btnId}
          onClick={() => handleShow()}
        >
          <div className="plus">
            <FaPlus />
          </div>
        </button>
      </div>
      <ProductModal
        show={modalShow}
        id={"modal" + btnId}
        onHide={() => setModalShow(false)}
        parentSave={() => generateButtons(setCount((count) => count + 1))}
        count={count}
      />
    </div>
  );
};

export default KeepDiary;
