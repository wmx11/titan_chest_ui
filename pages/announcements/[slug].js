import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Container from '../../components/Container';
import GoBack from '../../components/GoBack';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import Post from '../../components/Layouts/titanchest/Post';
import useCmsPost from '../../hooks/cms/useCmsPost';

function Announcement() {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useCmsPost('announcements', slug);

  return (
    <div>
      <Head>
        <title>{data && data.title}</title>

        <meta
          name="description"
          content={data && data.summary}
        />

        <meta
          property="og:description"
          content={data && data.summary}
        />
      </Head>
      <Layout>
        <Container>
          <GoBack />
          {data && (
            <>
              <Heading className="text-white">{data.title}</Heading>
              <Post data={data} isSummary={false} />
            </>
          )}
        </Container>
      </Layout>
    </div>
  );
}

export default Announcement;
