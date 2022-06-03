import { useEffect, useState } from 'react';
import { getCmsContent } from '../../utils/getters';

const useCmsPost = (collection, slug) => {
  const [state, setState] = useState();

  const setCmsContent = async () => {
    try {
      const content = await getCmsContent(
        `${collection}?filters[slug][$eq]=${slug}&filters[enabled][$eq]=true`,
        false
      );

      if (content.length) {
        const data = content.map((item) => item.attributes)[0];
        setState(data);
      }

      return content;
    } catch (error) {
      console.log(error);
      setState();
    }
  };

  useEffect(() => {
    setCmsContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = state;
  return { data, slug };
};

export default useCmsPost;
