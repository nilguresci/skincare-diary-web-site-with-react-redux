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
import Spinner from "../components/Spinner";
import Table from "react-bootstrap/Table";
import { getMyDiaries, reset } from "../features/diarys/diarySlice";
import { IUser, IUserInitialInfo } from "../models/UserModel";

const KeepDiary = (props: any) => {
  type Product = {
    productName: string;
    brandName: string;
    category: string;
  };

  type RoutinInfo = {
    product: Product;
    comment: string;
    takenAgain?: boolean;
    target: string;
    routinTime: boolean; //true:morning false:night
    frequency: string;
  };

  type Diary = {
    diary: RoutinInfo | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const newObj: IUserInitialInfo = useSelector((state: any) => state.auth); //login olan user
  console.log("loggedin user", newObj);

  const localStorageData = localStorage.getItem("user");
  //console.log("localstorage", localStorageData);

  const diaries: Diary = useSelector((state: any) => state.diarys.diary);
  const diariesState: Diary = useSelector((state: any) => state.diarys);
  console.log("aaa", diaries);
  useEffect(() => {
    debugger;
    if (diariesState.isError) {
      console.log(diariesState.message);
    }

    if (!newObj.user || newObj.user === null) {
      navigate("/login");
    }

    dispatch(getMyDiaries());

    return () => {
      reset();
    };
  }, [
    newObj,
    navigate,
    //diaries,
    // diariesState,
    // diariesState.isError,
    // diariesState.message,
    dispatch,
  ]);

  const [count, setCount] = useState(0);
  let btnId: any = 0;
  let openModal: any = 0;

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

  if (diariesState.isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <section className="heading">
        <h1>
          {" "}
          Welcome{" "}
          {localStorageData
            ? JSON.parse(localStorageData).user.name
            : newObj && newObj.user.user.name}
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
