const { pool } = require("../config/postgres");

/**
 * Resolves projectId from the request and loads user's project membership.
 * Supports:
 *  - /projects/:id
 *  - /projects/:projectId/*
 *  - /workspaces/:id
 */
const projectContext = async (req, res, next) => {
  try {
    let projectId = null;
    // 1️⃣ Nested project routes: /projects/:projectId/*
 
    if (req.params.projectId) {
      projectId = req.params.projectId;
    }

    // 2️⃣ Direct project routes: /projects/:id
    else if (req.baseUrl.includes("/projects") && req.params.id) {
      projectId = req.params.id;
    }

    // 3️⃣ Workspace routes: /workspaces/:id
    else if (req.baseUrl.includes("/workspaces") && req.params.id) {
      const result = await pool.query(
        "SELECT project_id FROM workspaces WHERE id = $1",
        [req.params.id]
      );
      
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Workspace not found"
        });
      }

      projectId = result.rows[0].project_id;
    }

    // ❌ Could not resolve projectId
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Unable to resolve project context"
      });
    }

    // 4️⃣ Load membership
    const membershipResult = await pool.query(
      `
      SELECT role
      FROM memberships
      WHERE user_id = $1 AND project_id = $2
      `,
      [req.user.id, projectId]
    );

    if (membershipResult.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: "No access to this project"
      });
    }

    // 5️⃣ Attach context
    req.projectId = projectId;
    req.membership = membershipResult.rows[0]; // { role }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { projectContext };
