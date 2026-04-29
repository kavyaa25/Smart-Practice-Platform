export const getData = () => {
  const data = localStorage.getItem("smartpractice");
  return data
    ? JSON.parse(data)
    : {
        submissions: [],
        stats: { totalAttempts: 0, avgScore: 0, highestScore: 0 }
      };
};

export const saveData = (data) => {
  localStorage.setItem("smartpractice", JSON.stringify(data));
};