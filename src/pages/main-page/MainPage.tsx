import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import SystemPage from "../system-page/SystemPage";

const MainPage = () => {



  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/system" element={<SystemPage />} />
          <Route path="/users" element={<div>Users page...</div>} />
          <Route path="/surveys" element={<div>Surveys page...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MainPage