import { Folder } from "./folder.model";
import { Note } from "./note.model";
import { Entrie } from "./entrie.model";
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
  entries?: Entrie[];
  motivations?: MotivationItem[];
  favorites?: Entrie[];
}
