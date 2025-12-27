import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ProtectedLayout from "../components/layout/ProtectedLayout";
import ProjectsList from "../pages/projects/ProjectsList";
import RootRedirect from "./RootRedirect";
import ProjectDetails from "../pages/projects/ProjectDetails";
import WorkspaceDetails from "../pages/workspaces/WorkspaceDetails";
import AppLayout from "../layouts/AppLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
      <Route path="/" element={<RootRedirect />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/projects/:projectId/workspaces/:workspaceId" element={<WorkspaceDetails />} />
        </Route>
      </Route>
     
    </Routes>
  );
}
