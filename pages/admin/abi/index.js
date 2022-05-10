import React from 'react';
import { BlueButton } from '../../../components/Buttons';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import TableList from '../../../components/Table/TableList';
import { abiForm } from '../../../config/forms/abi';
import routes from '../../../config/routes';
import { getAbiList } from '../../../utils/getters';

function Abi({ abi }) {
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <Heading>ABI</Heading>
          </div>
          <div>
            <BlueButton href="/admin/abi/add">Add ABI</BlueButton>
          </div>
        </div>

        <TableList
          formData={abiForm}
          data={abi}
          actions={[
            { name: 'Edit', href: '/admin/abi' },
            { name: 'Delete', href: `${routes.titan_chest_axios}/abi/delete` },
          ]}
        />
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const abi = await getAbiList('', true);
  return {
    props: {
      abi,
    },
  };
};

export default Abi;
