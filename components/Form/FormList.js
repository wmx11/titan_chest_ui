import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BlueButton } from '../Buttons';
import Dropdown from './Dropdown';
import Form from './Form';
import Input from './Input';

const FormList = ({ method, action, formData }) => {
  const { data: session, status } = useSession();

  const [dataset, setDataset] = useState([]);
  const [statusMessage, setStatusMessage] = useState();
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setDataset(formData);
  }, [formData]);

  const handleChange = (index, value) => {
    const datasetCopy = [...dataset];
    const formItem = datasetCopy[index];

    if (formItem.parse === false) {
      formItem.value = value;
    } else if (
      parseInt(value, 10) ||
      value === 'false' ||
      value === 'true' ||
      value === 'null'
    ) {
      formItem.value = JSON.parse(value);
    } else {
      formItem.value = value;
    }

    setDataset(datasetCopy);
  };

  const handleSubmit = async (event) => {
    const button = event.target;
    const { id } = router.query;

    button.disabled = true;

    const data = dataset.reduce((object, { name, value }) => {
      return Object.assign(object, {
        [name]: value,
      });
    }, {});

    const req = await axios({
      url: action,
      method,
      data,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    setStatusMessage(req.data.message);

    if (!id && req.data.message !== 'success') {
      dataset.forEach((item, index) => handleChange(index, ''));
    }

    button.disabled = false;
  };

  return (
    <>
      {statusMessage && (
        <div
          className={`${
            statusMessage.type === 'success' ? 'bg-green-300' : 'bg-red-300'
          } p-2 rounded-md`}
        >
          {statusMessage.value}
        </div>
      )}
      <div className="mt-10 w-2/5">
        <Form method={method} action={action}>
          {dataset &&
            dataset.map(({ name, label, type, value, data }, index) => {
              if (!data) {
                return (
                  <Input
                    key={`${name}-${index}`}
                    name={name}
                    label={label}
                    value={value}
                    type={type}
                    onChange={(e) =>
                      handleChange(
                        index,
                        type === 'checkbox' ? e.target.checked : e.target.value
                      )
                    }
                    checked={!!value}
                  />
                );
              }

              if (data.length) {
                return (
                  <Dropdown
                    key={`${name}-${index}`}
                    name={name}
                    id={name}
                    label={label}
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                  >
                    <option value="null">Select {label}</option>
                    {data &&
                      data.map(({ id: selectId, name: selectValue }) => {
                        return (
                          <option
                            value={selectId}
                            key={`${selectId}-${selectValue}`}
                          >
                            {selectValue}
                          </option>
                        );
                      })}
                  </Dropdown>
                );
              }
            })}
        </Form>
        <div className="flex justify-end items-center">
          <BlueButton type="submit" onClick={handleSubmit}>
            Submit
          </BlueButton>
        </div>
      </div>
    </>
  );
};

export default FormList;
