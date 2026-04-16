export type MenuCategory =
  | "starters"
  | "mains"
  | "specials"
  | "desserts"
  | "aperitifs"
  | "beers"
  | "wines"
  | "drinks";

export type DietaryTag = "vegetarian" | "vegan" | "glutenFree" | "spicy";

export interface MenuItem {
  id: string;
  nameKey: string;
  descriptionKey: string;
  category: MenuCategory;
  price: number | null;
  isAllYouCanEat: boolean;
  isSignature: boolean;
  image?: string;
  dietary: DietaryTag[];
}
