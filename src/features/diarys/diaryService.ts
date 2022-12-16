import axios from "axios";

const API_URL = "https://6314996efa82b738f74a8bce.mockapi.io/diary";

// keep diary
const keepDiary = async (diaryData: object) => {
  const response = await axios.post(API_URL, diaryData);

  return response.data;
};

// get diaries
const getDiaries = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
};

const diaryService = {
  keepDiary,
  getDiaries,
};
export default diaryService;
