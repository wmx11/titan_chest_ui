import { getCsrfToken } from 'next-auth/react';
import React from 'react';
import { BlueButton } from '../../components/Buttons';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';

function Login({ csrfToken }) {
  return (
    <div className="flex items-center justify-center bg-zinc-900 min-h-screen">
      <div className="bg-white p-10 w-1/4 rounded-md">
        <Form method="POST" action="/api/auth/callback/credentials">
          <Input name="csrfToken" type="hidden" value={csrfToken} />
          <Input label="Username" name="name" />
          <Input label="Password" name="password" type="password" />
          <div className="flex justify-between items-center">
            <div>
              <div>Register</div>
            </div>
            <BlueButton type="submit">Log in</BlueButton>
          </div>
        </Form>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default Login;
