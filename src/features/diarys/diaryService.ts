import axios from "axios";
import moment from "moment";
import { IDiary, IProduct, IRoutinInfo } from "../../models/DiaryModels";

const API_URL = "https://6314996efa82b738f74a8bce.mockapi.io/diary";

type Products = {
  products: IRoutinInfo[];
};
var products: any = [];
// keep diary - if there's no diary for today
const keepDiary = async (diaryData: IDiary) => {
  products = diaryData.diary;
  const response = await axios.post(API_URL, diaryData);
  return response.data;
};

// update diary
const updateDiary = async (diaryData: IDiary) => {
  const response = await axios.put(API_URL + "/" + diaryData.id, diaryData);
  return response.data;
};

// get diaries
const getDiaries = async () => {
  const response = await axios.get(API_URL);
  const localStorageData: any = localStorage.getItem("user");
  const userId = JSON.parse(localStorageData).userId;

  const diaryRes = new Promise((resolve, reject) => {
    const todayDiary = response.data.filter(
      (d: any) =>
        d.userId === userId &&
        moment(d.createdAt).format("MM-DD-YYYY") ===
          moment().format("MM-DD-YYYY")
    );
    //const diaries2 = response.data.filter((d: any) => d.userId === userId);

    setTimeout(() => {
      resolve(todayDiary);
    }, 100);
  });

  return diaryRes;
};

const diaryService = {
  keepDiary,
  getDiaries,
  updateDiary,
};
export default diaryService;
