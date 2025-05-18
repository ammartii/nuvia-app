import { User } from "../models/user.model";

const ACTIVE_USER_KEY = "active_user"; // Clave para guardar usuario activo en localStorage
const AUTH_TOKEN_KEY = "auth_token"; // Clave para guardar token de autenticación

// Guarda el usuario activo en localStorage (stringificado)
export const setActiveUser = (user: User): void => {
  try {
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving active user to localStorage:", error);
  }
};

// Obtiene el usuario activo desde localStorage (parsea JSON)
export const getActiveUser = (): User | null => {
  try {
    const userStr = localStorage.getItem(ACTIVE_USER_KEY);
    return userStr ? (JSON.parse(userStr) as User) : null;
  } catch (error) {
    console.error("Error parsing active user from localStorage:", error);
    return null;
  }
};

// Limpia usuario activo y token de localStorage (al cerrar sesión)
export const clearActiveUser = (): void => {
  localStorage.removeItem(ACTIVE_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// Guarda el token de autenticación (JWT o similar)
export const setAuthToken = (token: string): void => {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving auth token to localStorage:", error);
  }
};

// Obtiene el token de autenticación almacenado
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Error reading auth token from localStorage:", error);
    return null;
  }
};

// Elimina el token de autenticación (al cerrar sesión)
export const clearAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
