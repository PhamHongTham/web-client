export const addInfoLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value)
}

export const removeInfoUserLocalStorage = () => {
  localStorage.removeItem('USER_TOKEN')
  localStorage.removeItem('USER_ID')
}
