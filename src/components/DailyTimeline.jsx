import { TextField, Grid, IconButton, Box, Stack, Button } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTask from "./forms/EditTask";
import { deleteTask, getTasks, clearAllTasks } from "../api/tasks";
import Swal from "sweetalert2";

const timesOfTheDay = [
  "12AM",
  "1AM",
  "2AM",
  "3AM",
  "4AM",
  "5AM",
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
  "10PM",
  "11PM",
];

const hourPlaceholders = {
  "7AM": "e.g. Breakfast",
  "9AM": "e.g. Work",
  "12PM": "e.g. Lunch Break",
  "3PM": "e.g. Meeting",
  "6PM": "e.g. Workout",
  "7PM": "e.g. Dinner",
};

function DailyTimeline({ tasks, setTasks }) {
  const [editing, setEditing] = useState(false);
  const today = new Date().toLocaleDateString("en-CA");

  const [selectedDate, setSelectedDate] = useState(today);
  const filteredTasks = tasks.filter((task) => task.date === selectedDate);

  const taskForTime = (hourLabel) =>
    filteredTasks.find((task) => task.startTime === hourLabel);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
      }
      setTasks(getTasks());
    });
  };

  const handleClear = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete all your saved tasks!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAllTasks();
        Swal.fire({
          title: "Cleared!",
          text: "All tasks have been deleted.",
          icon: "success",
        });
      }
      setTasks(getTasks());
    });
  };

  return (
    <div>
      <TextField
        type="date"
        label="Select Date"
        value={selectedDate}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setSelectedDate(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <div className="daily-timeline">
        {timesOfTheDay.map((hour, index) => {
          const task = taskForTime(hour);
          const currentHour = new Date().getHours();
          const placeholder = hourPlaceholders[hour] || "";

          let bgColor = "#004d40";
          if (selectedDate < today) {
            bgColor = "#424242";
          } else if (selectedDate === today) {
            if (index < currentHour) {
              bgColor = "#424242";
            } else if (index === currentHour) {
              bgColor = "#c62828";
            }
          }

          return (
            <Grid container spacing={2} className="time-slot" key={hour}>
              <Grid size="grow">
                <strong>{hour}</strong>
              </Grid>

              <Grid size={{ xs: 6, md: 8 }}>
                {task && editing === task.id ? (
                  <EditTask
                    task={task}
                    setEditing={setEditing}
                    setTasks={setTasks}
                  />
                ) : (
                  <input
                    type="text"
                    className="task-input"
                    placeholder={placeholder}
                    value={task ? task.name : ""}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: bgColor,
                    }}
                  />
                )}
              </Grid>

              <Grid size="grow">
                {task && editing !== task.id && (
                  <Stack direction="row">
                    <IconButton onClick={() => setEditing(task.id)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(task.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                )}
              </Grid>
            </Grid>
          );
        })}
      </div>
      <Button
        variant="outlined"
        color="error"
        sx={{ margin: 2 }}
        onClick={handleClear}
      >
        Clear All
      </Button>
    </div>
  );
}

export default DailyTimeline;
