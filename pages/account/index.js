import Head from 'next/head';
import React from 'react';
import Container from '../../components/Container';

import Layout from '../../components/Layouts/titanchest/Layout';

import AccountData from '../../components/Layouts/titanchest/account/AccountData';
import DarkBox from '../../components/DarkBox';
import useConnectWallet from '../../hooks/useConnectWallet';
import { TitanoPinkButton } from '../../components/Buttons';
import { getStatsList } from '../../utils/getters';

function Index({ titano }) {
  const { address, connect } = useConnectWallet();
  return (
    <div>
      <Head>
        <title>Titano Account Page</title>
      </Head>
      <Layout>
        <Container>
          {address ? (
            <AccountData titano={titano[0]} address={address} />
          ) : (
            <DarkBox className="text-white text-center">
              <p className="mb-4">
                Please connect your wallet to access the Account Dashboard
              </p>
              <TitanoPinkButton onClick={connect}>
                Connect wallet
              </TitanoPinkButton>
              <p className="mt-4 text-xs italic">
                If you are having issues connecting, try refreshing the page or
                manually connecting to your metamask wallet (after which you
                should refresh the page)
              </p>
              <p className="mt-4 text-xs italic">
                V1 Account Dashboard currently does not have rebase and
                transactions history.
              </p>
            </DarkBox>
          )}
        </Container>
      </Layout>
    </div>
  );
}

export default Index;

export const getServerSideProps = async () => {
  const titano = await getStatsList('Titano', true);

  return {
    props: {
      titano,
    },
  };
};
