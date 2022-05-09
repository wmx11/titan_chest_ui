const routes = {
  titan_chest_axios: 'http://localhost:2000/api/v1',
  titan_chest: 'http://titan-chest-api:2000/api/v1',
  titan_chest_ui: 'http://localhost:3000'
};

export const titanChest = {
  getProjects: `${routes.titan_chest}/project/get`,
  addProject: `${routes.titan_chest}/project/add`,
  updateProject: `${routes.titan_chest}/project/update`,
  deleteProject: `${routes.titan_chest}/project/delete`,
}

export default routes;
