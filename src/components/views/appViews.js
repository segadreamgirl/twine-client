import { Route, Routes } from "react-router-dom"
import { AllProjects } from "../dashboard/allProjects";
import { ProjPage } from "../projects/projectPage";

export const AppViews = () => {
  
	return (
    <Routes>
      <Route path="/home" element={<AllProjects />} />
      <Route path="projects/:project_id" element={<ProjPage />} />
    </Routes>
  );
}
