import axiosInstance from "../axios";

const SCHOOL_ID = process.env.NEXT_PUBLIC_BETTERSCHOOL_ID ?? "bodhi";

export async function sendContactMessage(payload: any): Promise<any> {
  const response = await axiosInstance.post("/contactMessage", {
    school: SCHOOL_ID,
    ...payload,
  });

  return response.data;
}
