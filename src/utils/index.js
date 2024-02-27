export const changeDataForChart = (data) => {
  return data.map((_data) => {
    const realTime = new Date(_data.time * 1000);
    const day = String(realTime.getDate()).padStart(2, "0");
    const hours = String(realTime.getHours()).padStart(2, "0");
    return { ..._data, time: `${day}D/${hours}h` };
  });
};
export const getMinMaxAvg = (data) => {
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  return { max: Math.max(...data), min: Math.min(...data), avg };
};
