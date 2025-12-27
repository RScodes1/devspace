import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState(null);

  const setCurrentProject = (data) => {
    setProject(data);
  };

  const clearProject = () => {
    setProject(null);
  };

  return (
    <ProjectContext.Provider
      value={{ project, setCurrentProject, clearProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
