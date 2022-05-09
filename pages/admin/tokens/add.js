import React from 'react';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { tokenForm } from '../../../config/forms/token';
import routes from '../../../config/routes';
import { getAbiList, getNetworksList } from '../../../utils/getters';

function Add({ formData }) {
  return (
    <AdminLayout>
      <Heading>Add Token</Heading>

      <FormList
        method="POST"
        action={`${routes.titan_chest}/token/add`}
        formData={formData}
      />
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const abi = await getAbiList();
  const networks = await getNetworksList();
  const formData = tokenForm.map((form) => {
    if (form.name === 'abi_id') {
      form.data = abi;
      return form;
    }

    if (form.name === 'network_id') {
      form.data = networks;
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
