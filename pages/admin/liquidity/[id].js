import { useRouter } from 'next/router';
import React from 'react';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { liquidityForm } from '../../../config/forms/liquidity';
import routes from '../../../config/routes';
import {
  getAbiList,
  getLiquidityList,
  getNetworksList,
  getProjectsList,
  getTokensList,
} from '../../../utils/getters';

function Liquidity({ formData, name }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AdminLayout>
      <Heading>Editing LP: {name}</Heading>
      <FormList
        method="PATCH"
        action={`${routes.titan_chest}/liquidity/update/${id}`}
        formData={formData}
      />
    </AdminLayout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const liquidity = await getLiquidityList(query.id, true);
  const tokens = await getTokensList('', true);
  const projects = await getProjectsList('', true);
  const name = liquidity.name;

  const formData = liquidityForm.map((form) => {
    form.value = liquidity[form.name];

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

export default Liquidity;
