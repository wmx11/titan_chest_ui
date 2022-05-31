import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';

import * as gtag from '../utils/gtags';

import '../styles/globals.css';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';

const isProduction = process.env.NODE_ENV === 'production';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (isProduction) {
        gtag.pageview(url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SWRConfig value={{ refreshInterval: 1000 * 60 }}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </SWRConfig>
  );
}

export default MyApp;
