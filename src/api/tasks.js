// GET ALL TASKS
export const getTasks = () => {
  const tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return tasks;
};

// ADD TASK
export const addTask = (newTask) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  newTask.name = newTask.name.trim();
  if (newTask.name === "") {
    return { msg: "Please add a task", task: null };
  }

  tasks.unshift(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return { msg: "Task Successfully Added", task: newTask };
};

// EDIT TASK
export const editTask = (updatedTask) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.map((task) =>
    updatedTask.id == task.id ? { ...task, name: updatedTask.name } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return { msg: "Task updated successfully" };
};

// DELETE TASK
export const deleteTask = (id) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return { msg: "Task deleted successfully" };
};

// CLEAR ALL TASKS
export const clearAllTasks = () => {
  localStorage.removeItem("tasks");
  return { msg: "All tasks cleared successfully" };
};
