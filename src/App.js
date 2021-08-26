import "./App.css";
import BarData from "./components/BarChart";
import { chartData } from "./data/data";
import { useState, useEffect } from "react";

function App() {
  const [Tasks, setTasks] = useState([]);
  const [TempTasks, setTempTasks] = useState([]);
  const [Names, setNames] = useState([]);
  let chartMainData = chartData;

  let names = [];
  let tasks = [];
  let tmpTsk;

  const priorityFilters = [];
  const statusFilters = [];
  const typeFilters = [];

  useEffect(() => {
    chartMainData.map(function (el) {
      if (names.indexOf(el.assignee) === -1) {
        names.push(el.assignee);
        var res = chartMainData.filter(function (bl) {
          return bl.assignee === el.assignee;
        });
        tasks.push(res.length);

        setTasks(tasks);
      }
    });
    setNames(names);
    tmpTsk = new Array(names.length).fill(0);
    setTempTasks(tmpTsk);
  }, []);

  function initializeFilter() {
    chartMainData.map(function (el) {
      if (priorityFilters.indexOf(el.priority) === -1) {
        priorityFilters.push(el.priority);
      }
      if (statusFilters.indexOf(el.status) === -1) {
        statusFilters.push(el.status);
      }
      if (typeFilters.indexOf(el.issue_type) === -1) {
        typeFilters.push(el.issue_type);
      }
    });
  }

  initializeFilter();

  const data = {
    labels: Names,
    datasets: [
      {
        label: "Number of tickets assigned",
        data: Tasks,
      },
    ],
  };

  function handleInputChange() {
    let checkEle = document.querySelectorAll(".filter-check");
    checkEle.forEach((item) => {
      if (item.checked) {
        tasks = [];
        Names.map((el) => {
          var filteredResult = chartMainData.filter((bl) => {
            return bl.assignee === el && bl[item.name] === item.value;
          });
          tasks.push(filteredResult.length);
        });
      }
    });

    if (tasks.length > 0) {
      var resultTasks = TempTasks.map(function (num, idx) {
        return parseInt(num + tasks[idx]);
      });
      setTempTasks(resultTasks);
      setTasks(resultTasks);
    }
  }

  return (
    <div className="App">
      <div className="filter-area">
        <h2 className="filter-header">Apply Filters</h2>
        <div className="filter-box">
          <h3 className="filter-sub">Priority</h3>
          {priorityFilters.map((el) => {
            return (
              <p>
                <input
                  className="filter-check"
                  type="checkbox"
                  name="priority"
                  onClick={handleInputChange}
                  value={el}
                />
                <label>{el}</label>
              </p>
            );
          })}
        </div>
        <div className="filter-box">
          <h3 className="filter-sub">Type</h3>
          {typeFilters.map((el) => {
            return (
              <p>
                <input
                  className="filter-check"
                  type="checkbox"
                  name="issue_type"
                  onClick={handleInputChange}
                  value={el}
                />
                <label>{el}</label>
              </p>
            );
          })}
        </div>
        <div className="filter-box">
          <h3 className="filter-sub">Status</h3>
          {statusFilters.map((el) => {
            return (
              <p>
                <input
                  className="filter-check"
                  type="checkbox"
                  name="status"
                  onClick={handleInputChange}
                  value={el}
                />
                <label>{el}</label>
              </p>
            );
          })}
        </div>
      </div>
      <BarData chartData={data}></BarData>
    </div>
  );
}

export default App;
