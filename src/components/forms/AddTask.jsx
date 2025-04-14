import {
  TextField,
  Stack,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { addTask, getTasks } from "../../api/tasks";
import { v4 as uuidv4 } from "uuid";
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

function AddTask({ setTasks }) {
  const today = new Date().toLocaleDateString("en-CA");
  const [task, setTask] = useState({
    id: uuidv4(),
    name: "",
    isFinish: false,
    date: today,
    startTime: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const startIndex = timesOfTheDay.indexOf(task.startTime);

    if (startIndex === -1) {
      alert("Please select a valid time.");
      return;
    }

    setTask((prevTask) => ({ ...prevTask, id: uuidv4() }));
    let data = addTask(task);
    Swal.fire({
      icon: "success",
      title: "Good job!",
      text: data.msg,
    });
    setTasks(getTasks);

    setTask({
      id: uuidv4(),
      name: "",
      isFinish: false,
      date: today,
      startTime: "",
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <Stack spacing={2} sx={{ maxWidth: 400, margin: "0 auto" }}>
        <TextField
          label="Task Name"
          name="name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value.trim() })}
        />

        <TextField
          label="Select Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          name="date"
          value={task.date}
          onChange={(e) => setTask({ ...task, date: e.target.value })}
        />

        <FormControl>
          <InputLabel id="start-time">Select Time</InputLabel>
          <Select
            labelId="start-time"
            label="Start Time"
            name="startTime"
            value={task.startTime}
            onChange={(e) => setTask({ ...task, startTime: e.target.value })}
          >
            {timesOfTheDay.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained">
          Add Task
        </Button>
      </Stack>
    </form>
  );
}
export default AddTask;
