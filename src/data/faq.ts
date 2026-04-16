export interface FaqItem {
  questionKey: string;
  answerKey: string;
  category: "reservations" | "menu" | "locations" | "events" | "practical";
}

export const faqItems: FaqItem[] = [
  {
    questionKey: "faq.items.allYouCanEat.question",
    answerKey: "faq.items.allYouCanEat.answer",
    category: "menu",
  },
  {
    questionKey: "faq.items.reservation.question",
    answerKey: "faq.items.reservation.answer",
    category: "reservations",
  },
  {
    questionKey: "faq.items.walkIn.question",
    answerKey: "faq.items.walkIn.answer",
    category: "reservations",
  },
  {
    questionKey: "faq.items.groupBooking.question",
    answerKey: "faq.items.groupBooking.answer",
    category: "events",
  },
  {
    questionKey: "faq.items.sameDay.question",
    answerKey: "faq.items.sameDay.answer",
    category: "reservations",
  },
  {
    questionKey: "faq.items.vegetarian.question",
    answerKey: "faq.items.vegetarian.answer",
    category: "menu",
  },
  {
    questionKey: "faq.items.giftVoucher.question",
    answerKey: "faq.items.giftVoucher.answer",
    category: "practical",
  },
  {
    questionKey: "faq.items.parking.question",
    answerKey: "faq.items.parking.answer",
    category: "practical",
  },
  {
    questionKey: "faq.items.privateEvent.question",
    answerKey: "faq.items.privateEvent.answer",
    category: "events",
  },
  {
    questionKey: "faq.items.locations.question",
    answerKey: "faq.items.locations.answer",
    category: "locations",
  },
  {
    questionKey: "faq.items.openingHours.question",
    answerKey: "faq.items.openingHours.answer",
    category: "practical",
  },
  {
    questionKey: "faq.items.children.question",
    answerKey: "faq.items.children.answer",
    category: "practical",
  },
];
