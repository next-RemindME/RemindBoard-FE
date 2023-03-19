import { auth } from "./instance";

export const signAPI = {
  goLogIn: (data: any) => auth.post(`/api/remind-board/member/sign-in`, data),
  goSignIn: (data: any) => auth.post(`/api/remind-board/member/sign-up`, data),
};
