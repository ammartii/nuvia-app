import { User } from "../models/user.model";
import {
  getActiveUser,
  setActiveUser,
  clearActiveUser,
} from "./session.service";

const USERS_KEY = "users"; // Clave para guardar todos los usuarios en localStorage

// Obtiene todos los usuarios (objeto con id -> usuario) desde localStorage
export const getAllUsers = (): Record<string, User> => {
  try {
    const usersStr = localStorage.getItem(USERS_KEY);
    return usersStr ? JSON.parse(usersStr) : {};
  } catch (error) {
    console.error("Error getting users from localStorage:", error);
    return {};
  }
};

// Guarda todos los usuarios en localStorage
export const saveAllUsers = (users: Record<string, User>): void => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
};

// Crea un nuevo usuario, lanza error si ya existe uno con ese id
export const createNewUser = (user: User): void => {
  const users = getAllUsers();
  if (users[user.id]) throw new Error("Usuario ya existe");

  users[user.id] = user;
  saveAllUsers(users);
};

// Actualiza un usuario parcial por id, lanza error si no existe
// También sincroniza el usuario activo si coincide con el id actualizado
export const updateUser = (id: string, newData: Partial<User>): void => {
  const users = getAllUsers();
  if (!users[id]) throw new Error("Usuario no encontrado");

  users[id] = { ...users[id], ...newData };
  saveAllUsers(users);

  // Actualizar usuario activo en sesión si es el mismo usuario
  const activeUser = getActiveUser();
  if (activeUser?.id === id) {
    setActiveUser(users[id]);
  }
};

// Obtiene un usuario por id, o null si no existe
export const getUser = (id: string): User | null => {
  const users = getAllUsers();
  return users[id] ?? null;
};

// Elimina un usuario por id, lanza error si no existe
// Si el usuario eliminado es el activo, limpia la sesión también
export const deleteUser = (id: string): void => {
  const users = getAllUsers();
  if (!users[id]) throw new Error("Usuario no encontrado");

  delete users[id];
  saveAllUsers(users);

  // Limpiar sesión si el usuario borrado era el activo
  const activeUser = getActiveUser();
  if (activeUser?.id === id) {
    clearActiveUser();
  }
};
