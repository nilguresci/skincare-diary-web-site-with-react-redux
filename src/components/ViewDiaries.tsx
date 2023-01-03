import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, resetCat } from "../features/products/productSlice";

const ViewDiaries = () => {
  const dispatch = useDispatch<any>();

  return (
    <section className="form viewDiaries">
      <form>
        <div className="form-group d-flex flex-column">
          <div className="item">
            <label htmlFor="categorys" className="viewLabel">
              Category
            </label>

            <div className="viewInfo">Mouistening for face</div>
          </div>
          <div className="item">
            <label htmlFor="brand" className="viewLabel">
              Brand
            </label>
            <div className="viewInfo">Kiehl's</div>
          </div>
          <div className="item">
            <label htmlFor="productName" className="viewLabel">
              Product Name
            </label>
            <div className="viewInfo">All day long moisturizer</div>
          </div>
          <div className="item">
            <label htmlFor="target" className="viewLabel">
              Target
            </label>
            <div className="viewInfo">Moustining</div>
          </div>
          <div className="item">
            <label className="timeInRoutine viewLabel">Time in routine</label>
            <div className="viewInfo">Morning</div>
          </div>
          <div className="item">
            <label htmlFor="frequency" className="viewLabel">
              Frequency
            </label>
            <div className="viewInfo">Every day</div>
          </div>
          <div className="item comment">
            <label htmlFor="comment" className="viewLabel">
              Comments and notes:
            </label>
            <div className="viewInfo">
              Shop skincare products at Sephora. Find top-rated products from
              leading skincare brands to help target specific skin concerns and
              revitalize your look Shop skincare products at Sephora. Find
              top-rated products from leading skincare brands to help target
              specific skin concerns and revitalize your look Shop skincare
              products at Sephora. Find top-rated products from leading skincare
              brands to help target specific skin concerns and revitalize your
              look
            </div>
          </div>
          <div className="item">
            <label htmlFor="fname" className="viewLabel">
              Would you buy it again?
            </label>
            <div className="viewInfo">No</div>
          </div>
          <div className="item saveBtn">
            <button type="submit" className="btn btn-light">
              Next
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ViewDiaries;
