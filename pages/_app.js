import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp;
