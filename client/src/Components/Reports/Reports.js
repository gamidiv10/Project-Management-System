import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./Reports.scss";
import ProjectDetail from "../Projects/ProjectDetail/ProjectDetail";
import axios from "axios";

export const Reports = ({ match }) => {
  const [projectName] = useState(match.params.projectName);
  var [completedPoints] = useState([]);
  var [plannedPoints] = useState([]);
  var chartData = {};
  useEffect(() => {
    axios
      .get(`/reports/getReportData/${projectName}`)
      .then((response) => {
        console.log(response.data.data);
        response.data.data.forEach((item) => {
          completedPoints.push(item.completedPoints);
          plannedPoints.push(item.plannedPoints);
        });
        chartData = {
          labels: ["Sprint-1", "Sprint-2", "Sprint-3", "Sprint-4"],
          datasets: [
            {
              label: "Committed",
              backgroundColor: "blue",
              data: plannedPoints,
            },
            {
              label: "Completed",
              backgroundColor: "green",
              data: completedPoints,
            },
            {
              label: "Technical Debt",
              backgroundColor: "red",
              data: [3, 0, 2, 1],
            },
          ],
        };
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <ProjectDetail>
      <main className="ProjectDetailMain">
        <div className="chart-container">
          <div className="projectSprintHeading">Velocity Chart</div>
          <div className="chart">
            <Bar
              data={chartData}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
      </main>
    </ProjectDetail>
  );
};
