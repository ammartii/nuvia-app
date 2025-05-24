export interface Entry {
  id: string;
  image: string;
  text: string;
  date: string;
  activities?: string[];
  isFavorite?: boolean;
}
