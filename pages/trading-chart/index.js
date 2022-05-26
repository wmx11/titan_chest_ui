import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';

function Index() {
  const isSmallScreen = useMediaQuery('(max-width: 767px)');
  return (
    <Layout>
      <Container>
        <Heading className="text-white">Titano Trading Chart</Heading>
        <div
          id="dexscreener-embed"
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: isSmallScreen ? '125%' : '100vh',
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
              border: '0',
            }}
            src="https://dexscreener.com/bsc/0x072856bC98e65ECaf8cA6412567e894617cC62c2?embed=1&theme=dark&info=0"
          ></iframe>
        </div>
      </Container>
    </Layout>
  );
}

export default Index;
