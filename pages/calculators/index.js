import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import NeonCardWrapper from '../../components/NeonCardWrapper';
import NeonText from '../../components/NeonText';
import SmallText from '../../components/SmallText';

function Index() {
  return (
    <div>
      <Head>
        <title>Titan Chest Calculators</title>
        <meta
          name="description"
          content="Titano calculators for better planning."
        />

        <meta
          property="og:description"
          content="Titano calculators for better planning."
        />
      </Head>
      <Layout>
        <Container>
          <Heading className="text-white">Titan Chest Calculators</Heading>
          <div className="flex">
            <Link href="/calculators/impact">
              <a>
                <NeonCardWrapper className="text-center">
                  <NeonText>Price Impact</NeonText>
                  <SmallText>
                    Calculate the price impact of a transaction.
                  </SmallText>
                </NeonCardWrapper>
              </a>
            </Link>
          </div>
        </Container>
      </Layout>
    </div>
  );
}

export default Index;
