import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { ReportMoney, AlertTriangle } from 'tabler-icons-react';
import Container from '../../components/Container';
import DarkBox from '../../components/DarkBox';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import NeonCardWrapper from '../../components/NeonCardWrapper';
import NeonText from '../../components/NeonText';
import SmallText from '../../components/SmallText';
import styles from '../../config/styles';

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
          <Heading className="text-white">Calculators</Heading>
          <DarkBox>
            <div className="flex flex-col md:flex-row flex-wrap">
              <Link href="/calculators/impact">
                <a>
                  <NeonCardWrapper className="text-center">
                    <AlertTriangle size={25} color={styles.titanoGreen} />
                    <NeonText>Impact Calculator</NeonText>
                    <SmallText>
                      Potential price impact of a transaction
                    </SmallText>
                  </NeonCardWrapper>
                </a>
              </Link>
              <Link href="/calculators/earnings">
                <a>
                  <NeonCardWrapper className="text-center">
                    <ReportMoney size={25} color={styles.titanoGreen} />
                    <NeonText>Earnings Calculator</NeonText>
                    <SmallText>Earnings over time</SmallText>
                  </NeonCardWrapper>
                </a>
              </Link>
            </div>
          </DarkBox>
        </Container>
      </Layout>
    </div>
  );
}

export default Index;
