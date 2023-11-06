export interface TopicState {
  topic: {
    _id: string | null;
    name: string | null;
    level: "beginner" | "medium" | "advanced" | null;
  };
}

export interface TopicItem {
  _id: string;
  name: string;
  level: "beginner" | "medium" | "advanced";
}

export interface TopicBase extends Omit<TopicItem, "_id"> {}
