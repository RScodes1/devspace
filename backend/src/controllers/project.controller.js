const { createProjectService, getProjectService, updateProjectService, deleteProjectService } = require("../services/project.service");

const createProject = async (req, res, next) => {
  try {
    const project = await createProjectService(req.user.id, req.body);
    res.status(201).json({ success: true, project });
  } catch (err) {
    next(err);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await getProjectService(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, project });
  } catch (err) {
    next(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await updateProjectService(req.params.id, req.body);
    res.status(200).json({ success: true, project });
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await deleteProjectService(req.params.id);
    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createProject, getProject, updateProject, deleteProject };
