import { useEffect, useState } from 'react';

const useCmsPost = (content) => {
  const [state, setState] = useState();

  const setCmsContent = () => {
    try {
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
  return { data };
};

export default useCmsPost;
