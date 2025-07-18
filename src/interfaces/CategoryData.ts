export interface CategoryData {
  image: Image;
  category: string;
  title: string;
  date: Date;
  time: number;
  description: string;
  id ?: string;
}

interface Image {
  url: string;
  tag: string;
}
