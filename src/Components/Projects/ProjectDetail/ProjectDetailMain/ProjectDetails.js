import { v4 as uuid } from "uuid";

const itemsData = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
];

const columnsData = {
  [uuid()]: {
    name: "To do",
    items: itemsData,
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "In Review",
    items: [],
  },
  [uuid()]: {
    name: "In Testing",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

export { itemsData, columnsData };
