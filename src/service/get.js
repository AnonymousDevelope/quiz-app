import axios from "axios";
import { useNavigate } from "react-router";

export const fetchQuestions = async (formData, setQuestions, setLoading) => {
  const { category, difficulty } = formData;
  try {
    setLoading(true);
    await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    ).then((response) => {
      setLoading(false);
      setQuestions(response.data.results);
    })
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};
