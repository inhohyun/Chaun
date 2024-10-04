import exportAxios from './axiosInstance';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// 개인 퀘스트 조회
export const getQuest = async () => {
  const response = await exportAxios.get(`${baseUrl}/quest/get/user`);
  return response.data;
};

// 크루 퀘스트 조회
export const getCrewQuest = async (crew_id: number) => {
  const response = await exportAxios.get(`${baseUrl}/quest/get/crew`, {
    params: {
      crew_id,
    },
  });
  return response.data;
};