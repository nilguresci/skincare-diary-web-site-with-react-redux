import axios from "axios";
import moment from "moment";

const API_URL = "https://6314996efa82b738f74a8bce.mockapi.io/diary";

// keep diary
const keepDiary = async (diaryData: object) => {
  const response = await axios.post(API_URL, diaryData);

  return response.data;
};

// get diaries
const getDiaries = async () => {
  const response = await axios.get(API_URL);
  const localStorageData: any = localStorage.getItem("user");
  const userId = JSON.parse(localStorageData).userId;

  const diaryRes = new Promise((resolve, reject) => {
    const diaries = response.data.filter(
      (d: any) =>
        d.userId === userId &&
        moment(d.createdAt).format("MM-DD-YYYY") ===
          moment().format("MM-DD-YYYY")
    );

    setTimeout(() => {
      console.log("diaries", diaries);
      resolve(diaries);
    }, 100);
  });

  return diaryRes;
};

const diaryService = {
  keepDiary,
  getDiaries,
};
export default diaryService;
