import React from 'react';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { botsForm } from '../../../config/forms/bots';
import routes from '../../../config/routes';
import { getProjectsList } from '../../../utils/getters';

function add({ formData }) {
  return (
    <AdminLayout>
      <Heading className="text-black">Add Bot</Heading>
      <div className="flex space-x-5">
        <FormList
          method="POST"
          action={`${routes.titan_chest}/bots/add`}
          formData={formData}
        />
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const projects = await getProjectsList();

  const formData = botsForm.map((form) => {
    if (form.name === 'project_id') {
      form.data = projects;
      return form;
    }

    return form;
  });

  return {
    props: {
      formData,
    },
  };
};

export default add;
