import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import DiaryForm from "../components/DiaryForm";
import { useState, useEffect } from "react";
import { getCategories, resetCat } from "../features/products/productSlice";

const ProductModal = (props: any) => {
  const dispatch = useDispatch<any>();
  // const products: any = useSelector((state: any) => state.categories);
  // const [product, setProduct] = useState<any>({} as any);

  // console.log("sephora productssssss", products);
  // useEffect(() => {
  //   dispatch(getCategories()).then(async () => {
  //     (await products)
  //       ? console.log("sephora productssssss", products)
  //       : console.log("yok");
  //   });

  //   // return () => {
  //   //   reset();
  //   // };
  // }, [dispatch, products]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <DiaryForm
          handleSave={props.parentSave}
          count={props.count}
          handleClose={props.onHide}
          diaries={props.diaries}
        />
      </Modal.Body>

      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ProductModal;
