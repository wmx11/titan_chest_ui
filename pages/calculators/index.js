import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Fade } from 'react-reveal';
import { ReportMoney, AlertTriangle } from 'tabler-icons-react';
import Container from '../../components/Container';
import DarkCard from '../../components/DarkCard';
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
          <Fade>
            <div className="flex gap-3 flex-wrap w-full items-stretch">
              <Link href="/calculators/impact">
                <a className="lg:w-[49%] flex self-stretch">
                  <DarkCard
                    Head={
                      <NeonCardWrapper className="text-center">
                        <NeonText>
                          <AlertTriangle size={25} color={styles.titanoGreen} />
                        </NeonText>
                        <NeonText>Impact Calculator</NeonText>
                        <SmallText>
                          Potential price impact of a transaction
                        </SmallText>
                      </NeonCardWrapper>
                    }
                    Body={
                      <>
                        <p>Calculate the potential price impact.</p>
                        <strong>
                          The accuracy of this calculator is around 80%. It does
                          not take into account all other market factors.
                        </strong>
                        <p></p>
                      </>
                    }
                  />
                </a>
              </Link>
              <Link href="/calculators/earnings">
                <a className="lg:w-[49%] flex self-stretch">
                  <DarkCard
                    Head={
                      <NeonCardWrapper className="text-center">
                        <NeonText>
                          <ReportMoney size={25} color={styles.titanoGreen} />
                        </NeonText>
                        <NeonText>Earnings Calculator</NeonText>
                        <SmallText>Earnings over time</SmallText>
                      </NeonCardWrapper>
                    }
                    Body={
                      <>
                        <p>
                          Calculate your earnings and rebases over a period of
                          time.
                        </p>
                        <strong>
                          You can select different time periods. You can also
                          choose the price of Titano at any given date. Make
                          sure that the date in the future is not higher or
                          equal to the last day.
                        </strong>
                      </>
                    }
                  />
                </a>
              </Link>
            </div>
          </Fade>
        </Container>
      </Layout>
    </div>
  );
}

export default Index;
