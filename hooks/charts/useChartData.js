import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useMediaQuery } from '@mantine/hooks';
import { getStatsList } from '../../utils/getters';

function useChartData(depth = 180) {
  const [chartData, setChartData] = useState();
  const [status, setStatus] = useState('loading');
  const [type, setType] = useState('');
  const [chartName, setChartName] = useState('');
  const [labels, setLabels] = useState([]);
  const [errors, setErrors] = useState('');
  const isSmallScreen = useMediaQuery('(max-width: 767px)');

  const execute = (chartRef, viewport) => (type, name) => {
    const isComputeType = type.includes(',');
    const chartType = isComputeType
      ? type.split(',')[type.split(',').length - 1]
      : type;

    getStatsList(`Titano?select=${type},created_at&limit=${depth}`, false)
      .then((response) => {
        response &&
          setLabels(
            response
              .map(({ created_at }) => format(new Date(created_at), 'HH:mm'))
              .reverse()
          );

        response &&
          setChartData(
            response.map((chartData) => chartData[chartType]).reverse()
          );
        setType(type);
        setChartName(name);
        setStatus('idle');
      })
      .catch((error) => {
        setErrors(error);
      });

    if (chartRef && viewport && isSmallScreen) {
      viewport.current.scrollTo({
        top: chartRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {}, [chartData]);

  return { chartData, labels, status, errors, type, chartName, execute };
}

export default useChartData;
