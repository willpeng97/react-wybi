import axiosInstance from "./axiosInstance";

export const getGrid = async (SID: string | undefined) => {
  try {
    const response = await axiosInstance.post("GetGrid", {}, {
      headers: {
        SID: SID,
        // TokenKey: "WEYU54226552",
      },
    });

    if (response.data.result) {
      return response.data.Grid_Data;
    } else {
      throw new Error("API 回傳錯誤：" + JSON.stringify(response.data));
    }
  } catch (error) {
    console.error("getGrid 發生錯誤:", error);
    throw error; // 讓外部處理錯誤
  }
};