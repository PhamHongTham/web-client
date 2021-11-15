export const addInfoLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value)
}

export const removeInfoLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
