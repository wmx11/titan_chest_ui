import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import Post from '../../components/Layouts/titanchest/Post';
import { getCmsContent } from '../../utils/getters';

function Index({ cmsContent }) {
  const [cmsData, setCmsData] = useState();

  useEffect(() => {
    if (cmsContent) {
      setCmsData(cmsContent);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>Titano Announcements and News</title>
      </Head>
      <Layout>
        <Container>
          <Heading className="text-white">Announcements</Heading>
          {cmsData &&
            cmsData.map(({ attributes }, index) => (
              <Link
                href={`/announcements/${attributes.slug}`}
                key={`post_${index}`}
              >
                <a>
                  <Post data={attributes} isSummary />
                </a>
              </Link>
            ))}
        </Container>
      </Layout>
    </div>
  );
}

export default Index;

export const getServerSideProps = async () => {
  const cmsContent = await getCmsContent(
    'announcements?filters[enabled][$eq]=true',
    true
  );

  return {
    props: {
      cmsContent,
    },
  };
};
