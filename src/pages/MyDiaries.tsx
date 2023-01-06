import React from "react";
import ViewDiaries from "../components/ViewDiaries";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ICategory, ICategories } from "../models/CategoriesModel";

const MyDiaries = () => {
  const dispatch = useDispatch<any>();

  return (
    <div className="myDiaries">
      <section className="heading">Date : 14.11.2022 Monday</section>
      <ViewDiaries />
    </div>
  );
};

export default MyDiaries;
