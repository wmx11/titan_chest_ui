import React from 'react';
import { BlueButton } from '../../../components/Buttons';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import TableList from '../../../components/Table/TableList';
import { botsForm } from '../../../config/forms/bots';
import routes from '../../../config/routes';
import { getBotsList } from '../../../utils/getters';

function Bots({ bots }) {
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <Heading>Bots</Heading>
          </div>
          <div>
            <BlueButton href="/admin/bots/add">Add Bot</BlueButton>
          </div>
        </div>

        <TableList
          formData={botsForm}
          data={bots}
          actions={[
            { name: 'Edit', href: '/admin/bots' },
            { name: 'Delete', href: `${routes.titan_chest_axios}/bots/delete` },
          ]}
        />
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const bots = await getBotsList('', true);
  return {
    props: {
      bots,
    },
  };
};

export default Bots;
