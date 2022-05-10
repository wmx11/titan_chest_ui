import React from 'react';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { abiForm } from '../../../config/forms/abi';
import routes from '../../../config/routes';
import { getProjectsList, getTokensList } from '../../../utils/getters';

function add({ formData }) {
  return (
    <AdminLayout>
      <Heading className="text-black">Add ABI</Heading>
      <FormList
        method="POST"
        action={`${routes.titan_chest}/abi/add`}
        formData={formData}
      />
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const tokens = await getTokensList('', true);
  const projects = await getProjectsList('', true);

  const formData = abiForm.map((form) => {
    if (form.name === 'token_id') {
      form.data = tokens;
      return form;
    }

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
