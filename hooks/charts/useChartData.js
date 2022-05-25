import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { getStatsList } from '../../utils/getters';

function useChartData(depth = 180) {
  const [chartData, setChartData] = useState();
  const [status, setStatus] = useState('loading');
  const [type, setType] = useState('');
  const [chartName, setChartName] = useState('');
  const [labels, setLabels] = useState([]);
  const [errors, setErrors] = useState('');

  const execute = (type, name) => {
    getStatsList(`Titano?select=${type},created_at&limit=${depth}`, false)
      .then((response) => {
        response &&
          setLabels(
            response
              .map(({ created_at }) => format(new Date(created_at), 'HH:mm'))
              .reverse()
          );

        response &&
          setChartData(response.map((chartData) => chartData[type]).reverse());
        setType(type);
        setChartName(name);
        setStatus('idle');
      })
      .catch((error) => {
        setErrors(error);
      });
  };

  useEffect(() => {}, [chartData]);

  return { chartData, labels, status, errors, type, chartName, execute };
}

export default useChartData;
