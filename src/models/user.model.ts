import { Folder } from "./folder.model";
import { Note } from "./note.model";
import { Entry } from "./entry.model";
import { MotivationItem } from "./motivation.model";

export interface User {
  id: string; // ID único (email o UUID)
  username: string;
  password: string;
  email: string;
  avatarUrl: string;
  goals?: string[];

  folders?: Folder[];
  notes?: Note[];
  entries?: Entry[];
  motivations?: MotivationItem[];
  favorites?: Entry[];
}
