import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  keepDiary,
  updateDiary,
  getProductsWithId,
} from "../features/diarys/diarySlice";
import Button from "react-bootstrap/Button";
import { IDiary, IProduct, IRoutinInfo } from "../models/DiaryModels";
import { ICategories, ICategory } from "../models/CategoriesModel";
import $ from "jquery";
import { getBrands } from "../features/brands/brandSlice";
import {
  getProducts as getProductsSlice,
  getProductsByBrand,
} from "../features/products/productSlice";

const DiaryForm = (props: any) => {
  const dispatch = useDispatch<any>();

  const localStorageData = localStorage.getItem("user");

  const productTemp: IProduct = {
    productName: "Midnight Moisturizer",
    brandName: "Klairs",
    categoryName: "Moisturizer for face",
    id: "2",
    catId: "2",
  };

  const categoryTemp: ICategory = {
    id: "2",
    categoryName: "Moisturizer for face",
  };

  const routinInfoTemp: IRoutinInfo[] = [
    {
      product: productTemp,
      comment:
        "Shop skincare products at Sephora. Find top-rated products from leading skincare brands to help target specific skin concerns and revitalize your look",
      takenAgain: true,
      target: "moistening",
      routinTime: false, //night
      frequency: "every day",
    },
  ];

  const diaryTemp: IDiary = {
    diary: routinInfoTemp,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "diaryform",
    userId: localStorageData ? JSON.parse(localStorageData).userId : null,
    id: props.diaries[0] ? props.diaries[0].id : null,
  };

  const [diary, setDiary] = useState<IDiary>(props.diaries as IDiary);
  const [newProduct, setProduct] = useState<IProduct>(productTemp as IProduct);
  const [newRoutinInfo, setRoutinInfo] = useState<IRoutinInfo>(
    {} as IRoutinInfo
  );
  const [routins, setRoutins] = useState<IRoutinInfo[]>([] as IRoutinInfo[]);
  const [pro, setPro] = useState<IProduct[]>([productTemp] as IProduct[]);

  const categories: any = useSelector((state: any) => state.diarys.categories);

  const products: any = useSelector((state: any) => state.diarys.products);

  type Brand = {
    BrandName: string;
    id: string;
    crueltyFree: string;
  };
  type Brands = {
    brands: Brand[];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
  };

  const defaultBrands: Brand[] = [
    { BrandName: "brand 1", id: "1", crueltyFree: "Yes" },
  ];

  const [brands, setBrands] = useState([] as Brand[]);
  const stateBrands: any = useSelector((state: any) => state.brands.brands);
  console.log("brands2", stateBrands);

  const [allProducts, setAllProducts] = useState([]);
  const [selectableProducts, setSelectableProducts] = useState([]);
  const stateAllP: any = useSelector((state: any) => state.products.products);
  console.log("products", allProducts);

  const [categories2, setCategories] = useState([]);
  console.log("categories", categories2);

  useEffect(() => {
    dispatch(getBrands()).then(async () => {
      dispatch(await getProductsByBrand("nvHf1lrJ14c9QUV7MkZy"));
    });
  }, [dispatch]);

  useEffect(() => {
    setBrands(stateBrands);
  }, [stateBrands]);

  useEffect(() => {
    setAllProducts(stateAllP);
    let categoryNames: any = [];
    stateAllP.map((p: any) => categoryNames.push(p.CategoryName));
    removeDuplicates(categoryNames);
    setSelectableProducts(stateAllP);
  }, [stateAllP]);

  useEffect(() => {
    console.log("d", diary);
    setDiary(diaryTemp);
    //setProduct(productTemp);
    //setRoutins(routins);
  }, []);

  useEffect(() => {
    setPro(products);
    if (products.length === 1) {
      newProduct.brandName = products[0].brandName;
      newProduct.productName = products[0].productName;
      newProduct.categoryName = products[0].categoryName;
    }
  }, [products]);

  const getProducts = (e: any) => {
    const { name, value } = e.target;
    console.log("np", name);
    console.log("vp", value);
    console.log("vl", e.target[value - 1].label);
    var categoryName = e.target[value - 1].label;
    console.log("seçilen category", categoryName);

    dispatch(getProductsWithId(value)).then(() => {
      $(`#categorysSelect option[selected]`).removeAttr("selected");
      $(`#categorysSelect option[value=${value}]`).attr("selected", "true");
      newProduct.categoryName = categoryName;
    });

    console.log(newProduct);
  };

  const selectBrand = (e: any) => {
    const { name, value } = e.target;

    dispatch(getProductsByBrand(value));
  };

  const selectCategory = (e: any) => {
    const { value } = e.target;

    setSelectableProducts(
      allProducts.filter((product: any) => product.CategoryName === value)
    );
  };

  function removeDuplicates(arr: any) {
    let uniqueCategoryArray: any = arr.filter(
      (item: any, index: any) => arr.indexOf(item) === index
    );
    setCategories(uniqueCategoryArray);
    return uniqueCategoryArray;
  }

  const onChange = (e: any) => {
    const { name, value } = e.target;
    console.log("n", name);
    console.log("v", value);

    if (name === "productName" || name === "brandName") {
      setProduct({ ...newProduct, [e.target.name]: value } as IProduct);
    } else {
      setRoutinInfo({
        ...newRoutinInfo,
        product: newProduct,
        [e.target.name]: e.target.value,
      } as IRoutinInfo);
    }

    routins.push(newRoutinInfo);
    setRoutins(routins);

    setDiary({ ...diary, [e.target.name]: e.target.value } as IDiary);

    const newDiary: IDiary = {
      diary: routins,
      isError: false,
      isSuccess: true,
      isLoading: true,
      message: "Girildi",
      userId: localStorageData ? JSON.parse(localStorageData).userId : null,
      id: props.diaries[0] ? props.diaries[0].id : null,
    };
    setDiary({ ...diary, diary: newDiary.diary } as IDiary);

    console.log("diary", diary);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (props.diaries.length !== 0) {
      console.log("diary form update", props.diaries);
      console.log("diary form update", diary);
      let existingDiaries = props.diaries[0].diary;

      let addOnes = diary.diary;
      let send = existingDiaries.concat(addOnes);
      console.log("send", send);
      diary.diary = send;
      dispatch(updateDiary(diary));
    } else {
      dispatch(keepDiary(diary));
    }

    setDiary({} as IDiary);
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group flex-column">
          <div className="item">
            <label htmlFor="brand">Brand</label>
            <select
              name="brandName"
              id="brand"
              onChange={(e) => selectBrand(e)}
            >
              {brands.length == 1 ? (
                <option selected={true} value={brands[0].id}>
                  {brands[0].BrandName}
                </option>
              ) : (
                brands.map((brand: any) => (
                  <option value={brand.id}>{brand.BrandName}</option>
                ))
              )}
            </select>
          </div>

          <div className="item">
            <label htmlFor="categorys">Category</label>

            <select
              name="categoryName"
              id="categorysSelect"
              //value={newProduct.categoryName ? newProduct.categoryName : ""}
              onChange={(e) => selectCategory(e)}
            >
              {categories2.map((category: any) => (
                <option>{category}</option>
              ))}
            </select>
          </div>

          <div className="item">
            <label htmlFor="productName">Product Name</label>
            <select
              name="productName"
              id="productName"
              //value={newProduct.productName}
              //onChange={(e) => onChange(e)}
              className="text-truncate"
            >
              {selectableProducts.map((product: any) => (
                <option value={product.ProductName}>
                  {product.ProductName}
                </option>
              ))}
            </select>
          </div>
          <div className="item">
            <label htmlFor="target">Target</label>
            <select
              name="target"
              value={newRoutinInfo.target}
              id="target"
              onChange={(e) => onChange(e)}
            >
              <option value="Intense moustrizing">Yoğun nemlendirme</option>
              <option value="Anti acne">Sivilce Karşıtı</option>
              <option value="Moustrizing & Repair">Nemlendirme & Onarım</option>
              <option value="Calming & Anti-Redness">
                Sakinleştirme & Kızarıklık karşıtı
              </option>
              <option value="Anti wrinkle">Kırışıklık karşıtı</option>
              <option value="Moustrizing around the eyes & Dark Circles & Anti Wrinkle">
                Göz çevresi nemlendirme & morluk & kırışıklık karşıtı
              </option>
            </select>
          </div>
          <div className="item">
            <label className="timeInRoutine">Time in routine</label>
            <div className="timeOptions">
              <div>
                <input
                  type="radio"
                  id="morning"
                  name="routinTime"
                  value="morning"
                  onChange={(e) => onChange(e)}
                />
                <label htmlFor="morning">Morning</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="css"
                  name="routinTime"
                  value="night"
                  onChange={(e) => onChange(e)}
                />
                <label htmlFor="css">Night</label>
              </div>
            </div>
          </div>
          <div className="item">
            <label htmlFor="frequency">Frequency</label>
            <select
              name="frequency"
              id="frequency"
              value={newRoutinInfo.frequency}
              onChange={(e) => onChange(e)}
            >
              <option value="Every day">Every day</option>
              <option value="Every other day">Every other day</option>
              <option value="Two or three days a week">
                Two or three days a week
              </option>
              <option value="Once a week">Once a week</option>
              <option value="Biweekly">Biweekly</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="comment">Comments and notes:</label>

            <textarea
              id="comment"
              name="comment"
              cols={40}
              rows={5}
              value={newRoutinInfo.comment}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div className="item">
            <label htmlFor="fname">Would you buy it again?</label>
            <div className="timeOptions">
              <div>
                <input
                  type="radio"
                  id="yes"
                  name="takenAgain"
                  value="yes"
                  onChange={(e) => onChange(e)}
                />
                <label htmlFor="yes">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="no"
                  name="takenAgain"
                  value="no"
                  onChange={(e) => onChange(e)}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
          </div>
          <div className="item saveBtn">
            <button
              type="submit"
              className="btn btn-light"
              onClick={() => {
                props.handleClose();
                props.handleSave();
              }}
            >
              Save
            </button>
          </div>
          {/* <input onChange={props.handleChange} /> */}
        </div>
      </form>
    </section>
  );
};

export default DiaryForm;
