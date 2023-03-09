import { Route, Routes } from "react-router-dom"
import { AllProjects } from "../dashboard/allProjects";

export const AppViews = () => {
  
	return (
    <Routes>
      <Route path="/home" element={<AllProjects />} />
    </Routes>
  );
}
