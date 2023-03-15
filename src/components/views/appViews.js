import { Route, Routes } from "react-router-dom"
import { AllProjects } from "../dashboard/allProjects";
import { MyProjects } from "../dashboard/myProjects";
import { ProjPage } from "../projects/projectPage";

export const AppViews = () => {
  
	return (
    <Routes>
      <Route path="/home" element={<AllProjects />} />
      <Route path="/my-projects" element={<MyProjects />} />
      <Route path="projects/:project_id" element={<ProjPage />} />
    </Routes>
  );
}
