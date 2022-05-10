import React from 'react';
import { BlueButton } from '../../../components/Buttons';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import TableList from '../../../components/Table/TableList';
import { networkForm } from '../../../config/forms/network';
import routes from '../../../config/routes';
import { getNetworksList } from '../../../utils/getters';

function Networks({ networks }) {
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <Heading>Networks</Heading>
          </div>
          <div>
            <BlueButton href="/admin/networks/add">Add Network</BlueButton>
          </div>
        </div>

        <TableList
          formData={networkForm}
          data={networks}
          actions={[
            { name: 'Edit', href: `${routes.titan_chest_ui}/admin/networks` },
            { name: 'Delete', href: `${routes.titan_chest_axios}/network/delete` },
          ]}
        />
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const networks = await getNetworksList('', true);

  return {
    props: {
      networks,
    },
  };
};

export default Networks;
