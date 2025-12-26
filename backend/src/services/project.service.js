const {pool} = require("../config/postgres");
const { addMemberService } = require("./membership.service");

const createProjectService = async (userId, data) => {
   const client = await pool.connect();
   try {
      const projectResult = await client.query(

     "INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *",
    [data.name, data.description, userId]
  );

    const project = projectResult.rows[0];
 
    const res =  await addMemberService({userId, projectId: project.id, role : 'Owner'})
     if (res){
       await client.query('COMMIT');
     return project;
     }
   
     return false;
      
   } catch (err) {
     await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

const getProjectService = async (projectId) => {
  const result = await pool.query("SELECT * FROM projects WHERE id=$1", [projectId]);
  return result.rows[0];
};

const updateProjectService = async (projectId, data) => {
  const result = await pool.query(
    "UPDATE projects SET name=$1, description=$2 WHERE id=$3 RETURNING *",
    [data.name, data.description, projectId]
  );
  return result.rows[0];
};

const deleteProjectService = async (projectId) => {
  await pool.query("DELETE FROM projects WHERE id=$1", [projectId]);
  return true;
};

module.exports = { createProjectService, getProjectService, updateProjectService, deleteProjectService };
