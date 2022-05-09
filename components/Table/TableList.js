import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { BlueButton, RedButton } from '../Buttons';
import Column from './Column';
import Row from './Row';
import Table from './Table';

function TableList({ formData, actions, data }) {
  const { data: session, status } = useSession();
  const [dataset, setDataset] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setDataset(data);
  });

  const handleDelete = async (url, index) => {
    const req = await axios({
      url,
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const newData = data.splice(index, 1);
    setDataset(newData);
  };

  const headings =
    (formData &&
      formData.map(({ label, display }) => {
        if (display === false) {
          return;
        }

        return label;
      })) ||
    [];

  if (actions && actions.length) {
    headings.push('Actions');
  }

  return (
    <div className="mt-10">
      <Table headings={headings}>
        {dataset &&
          dataset.map((table, index) => (
            <Row key={`${table.name}-${index}`}>
              {formData &&
                formData.map(({ name, display }) => {
                  if (display === false) {
                    return;
                  }
                  const value = table[name];
                  return (
                    <Column key={`col-${name}-${index}`}>
                      <p className="break-words">{value && value.toString()}</p>
                    </Column>
                  );
                })}
              {actions &&
                actions.map(({ name, href }, actionIndex) => {
                  const link = `${href}/${table.id}`;
                  let button = <BlueButton href={link}>{name}</BlueButton>;

                  if (name.toLowerCase() === 'delete') {
                    button = (
                      <RedButton onClick={() => handleDelete(link, index)}>
                        {name}
                      </RedButton>
                    );
                  }

                  return (
                    <Column key={`action-${name}-${actionIndex}`}>
                      {button}
                    </Column>
                  );
                })}
            </Row>
          ))}
      </Table>
    </div>
  );
}

export default TableList;
