import React from 'react';
import { BlueButton } from '../../../components/Buttons';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import TableList from '../../../components/Table/TableList';
import { tokenForm } from '../../../config/forms/token';
import routes from '../../../config/routes';
import { getTokensList } from '../../../utils/getters';

function Tokens({ tokens }) {
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <Heading>Tokens</Heading>
          </div>
          <div>
            <BlueButton href="/admin/tokens/add">Add Tokens</BlueButton>
          </div>
        </div>

        <TableList
          formData={tokenForm}
          data={tokens}
          actions={[
            { name: 'Edit', href: `${routes.titan_chest_ui}/admin/tokens` },
            { name: 'Delete', href: `${routes.titan_chest_axios}/token/delete` },
          ]}
        />
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const tokens = await getTokensList('', true);

  return {
    props: {
      tokens,
    },
  };
};

export default Tokens;
