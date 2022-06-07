import { Divider } from '@mantine/core';
import Head from 'next/head';
import React from 'react';
import { ArrowBigDownLines } from 'tabler-icons-react';
import Container from '../../components/Container';
import DarkBox from '../../components/DarkBox';
import GoBack from '../../components/GoBack';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import NeonText from '../../components/NeonText';

function InflationTracker() {
  return (
    <div>
      <Head>
        <title>Titano inflation tracker dashboard</title>
      </Head>
      <Layout>
        <Container>
          <GoBack />
          <Heading className="text-white">Titano Use Case Stats</Heading>
          <DarkBox className="mb-4">
            <div className="mb-4">
              <p className="text-white text-2xl font-bold">This Week</p>
              <Divider className="my-4" />
              <div className="flex flex-col gap-4 text-center">
                <div className="flex gap-4">
                  <DarkBox className="w-[300px]">
                    <NeonText>10,000,000</NeonText>
                    <NeonText>Total Supply</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>10,000,000</NeonText>
                    <NeonText>Circulating Supply</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>10,000,000</NeonText>
                    <NeonText>Burned Tokens</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>$1</NeonText>
                    <NeonText>Token Price</NeonText>
                  </DarkBox>
                </div>
                <div className="flex w-[1250px]">
                  <ArrowBigDownLines
                    size={50}
                    className="text-titano-pink flex-1 animate-bounce"
                  />
                  {/* <ArrowBigDownLines size={20} className="text-white flex-1" />
                  <ArrowBigDownLines size={20} className="text-white flex-1" />
                  <ArrowBigDownLines size={20} className="text-white flex-1" /> */}
                </div>
                <div className="flex gap-4">
                  <DarkBox className="w-[300px]">
                    <NeonText>25,000,000</NeonText>
                    <NeonText>Total Supply</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>20,000,000</NeonText>
                    <NeonText>Circulating Supply</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>30,000,000</NeonText>
                    <NeonText>Burned Tokens</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>$10</NeonText>
                    <NeonText>Token Price</NeonText>
                  </DarkBox>
                </div>
              </div>
            </div>
          </DarkBox>
          <DarkBox className="mb-4">
            <div className="mb-4">
              <p className="text-white text-2xl font-bold">This Month</p>
              <Divider className="my-4" />
              <div className="flex flex-col gap-4 text-center">
                <div className="flex gap-4">
                  <DarkBox className="w-[300px]">
                    <NeonText>10,000,000</NeonText>
                    <NeonText>Total Supply</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>10,000,000</NeonText>
                    <NeonText>Circulating Supply</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>10,000,000</NeonText>
                    <NeonText>Burned Tokens</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>$1</NeonText>
                    <NeonText>Token Price</NeonText>
                  </DarkBox>
                </div>
                <div className="flex w-[1250px]">
                  <ArrowBigDownLines
                    size={50}
                    className="text-titano-pink flex-1"
                  />
                  {/* <ArrowBigDownLines size={20} className="text-white flex-1" />
                  <ArrowBigDownLines size={20} className="text-white flex-1" />
                  <ArrowBigDownLines size={20} className="text-white flex-1" /> */}
                </div>
                <div className="flex gap-4">
                  <DarkBox className="w-[300px]">
                    <NeonText>25,000,000</NeonText>
                    <NeonText>Total Supply</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>20,000,000</NeonText>
                    <NeonText>Circulating Supply</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>30,000,000</NeonText>
                    <NeonText>Burned Tokens</NeonText>
                  </DarkBox>
                  <DarkBox className="w-[300px]">
                    <NeonText>$10</NeonText>
                    <NeonText>Token Price</NeonText>
                  </DarkBox>
                </div>
              </div>
            </div>
          </DarkBox>
        </Container>
      </Layout>
    </div>
  );
}

export default InflationTracker;
