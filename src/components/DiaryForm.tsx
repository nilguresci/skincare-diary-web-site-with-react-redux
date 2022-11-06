import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { keepDiary } from "../features/diarys/diarySlice";

const DiaryForm = () => {
  const dispatch = useDispatch<any>();

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
  const productTemp: Product = {
    productName: "Midnight Moisturizer",
    brandName: "Klairs",
    category: "Moisturizer",
  };
  const routinInfoTemp: RoutinInfo = {
    product: productTemp,
    comment:
      "Shop skincare products at Sephora. Find top-rated products from leading skincare brands to help target specific skin concerns and revitalize your look",
    takenAgain: true,
    target: "moistening",
    routinTime: false, //night
    frequency: "every day",
  };
  const diaryTemp: Diary = {
    diary: routinInfoTemp,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "diaryform",
  };
  const [diary, setDiary] = useState<Diary>({} as Diary);

  useEffect(() => {
    setDiary(diaryTemp);
  }, []);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    const product: Product = {
      productName:
        name === "productName" ? value : diary.diary?.product.productName,
      brandName: name === "brand" ? value : diary.diary?.product.brandName,
      category: name === "categorys" ? value : diary.diary?.product.category,
    };
    //setDiary({ ...diary.diary?,name, value });
    const newRoutinInfo: RoutinInfo = {
      product: product,
      comment: name === "comment" ? value : diary.diary?.comment,
      takenAgain:
        name === "takenAgain"
          ? value === "yes"
            ? true
            : false
          : diary.diary?.takenAgain,
      target: name === "target" ? value : diary.diary?.target,
      routinTime:
        name === "routinTime" ? (value === "morning" ? true : false) : false, //night
      frequency: name === "frequency" ? value : diary.diary?.frequency,
    };
    setDiary({ ...diary, diary: newRoutinInfo } as Diary);
    // setDiary(
    //   Object.assign(
    //     {},
    //     false,
    //     true,
    //     undefined,
    //     null,
    //     0,
    //     diary.diary?.comment,
    //     value
    //   )
    // );
    console.log(diary);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    dispatch(keepDiary({ diary }));
    setDiary({} as Diary);
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group d-flex">
          <div className="item">
            <label htmlFor="categorys">Category</label>

            <select
              name="categorys"
              id="categorys"
              onChange={(e) => onChange(e)}
            >
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="brand">Brand</label>
            <select name="brand" id="brand" onChange={(e) => onChange(e)}>
              <option value="Klairs">Klairs</option>
              <option value="Dermoskin">Dermoskin</option>
              <option value="Celenes">Celenes</option>
              <option value="Rovectin">Rovectin</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="productName">Product Name</label>
            <select
              name="productName"
              id="productName"
              onChange={(e) => onChange(e)}
            >
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="target">Target</label>
            <select name="target" id="target" onChange={(e) => onChange(e)}>
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
              value={diary.diary?.comment}
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
            <button type="submit" className="btn btn-light">
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default DiaryForm;
