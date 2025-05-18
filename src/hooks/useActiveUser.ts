// hooks/useActiveUser.ts
import { useState, useEffect, useCallback } from "react";
import { User } from "../models/user.model";
import {
  getActiveUser,
  setActiveUser,
  clearActiveUser,
  setAuthToken,
  clearAuthToken,
} from "../services/session.service";
import { getUser, updateUser } from "../services/user.service";

export function useActiveUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const activeUser = getActiveUser();
    setUser(activeUser);
  }, []);

  const loginUser = useCallback((userId: string, token?: string) => {
    const foundUser = getUser(userId);
    console.log("loginUser -> foundUser:", foundUser);
    if (!foundUser) {
      throw new Error("Usuario no encontrado");
    }
    setActiveUser(foundUser);
    if (token) setAuthToken(token);
    setUser(foundUser);
  }, []);

  const updateActiveUser = useCallback(
    (newData: Partial<User>) => {
      if (!user) throw new Error("No hay usuario activo");
      updateUser(user.id, newData);
      const updatedUser = getUser(user.id);
      if (!updatedUser) throw new Error("Error actualizando usuario");
      setActiveUser(updatedUser);
      setUser(updatedUser);
    },
    [user]
  );

  const logoutUser = useCallback(() => {
    clearActiveUser();
    clearAuthToken();
    setUser(null);
  }, []);

  return {
    user,
    loginUser,
    updateActiveUser,
    logoutUser,
  };
}
