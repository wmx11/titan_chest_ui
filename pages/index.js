import axios from 'axios';
import Head from 'next/head';
import Container from '../components/Container';
import Heading from '../components/Heading';
import StatsTab from '../components/StatsTab';
import routes from '../config/routes';

const test = async () => {
    const req = await axios({
    method: 'get',
    url: `${routes.titan_chest}/project/get`
  });

  console.log(req);
}

export default function Home() {
  test()
  
  return (
    <div>
      <Head>
        <title>Titan Chest</title>
      </Head>

      <main className="bg-slate-900">
        <Container>
          <Heading>Titano Stats</Heading>
          <div className="flex flex-grow flex-wrap">
            <StatsTab value="$0,02558" name="price" />
            <StatsTab value="$85,450,211" name="market cap" />
            <StatsTab value="$8,524,555" name="treasury" />
            <StatsTab value="$3,754,554" name="rfv" />
            <StatsTab value="$6,754,554" name="liquidity" />
            <StatsTab value="150%" name="backed liquidity" />
            <StatsTab value="80,525" name="holders" />
            <StatsTab value="15,587" name="average holdings" />
            <StatsTab value="$395" name="BNB Price" />
          </div>
        </Container>
      </main>
    </div>
  );
}
