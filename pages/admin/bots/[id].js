import { useRouter } from 'next/router';
import React from 'react';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { botsForm } from '../../../config/forms/bots';
import routes from '../../../config/routes';
import { getBotsList, getProjectsList } from '../../../utils/getters';

function Update({ formData, name }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AdminLayout>
      <Heading className="text-black">Editing Bot: {name}</Heading>
      <FormList
        method="PATCH"
        action={`${routes.titan_chest}/bots/update/${id}`}
        formData={formData}
      />
    </AdminLayout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const bots = await getBotsList(query.id);
  const projects = await getProjectsList();
  const name = bots.name;

  const formData = botsForm.map((form) => {
    if (bots[form.name]) {
      form.value = bots[form.name];
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
