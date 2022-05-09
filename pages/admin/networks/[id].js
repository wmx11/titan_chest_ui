import { useRouter } from 'next/router';
import React from 'react';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { networkForm } from '../../../config/forms/network';
import routes from '../../../config/routes';
import { getNetworksList } from '../../../utils/getters';

function Network({ formData, name }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AdminLayout>
      <Heading>Editing network: {name}</Heading>
      <FormList
        method="PATCH"
        action={`${routes.titan_chest}/network/update/${id}`}
        formData={formData}
      />
    </AdminLayout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const network = await getNetworksList(query.id);
  const name = network.name;
  const formData = networkForm.map((form) => {
    form.value = network[form.name];
    return form;
  });

  return {
    props: {
      formData,
      name,
    },
  };
};

export default Network;
