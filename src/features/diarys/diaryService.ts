import axios from "axios";

const API_URL = "https://6314996efa82b738f74a8bce.mockapi.io/diary";

// keep diary
const keepDiary = async (diaryData: object) => {
  const response = await axios.post(API_URL, diaryData);

  return response.data;
};

const diaryService = {
  keepDiary,
};
export default diaryService;
