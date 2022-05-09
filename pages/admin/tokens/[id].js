import { useRouter } from 'next/router';
import React from 'react';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { tokenForm } from '../../../config/forms/token';
import routes from '../../../config/routes';
import {
  getAbiList,
  getNetworksList,
  getTokensList,
} from '../../../utils/getters';

function Token({ formData, name }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AdminLayout>
      <Heading>Editing Token: {name}</Heading>
      <FormList
        method="PATCH"
        action={`${routes.titan_chest}/token/update/${id}`}
        formData={formData}
      />
    </AdminLayout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const token = await getTokensList(query.id);
  const abi = await getAbiList();
  const network = await getNetworksList();
  const name = token.name;
  const formData = tokenForm.map((form) => {
    form.value = token[form.name];

    if (form.name === 'abi_id') {
      form.data = abi;
      return form;
    }
    if (form.name === 'network_id') {
      form.data = network;
      return form;
    }

    return form;
  });

  return {
    props: {
      formData,
      name,
    },
  };
};

export default Token;
