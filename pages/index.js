import { format } from 'date-fns';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Container from '../components/Container';
import Heading from '../components/Heading';
import StatsTab from '../components/StatsTab';
import { getBackedLiquidity, getStatsList } from '../utils/getters';
import toCurrency from '../utils/toCurrency';

export default function Home({ titano }) {
  const [data, setData] = useState('');

  useEffect(() => {
    if (!titano.length) {
      return;
    }

    setData(titano[0]);
  }, [titano]);

  return (
    <div>
      <Head>
        <title>Titan Chest</title>
      </Head>

      <main className="bg-slate-900 min-h-screen">
        <Container>
          <div className="flex justify-center items-center flex-col">
            <Heading className="text-white">Titano Stats</Heading>
            {data && (
              <p className="mb-4 text-white text-sm">
                Last updated:{' '}
                <em>
                  {format(new Date(data.created_at), 'yyy-dd-MM H:mm')} UTC+0
                </em>
              </p>
            )}
          </div>
          {data && (
            <div className="flex flex-grow flex-wrap justify-center">
              {data.price && (
                <StatsTab value={toCurrency(data.price)} name="Price" />
              )}

              {data.marketcap && (
                <StatsTab
                  value={toCurrency(data.marketcap)}
                  name="Market Cap"
                />
              )}

              {data.treasury && (
                <StatsTab value={toCurrency(data.treasury)} name="Treasury" />
              )}

              {data.rfv && <StatsTab value={toCurrency(data.rfv)} name="RFV" />}

              {data.liquidity && (
                <StatsTab value={toCurrency(data.liquidity)} name="Liquidity" />
              )}

              {data.pair_price && (
                <StatsTab
                  value={toCurrency(data.pair_price)}
                  name="BNB Price"
                />
              )}

              <StatsTab
                value={getBackedLiquidity({
                  rfv: data.rfv,
                  treasury: data.treasury,
                  liquidity: data.liquidity,
                })}
                name="Backed Liquidity"
              />
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const titano = await getStatsList('Titano', true);
  return {
    props: {
      titano,
    },
  };
};
