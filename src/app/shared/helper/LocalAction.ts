const userToken = 'USER_TOKEN';
const userId = 'USER_ID';

export const localStorageOption = {
  setUserToken: (value: any) => localStorage.setItem(userToken, value),
  setUserId: (value: any) => localStorage.setItem(userId, value),
  getUserToken: localStorage.getItem(userToken),
  getUserId: localStorage.getItem(userId),
  remove: () => {
    localStorage.clear();
  },
};
