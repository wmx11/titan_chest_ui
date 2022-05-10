import React from 'react';
import { BlueButton } from '../../../components/Buttons';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import TableList from '../../../components/Table/TableList';
import { projectForm } from '../../../config/forms/project';
import routes from '../../../config/routes';
import { getProjectsList } from '../../../utils/getters';

function Home({ projects }) {
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <Heading>Projects</Heading>
          </div>
          <div>
            <BlueButton href="/admin/projects/add">Add Project</BlueButton>
          </div>
        </div>

        <TableList
          formData={projectForm}
          data={projects}
          actions={[
            { name: 'Edit', href: '/admin/projects' },
            { name: 'Delete', href: `${routes.titan_chest_axios}/project/delete` },
          ]}
        />
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const projects = await getProjectsList('', true);

  return {
    props: {
      projects,
    },
  };
};

export default Home;
