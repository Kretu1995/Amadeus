import type { MenuItem } from "@/types/menu";

export const menuItems: MenuItem[] = [
  // === RIBS (Signature) ===
  {
    id: "spareribs-classic",
    nameKey: "menu.items.spareribs.name",
    descriptionKey: "menu.items.spareribs.description",
    category: "ribs",
    price: null,
    isAllYouCanEat: true,
    isSignature: true,
    image: "/images/menu/spareribs-classic.jpg",
    dietary: [],
  },
  {
    id: "spareribs-bbq",
    nameKey: "menu.items.spareribs_bbq.name",
    descriptionKey: "menu.items.spareribs_bbq.description",
    category: "ribs",
    price: null,
    isAllYouCanEat: true,
    isSignature: true,
    image: "/images/menu/spareribs-bbq.jpg",
    dietary: [],
  },
  {
    id: "spareribs-honey",
    nameKey: "menu.items.spareribs_honey.name",
    descriptionKey: "menu.items.spareribs_honey.description",
    category: "ribs",
    price: null,
    isAllYouCanEat: true,
    isSignature: false,
    image: "/images/menu/spareribs-honey.jpg",
    dietary: [],
  },

  // === GRILL ===
  {
    id: "mixed-grill",
    nameKey: "menu.items.mixed_grill.name",
    descriptionKey: "menu.items.mixed_grill.description",
    category: "grill",
    price: 24.5,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: [],
  },
  {
    id: "salmon-grill",
    nameKey: "menu.items.salmon.name",
    descriptionKey: "menu.items.salmon.description",
    category: "grill",
    price: 22.0,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: [],
  },
  {
    id: "prawns",
    nameKey: "menu.items.prawns.name",
    descriptionKey: "menu.items.prawns.description",
    category: "grill",
    price: 23.5,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: [],
  },

  // === STARTERS ===
  {
    id: "soup-of-day",
    nameKey: "menu.items.soup.name",
    descriptionKey: "menu.items.soup.description",
    category: "starters",
    price: 7.5,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: ["vegetarian"],
  },
  {
    id: "garlic-bread",
    nameKey: "menu.items.garlic_bread.name",
    descriptionKey: "menu.items.garlic_bread.description",
    category: "starters",
    price: 6.5,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: ["vegetarian"],
  },

  // === SALADS ===
  {
    id: "caesar-salad",
    nameKey: "menu.items.caesar.name",
    descriptionKey: "menu.items.caesar.description",
    category: "salads",
    price: 16.5,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: [],
  },
  {
    id: "veggie-plate",
    nameKey: "menu.items.veggie.name",
    descriptionKey: "menu.items.veggie.description",
    category: "salads",
    price: 18.0,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: ["vegetarian"],
  },

  // === DESSERTS ===
  {
    id: "dame-blanche",
    nameKey: "menu.items.dame_blanche.name",
    descriptionKey: "menu.items.dame_blanche.description",
    category: "desserts",
    price: 9.5,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: ["vegetarian"],
  },
  {
    id: "tiramisu",
    nameKey: "menu.items.tiramisu.name",
    descriptionKey: "menu.items.tiramisu.description",
    category: "desserts",
    price: 9.5,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: ["vegetarian"],
  },

  // === DRINKS ===
  {
    id: "irish-coffee",
    nameKey: "menu.items.irish_coffee.name",
    descriptionKey: "menu.items.irish_coffee.description",
    category: "drinks",
    price: 10.5,
    isAllYouCanEat: false,
    isSignature: true,
    image: "/images/menu/irish-coffee.jpg",
    dietary: [],
  },
  {
    id: "house-wine-red",
    nameKey: "menu.items.house_wine_red.name",
    descriptionKey: "menu.items.house_wine_red.description",
    category: "drinks",
    price: 5.5,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: [],
  },
  {
    id: "house-wine-white",
    nameKey: "menu.items.house_wine_white.name",
    descriptionKey: "menu.items.house_wine_white.description",
    category: "drinks",
    price: 5.5,
    isAllYouCanEat: false,
    isSignature: false,
    dietary: [],
  },
];

export function getMenuByCategory(category: string) {
  return menuItems.filter((item) => item.category === category);
}

export function getSignatureItems() {
  return menuItems.filter((item) => item.isSignature);
}
