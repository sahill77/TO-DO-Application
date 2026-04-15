export const getToken = () => localStorage.getItem('todo_token');
export const setToken = (token) => localStorage.setItem('todo_token', token);
export const removeToken = () => localStorage.removeItem('todo_token');

export const getUser = () => {
  const user = localStorage.getItem('todo_user');
  return user ? JSON.parse(user) : null;
};
export const setUser = (user) => localStorage.setItem('todo_user', JSON.stringify(user));
export const removeUser = () => localStorage.removeItem('todo_user');

export const clearAuth = () => {
  removeToken();
  removeUser();
};

export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};
