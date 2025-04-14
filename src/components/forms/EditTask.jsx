import { useState } from "react";
import { editTask, getTasks } from "../../api/tasks";
import { IconButton, InputAdornment, Input } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Swal from "sweetalert2";

function EditTask({ task, setEditing, setTasks }) {
  const [updatedTask, setUpdatedTask] = useState(task);

  const submitHandler = (e) => {
    e.preventDefault();
    let data = editTask(updatedTask);
    Swal.fire({
      icon: "success",
      title: "Good job!",
      text: data.msg,
    });
    setEditing(false);
    setTasks(getTasks);
  };

  return (
    <form onSubmit={submitHandler}>
      <div style={{ display: "flex" }}>
        <Input
          type="text"
          className="task-input"
          name="name"
          value={updatedTask.name}
          style={{ width: "100%", padding: "8px" }}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, name: e.target.value })
          }
        />

        <IconButton type="submit">
          <DoneIcon fontSize="small" />
        </IconButton>
      </div>
    </form>
  );
}
export default EditTask;
