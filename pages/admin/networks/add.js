import React from 'react';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { networkForm } from '../../../config/forms/network';
import routes from '../../../config/routes';

function Add() {
  return (
    <AdminLayout>
      <Heading className="text-black">Add Network</Heading>
      <FormList
        method="POST"
        action={`${routes.titan_chest}/network/add`}
        formData={networkForm}
      />
    </AdminLayout>
  );
}

export default Add;
