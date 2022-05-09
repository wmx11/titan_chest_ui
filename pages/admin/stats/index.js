import React from 'react';
import { BlueButton } from '../../../components/Buttons';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';

function Stats() {
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <Heading>Stats List</Heading>
          </div>
          <div>
            <BlueButton href="/admin/stats/add">Add Stats</BlueButton>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Stats;
