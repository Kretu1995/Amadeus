export type MenuCategory =
  | "ribs"
  | "grill"
  | "starters"
  | "salads"
  | "desserts"
  | "drinks"
  | "specials";

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
