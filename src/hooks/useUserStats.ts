import { useMemo } from "react";
import { useActiveUser } from "./useActiveUser";
import { Note } from "../models/note.model";

export function useUserStats() {
  const { user } = useActiveUser();

  const stats = useMemo(() => {
    if (!user) {
      return {
        entriesCount: 0,
        photosCount: 0,
        notesCount: 0,
      };
    }

    const entriesCount = user.entries?.length || 0;

    const notes: Note[] = user.notes || [];
    const photosCount = notes.filter(
      (note) => note.image && note.image.trim() !== ""
    ).length;

    const notesCount = notes.length;

    return {
      entriesCount,
      photosCount,
      notesCount,
    };
  }, [user]);

  return stats;
}
