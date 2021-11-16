const userToken = 'USER_TOKEN';
const userId = 'USER_ID';

export const localStorageOption = {
  setUserToken: (value: any) => localStorage.setItem(userToken, value),
  setUserId: (value: any) => localStorage.setItem(userId, value),
  remove: () => {
    localStorage.removeItem('USER_TOKEN');
    localStorage.removeItem('USER_ID');
  },
};
