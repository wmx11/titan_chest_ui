import React from 'react';
import { BlueButton } from '../../../components/Buttons';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import TableList from '../../../components/Table/TableList';
import { liquidityForm } from '../../../config/forms/liquidity';
import routes from '../../../config/routes';
import { getLiquidityList, getNetworksList } from '../../../utils/getters';

function Networks({ liquidity }) {
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <Heading>Liquidity Pairs</Heading>
          </div>
          <div>
            <BlueButton href="/admin/liquidity/add">Add LP</BlueButton>
          </div>
        </div>

        <TableList
          formData={liquidityForm}
          data={liquidity}
          actions={[
            { name: 'Edit', href: `${routes.titan_chest_ui}/admin/liquidity` },
            { name: 'Delete', href: `${routes.titan_chest_axios}/liquidity/delete` },
          ]}
        />
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps = async () => {
  const liquidity = await getLiquidityList();

  return {
    props: {
      liquidity,
    },
  };
};

export default Networks;
