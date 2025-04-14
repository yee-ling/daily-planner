import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/forms/AddTask";
import LightDarkMode from "./components/LightDarkMode";
import { getTasks } from "./api/tasks";
import DailyTimeline from "./components/DailyTimeline";
import { Box, CssBaseline, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const savedTheme = localStorage.getItem("darkMode") === "true";
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(savedTheme);

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    setTasks(getTasks());
  }, [darkMode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LightDarkMode toggleTheme={handleThemeToggle} darkMode={darkMode} />

        <Box sx={{ p: 4 }}>
          <h2>My Daily Planner</h2>
          <Grid container spacing={8}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AddTask setTasks={setTasks} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <DailyTimeline tasks={tasks} setTasks={setTasks} />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
