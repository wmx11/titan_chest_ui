import React from 'react';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import FormList from '../../../components/Form/FormList';
import { projectForm } from '../../../config/forms/project';
import {
  getAbiList,
  getNetworksList,
  getTokensList,
} from '../../../utils/getters';
import routes from '../../../config/routes';

function Add({ formData }) {
  return (
    <AdminLayout>
      <Heading className="text-black">Add Project</Heading>
      <FormList
        method="POST"
        action={`${routes.titan_chest_axios}/project/add`}
        formData={formData}
      />
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const abi = await getAbiList();
  const networks = await getNetworksList();
  const tokens = await getTokensList();

  const formData = projectForm.map((form) => {
    if (form.name === 'abi_id') {
      form.data = abi;
      return form;
    }

    if (form.name === 'network_id') {
      form.data = networks;
      return form;
    }

    if (form.name === 'token_id') {
      form.data = tokens;
      return form;
    }

    if (form.name === 'token_pair_id') {
      form.data = tokens;
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
