const isDev = process.env.NODE_ENV === 'development';

/**
 * @desc - 'titan-chest-api' in routes.titan_chest referst to the docker image
 * titan-chest-ui docker container is on the same network as the titan-chest-api
 * so they could communicate
 *
 * If you are using a non-docker version of this UI,
 * please change 'titan-chest-api' to localhost
 *
 * @field titan_chest_axios - Used in axios() calls
 * @field titan_chest - Used in general calls by fetch() and getServerSideProps()
 * @field titan_chest_ui - Used as the UI endpoint
 */
const routes = {
  titan_chest_axios: isDev
    ? 'http://localhost:2000/api/v1'
    : process.env.NEXT_PUBLIC_HOST_API,
  titan_chest: isDev
    ? 'http://titan-chest-api:2000/api/v1'
    : process.env.NEXT_PUBLIC_HOST_API,
  titan_chest_ui: isDev
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_HOST,
  titan_chest_cms: isDev
    ? 'http://localhost:1337/api'
    : process.env.NEXT_PUBLIC_TITAN_CHEST_CMS_URL,
};

export const titanChest = {
  getProjects: `${routes.titan_chest}/project/get`,
  addProject: `${routes.titan_chest}/project/add`,
  updateProject: `${routes.titan_chest}/project/update`,
  deleteProject: `${routes.titan_chest}/project/delete`,
};

export default routes;
