import Head from 'next/head';
import React from 'react';
import Container from '../../components/Container';
import GoBack from '../../components/GoBack';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import Post from '../../components/Layouts/titanchest/Post';
import useCmsPost from '../../hooks/cms/useCmsPost';
import { getCmsContent } from '../../utils/getters';

function Announcement({ content }) {
  const { data } = useCmsPost(content);

  return (
    <div>
      <Head>
        <title>{data && data.title}</title>
        <meta name="description" content={data && data.summary} />
        <meta property="og:description" content={data && data.summary} />
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

export const getServerSideProps = async ({ params, req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const content = await getCmsContent(
    `announcements?filters[slug][$eq]=${params.slug.toString()}&filters[enabled][$eq]=true`,
    true
  );

  return {
    props: { content },
  };
};
