/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./Reports.scss";
import ProjectDetail from "../Projects/ProjectDetail/ProjectDetail";
import axios from "axios";

export const Reports = ({ match }) => {
  const [projectName] = useState(match.params.projectName);
  var sprintLabels = useState([]);
  var [completedPoints] = useState([]);
  var [plannedPoints] = useState([]);
  var [technicalDebtPoints] = useState([]);
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    axios
      .get(`/reports/getReportData/${projectName}`)
      .then((response) => {
        console.log(response.data.data);
        response.data.data.forEach((item) => {
          sprintLabels.push(`Sprint-${item.sprint}`);
          completedPoints.push(item.completedPoints);
          plannedPoints.push(item.plannedPoints);
          technicalDebtPoints.push(item.plannedPoints - item.plannedPoints);
        });
        setChartData({
          labels: sprintLabels,
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
              data: technicalDebtPoints,
            },
          ],
        });
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <ProjectDetail>
      <main className="ProjectDetailMain">
        <div className="chart-container">
          <div className="projectSprintHeading">Velocity Chart</div>
          <div className="chart">
            {chartData ? (
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
            ) : null}
          </div>
        </div>
      </main>
    </ProjectDetail>
  );
};
