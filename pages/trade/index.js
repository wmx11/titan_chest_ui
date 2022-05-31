import Head from 'next/head';
import React from 'react';
import CmsBlock from '../../components/CmsBlock';
import Container from '../../components/Container';
import DarkBox from '../../components/DarkBox';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import { getCmsContent } from '../../utils/getters';

function Index({ cmsContent }) {
  return (
    <div>
      <Head>
        <title>Buy & Sell Titano</title>
        <meta
          name="description"
          content="Buy and sell Titano on Titan Chest through Bogged Finance!"
        />

        <meta
          property="og:description"
          content="Buy and sell Titano on Titan Chest through Bogged Finance!"
        />
      </Head>
      <Layout>
        <Container>
          <Heading>
            <CmsBlock dataSet={cmsContent} block="trade_heading" />
          </Heading>
        </Container>

        <Container className="flex flex-col md:flex-row md:flex-wrap w-full">
          <div className="flex-1 md:mr-4 mb-4">
            <iframe
              src="https://app.bogged.finance/swap?tokenIn=BNB&tokenOut=0x4e3cABD3AD77420FF9031d19899594041C420aeE&embed=1"
              height="780px"
              width="100%"
              style={{ maxWidth: '570px', minWidth: '300px' }}
            ></iframe>
          </div>

          <div className="flex-1 min-w-[300px]">
            <DarkBox>
              <CmsBlock
                dataSet={cmsContent}
                block="trade_content"
                provideStyles={true}
              />
            </DarkBox>
          </div>
        </Container>
      </Layout>
    </div>
  );
}

export default Index;

export const getServerSideProps = async () => {
  const cmsContent = await getCmsContent(
    'content-blocks?filters[block_name][$eq]=trade_heading&filters[block_name][$eq]=trade_content&filters[enabled][$eq]=true',
    true
  );

  return {
    props: {
      cmsContent,
    },
  };
};
