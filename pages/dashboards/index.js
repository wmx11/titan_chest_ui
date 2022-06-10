import { UserGroupIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { ChartInfographic, Flame } from 'tabler-icons-react';
import Container from '../../components/Container';
import DarkCard from '../../components/DarkCard';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import NeonCardWrapper from '../../components/NeonCardWrapper';
import NeonText from '../../components/NeonText';
import SmallText from '../../components/SmallText';

function Index() {
  return (
    <div>
      <Head>
        <title>Titan Chest Dashboards</title>
        <meta
          name="description"
          content="Titano dashboards for in-depth data and analysis."
        />

        <meta
          property="og:description"
          content="Titano dashboards for in-depth data and analysis."
        />
      </Head>
      <Layout>
        <Container>
          <Heading className="text-white">Dashboards</Heading>
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/dashboards/burn-tracker">
              <a className="md:w-[49%]">
                <DarkCard
                  Head={
                    <NeonCardWrapper className="bg-titano-pink/5 flex-grow">
                      <NeonText>
                        <Flame className="animate-pulse" />
                      </NeonText>
                      <NeonText>Burn Tracker</NeonText>
                      <SmallText>Track the progress of token burns</SmallText>
                    </NeonCardWrapper>
                  }
                  Body={
                    <>
                      <p>Track latest Titano token burns.</p>
                      <strong>
                        Please, keep in mind that the burn wallet is also
                        receiving rebases and it grows by 1.92% every 24 hours.
                      </strong>
                      <p>Data is updated every minute.</p>
                    </>
                  }
                />
              </a>
            </Link>
            <Link href="/dashboards/kpi-tracker">
              <a className="md:w-[49%]">
                <DarkCard
                  Head={
                    <NeonCardWrapper className="bg-titano-pink/5 flex-grow">
                      <NeonText>
                        <ChartInfographic className="animate-pulse" />
                      </NeonText>
                      <NeonText>KPI Tracker</NeonText>
                      <SmallText>Titano key performance indicators</SmallText>
                    </NeonCardWrapper>
                  }
                  Body={
                    <>
                      <p>Track Titano Key Performance Indicators.</p>
                      <strong>
                        You can see the changes in Titano performance based on
                        This, last week, and this month.
                      </strong>
                      <p>
                        Compare data and the impact of major
                        announcements/releases.
                      </p>
                    </>
                  }
                />
              </a>
            </Link>
            <Link href="/dashboards/holders">
              <a className="md:w-[49%]">
                <DarkCard
                  Head={
                    <NeonCardWrapper className="bg-titano-pink/5 flex-grow">
                      <NeonText>
                        <UserGroupIcon className="w-5 h-5 animate-pulse" />
                      </NeonText>
                      <NeonText>Holders</NeonText>
                      <SmallText>Titano holders dashboard</SmallText>
                    </NeonCardWrapper>
                  }
                  Body={
                    <>
                      <p>View all wallets holding Titano.</p>
                      <strong>
                        You can see all wallets distribution by token amount.
                        There is also a wallet tier list that corresponds to the
                        given token amount in the wallet. The tier list is not
                        official but a community made listing.
                      </strong>
                      <p>
                        Filter wallets by size, order. Find wallets by address.
                      </p>
                    </>
                  }
                />
              </a>
            </Link>
          </div>
        </Container>
      </Layout>
    </div>
  );
}

export default Index;
