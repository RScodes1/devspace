import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { ProjectProvider } from "./context/ProjectContext";
import { SocketProvider } from "./context/SocketContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
       <ProjectProvider>
          <SocketProvider>
            <AppRoutes />
          </SocketProvider>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
