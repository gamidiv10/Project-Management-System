import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./ProjectDetailMain.scss";
import { columnsData } from "./ProjectDetails";
import { Button, Form } from "react-bootstrap";

const onDrag = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  // If it is dragged into different column
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const sourceItems = [...sourceColumn.items];

    const destinationColumn = columns[destination.droppableId];
    const destinationItems = [...destinationColumn.items];

    const [removedItems] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, removedItems);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        items: destinationItems,
      },
    });
  }
  // If it is dragged into same column
  else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removedItems] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removedItems);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function ProjectDetailMain() {
  const [columns, setColumns] = useState(columnsData);
  return (
    <main className="ProjectDetailMain">
      <section className="projectSprintHeader">
        <div className="projectSprintHeading">Sprint Name</div>
        <div className="buttons">
          <Button>Complete Sprint</Button>
        </div>
      </section>
      <section>
        <Form className="projectForm">
          <Form.Control type="text" placeholder="Search for Issue" />
        </Form>
      </section>
      <section className="ProjectDetailMainLayout">
        <DragDropContext
          onDragEnd={(result) => onDrag(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <article className="ProjectDetailDiv" key={columnId}>
                <div>{column.name}</div>
                <div style={{ margin: 8 }}>
                  <Droppable
                    droppableId={columnId}
                    key={columnId}
                    className="DraggableDiv"
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="ProjectProgressDiv"
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "white",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="DraggableDiv"
                                      style={{
                                        userSelect: "none",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </article>
            );
          })}
        </DragDropContext>
      </section>
    </main>
  );
}

export default ProjectDetailMain;
