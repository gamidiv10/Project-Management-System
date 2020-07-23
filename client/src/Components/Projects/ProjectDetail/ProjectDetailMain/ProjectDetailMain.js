import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./ProjectDetailMain.scss";
import { Form } from "react-bootstrap";
import ProjectDetail from "../ProjectDetail";
import tasksItemsContext from "../../../../Context/tasksItemsContext";
import Modal from "../../../Modal/Modal";
import CompleteSprint from "../../../CompleteSprint/CompleteSprint";
import { v4 as uuid } from "uuid";
import ProjectDetailHeader from "../ProjectDetailHeader/ProjectDetailHeader";
import EditTask from "../../../Task/EditTask/EditTask";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Task from "../../../Task/Task";

const onDrag = (
  result,
  columns,
  setColumns,
  setDroppableId,
  setDroppableStatus,
  setOnDrag,
  drag
) => {
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

    setDroppableId(removedItems.id);
    setDroppableStatus(columns[destination.droppableId].name);
    setOnDrag(!drag);
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

function ProjectDetailMain({ match }) {
  const { tasks, setTasks } = useContext(tasksItemsContext);
  const [columns, setColumns] = useState([]);
  const [toDoData, setToDoData] = useState(tasks);
  const [inProgress, setInProgress] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [inTesting, setInTesting] = useState([]);
  const [done, setDone] = useState([]);
  const [task, setTask] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [sprintNumber] = useState(2);
  const [projectName, setProjectName] = useState(match.params.projectName);
  const [droppableId, setDroppableId] = useState("");
  const [droppableStatus, setDroppableStatus] = useState("");
  const [drag, setOnDrag] = useState(false);

  useEffect(() => {
    setProjectName(match.params.projectName);
  }, [match.params.projectName]);

  useEffect(() => {
    setToDoData(tasks);
  }, [tasks]);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const dismissable = () => {
    setIsModalOpen(false);
  };

  const handleModalOpenEdit = (task) => {
    setTask(task);
    setIsModalOpenEdit(!isModalOpenEdit);
  };

  const dismissableEdit = () => {
    setIsModalOpenEdit(false);
  };

  const columnsData = {
    [uuid()]: {
      name: "To do",
      items: toDoData,
    },
    [uuid()]: {
      name: "In Progress",
      items: inProgress,
    },
    [uuid()]: {
      name: "In Review",
      items: inReview,
    },
    [uuid()]: {
      name: "In Testing",
      items: inTesting,
    },
    [uuid()]: {
      name: "Done",
      items: done,
    },
  };

  useEffect(() => {
    if (droppableId && droppableStatus) {
      axios
        .put(`/task/changeTaskByStatus/${droppableStatus}/${droppableId}`)
        .then((response) => {})
        .catch((error) => console.log(error.message));
    }
  }, [drag]);

  useEffect(() => {
    setColumns(columnsData);
  }, [toDoData, inProgress, inReview, inTesting, done]);

  useEffect(() => {
    axios
      .get(`/task/getTaskByStatus/${projectName}/To do/${sprintNumber}`)
      .then((response) => {
        const tasksData = response.data;
        const displayTasks = [];

        tasksData.map((task) => {
          const details = {
            taskSummary: task.summary,
            issueType: task.issueType,
            taskPriority: task.priority,
            assigneeName: task.assignee,
          };
          displayTasks.push({
            id: task.id,
            task: { ...task },
            content: <Task {...details} />,
          });
        });

        setToDoData(displayTasks);
        setTasks(displayTasks);
      })
      .catch((error) => console.log(error.message));

    axios
      .get(`/task/getTaskByStatus/${projectName}/In Progress/${sprintNumber}`)
      .then((response) => {
        const tasksData = response.data;
        const displayTasks = [];

        tasksData.map((task) => {
          const details = {
            taskSummary: task.summary,
            issueType: task.issueType,
            taskPriority: task.priority,
            assigneeName: task.assignee,
          };
          displayTasks.push({
            id: task.id,
            task: { ...task },
            content: <Task {...details} />,
          });
        });

        setInProgress(displayTasks);
      })
      .catch((error) => console.log(error.message));

    axios
      .get(`/task/getTaskByStatus/${projectName}/In Review/${sprintNumber}`)
      .then((response) => {
        const tasksData = response.data;
        const displayTasks = [];

        tasksData.map((task) => {
          const details = {
            taskSummary: task.summary,
            issueType: task.issueType,
            taskPriority: task.priority,
            assigneeName: task.assignee,
          };
          displayTasks.push({
            id: task.id,
            task: { ...task },
            content: <Task {...details} />,
          });
        });

        setInReview(displayTasks);
      })
      .catch((error) => console.log(error.message));

    axios
      .get(`/task/getTaskByStatus/${projectName}/In Testing/${sprintNumber}`)
      .then((response) => {
        const tasksData = response.data;
        const displayTasks = [];

        tasksData.map((task) => {
          const details = {
            taskSummary: task.summary,
            issueType: task.issueType,
            taskPriority: task.priority,
            assigneeName: task.assignee,
          };
          displayTasks.push({
            id: task.id,
            task: { ...task },
            content: <Task {...details} />,
          });
        });

        setInTesting(displayTasks);
      })
      .catch((error) => console.log(error.message));

    axios
      .get(`/task/getTaskByStatus/${projectName}/Done/${sprintNumber}`)
      .then((response) => {
        const tasksData = response.data;
        const displayTasks = [];

        tasksData.map((task) => {
          const details = {
            taskSummary: task.summary,
            issueType: task.issueType,
            taskPriority: task.priority,
            assigneeName: task.assignee,
          };
          displayTasks.push({
            id: task.id,
            task: { ...task },
            content: <Task {...details} />,
          });
        });

        setDone(displayTasks);
      })
      .catch((error) => console.log(error.message));
  }, [projectName]);

  return (
    <ProjectDetail>
      <main className="ProjectDetailMain">
        <ProjectDetailHeader />
        <section>
          <Form className="projectForm">
            <Form.Control type="text" placeholder="Search for Issue" />
          </Form>
        </section>
        <section className="ProjectDetailMainLayout" id="scrollbar-1">
          <DragDropContext
            onDragEnd={(result) =>
              onDrag(
                result,
                columns,
                setColumns,
                setDroppableId,
                setDroppableStatus,
                setOnDrag,
                drag
              )
            }
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <article className="ProjectDetailDiv" key={columnId}>
                  <div>{column.name}</div>
                  <div
                    style={{ margin: 15 }}
                    className="DroppableDiv"
                    id="scrollbar-2"
                  >
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
                            {column.items.length > 0
                              ? column.items.map((item, index) => {
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
                                            onClick={() =>
                                              handleModalOpenEdit(item.task)
                                            }
                                          >
                                            {item.content}
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })
                              : ""}
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

      <Modal
        visible={isModalOpen}
        children={isModalOpen ? <CompleteSprint dismiss={dismissable} /> : ""}
      />

      <Modal
        visible={isModalOpenEdit}
        children={
          isModalOpenEdit ? (
            <EditTask dismiss={dismissableEdit} task={task} />
          ) : (
            ""
          )
        }
      />
    </ProjectDetail>
  );
}

export default ProjectDetailMain;
