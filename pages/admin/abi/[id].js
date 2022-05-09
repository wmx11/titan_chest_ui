import { useRouter } from 'next/router';
import React from 'react';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { abiForm } from '../../../config/forms/abi';
import routes from '../../../config/routes';
import {
  getAbiList,
  getProjectsList,
  getTokensList,
} from '../../../utils/getters';

function Update({ formData, name }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AdminLayout>
      <Heading className="text-black">Editing Abi: {name}</Heading>
      <FormList
        method="PATCH"
        action={`${routes.titan_chest}/abi/update/${id}`}
        formData={formData}
      />
    </AdminLayout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const abi = await getAbiList(query.id);
  const tokens = await getTokensList();
  const projects = await getProjectsList();
  const name = abi.name;

  const formData = abiForm.map((form) => {
    if (abi[form.name]) {
      form.value = abi[form.name];
    }

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
      name,
    },
  };
};

export default Update;
