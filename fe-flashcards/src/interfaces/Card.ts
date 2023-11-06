export interface Card {
  _id: string;
  question: string;
  order: number;
  answer: string | null;
}

export interface CardsState {
  cards: Card[];
}
