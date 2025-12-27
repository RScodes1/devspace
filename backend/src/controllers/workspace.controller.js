const { createWorkspaceService, getWorkspacesService,  getWorkspaceService, updateWorkspaceService, deleteWorkspaceService } = require("../services/workspace.service");

const createWorkspace = async (req, res, next) => {
  try {
    const workspace = await createWorkspaceService(req.body.name, req.params.projectId);
    res.status(201).json({ success: true, workspace });
  } catch (err) {
    next(err);
  }
};

const getWorkspace = async (req, res, next) => {
  try {
    const workspace = await getWorkspaceService(req.params.id);
    if (!workspace) return res.status(404).json({ success: false, message: "Workspace not found" });
    res.status(200).json({ success: true, workspace });
  } catch (err) {
    next(err);
  }
};

const getWorkspaces = async (req, res, next) => {
  try {
    const workspaces = await getWorkspacesService(req.params.projectId);
    if (!workspaces) return res.status(404).json({ success: false, message: "Workspaces not found" });
    res.status(200).json({ success: true, workspaces });
  } catch (err) {
    next(err);
  }
};


const updateWorkspace = async (req, res, next) => {
  try {
    const workspace = await updateWorkspaceService(req.params.id, req.body);
    res.status(200).json({ success: true, workspace });
  } catch (err) {
    next(err);
  }
};

const deleteWorkspace = async (req, res, next) => {
  try {
    await deleteWorkspaceService(req.params.id);
    res.status(200).json({ success: true, message: "Workspace deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createWorkspace, getWorkspace, getWorkspaces,  updateWorkspace, deleteWorkspace };
