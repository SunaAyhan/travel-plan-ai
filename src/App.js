
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import Home from './pages/Home';
import Question from "./pages/Questions";
import Result from "./pages/Result";
import FixedBottomNavigation from "./components/BottomNavBar";
import SwipeableTextMobileStepper from "./components/StepperAutoPlay";

const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme} > <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>   </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/questions" element={<SwipeableTextMobileStepper />} />
        <Route path="/result" element={<FixedBottomNavigation />} />



      </Routes>
    </BrowserRouter></ThemeProvider>


  );
}

export default App;
