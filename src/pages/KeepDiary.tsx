import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DiaryForm from "../components/DiaryForm";
import { FaPlus } from "react-icons/fa";
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

  const [modalShow, setModalShow] = useState(false);
  const [list, setList] = useState(true);

  const handleClose = () => setModalShow(false);
  const handleShow = () => {
    setModalShow(true);
  };

  const generateButtons = (index: any) => {
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
            Add product
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
      {list ? (
        <div>
          <p>Products you use today</p>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : (
        <p>You didn't add any product today.</p>
      )}

      <div className="plusContainer">
        {generateButtons(btnId)}
        <button
          type="submit"
          id={"addProduct" + btnId}
          onClick={() => setCount((count) => count + 1)}
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
      />
    </div>
  );
};

export default KeepDiary;
