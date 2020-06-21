import React from "react";
import { v4 as uuid } from "uuid";
import Task from "../../../Task/Task";

const itemsData = [
  {
    id: uuid(),
    content: (
      <Task
        name="First Task"
        priority="Highest"
        taskType="Epic"
        assigneeName="XYZ"
      />
    ),
  },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Second task" },
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
