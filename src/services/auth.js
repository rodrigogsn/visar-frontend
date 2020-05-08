export const TOKEN_KEY = "@visar-Token";
export const USER_DATA = "@visar-User";
export const USER_PROFILE = "@visar-Profile";

// Verifica se o usuário já está autenticado
export const isAuthenticated = () => {
  const isAuth = localStorage.getItem(TOKEN_KEY) !== null;

  const confirmed = localStorage.getItem(USER_DATA)
    ? JSON.parse(localStorage.getItem(USER_DATA)).confirmed
    : false;

  if (isAuth && confirmed) {
    return true;
  } else {
    return false;
  }
};

// Verifica se o usuário já tem perfil
export const isProfileSet = () => {
  const isAuth = localStorage.getItem(TOKEN_KEY) !== null;

  const profile = localStorage.getItem(USER_DATA)
    ? JSON.parse(localStorage.getItem(USER_DATA)).profile
    : false;

  if (isAuth && profile) {
    return true;
  } else {
    return false;
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_DATA, user);
};

export const profile = (profile) => {
  localStorage.setItem(USER_PROFILE, profile);
};

export const logout = () => {
  localStorage.clear();
};
