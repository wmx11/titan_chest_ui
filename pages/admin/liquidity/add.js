import React from 'react';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { liquidityForm } from '../../../config/forms/liquidity';
import routes from '../../../config/routes';
import { getProjectsList, getTokensList } from '../../../utils/getters';

function Add({ formData }) {
  return (
    <AdminLayout>
      <Heading className="text-black">Add LP</Heading>
      <FormList
        method="POST"
        action={`${routes.titan_chest}/liquidity/add`}
        formData={formData}
      />
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const tokens = await getTokensList('', true);
  const projects = await getProjectsList('', true);
  const formData = liquidityForm.map((form) => {

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

export default Add;
