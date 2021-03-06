import { Divider } from '@mantine/core';
import { isAfter, isBefore } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ArrowBigDownLines, Flame } from 'tabler-icons-react';
import Container from '../../components/Container';
import DarkBox from '../../components/DarkBox';
import GoBack from '../../components/GoBack';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import UseCaseFilter from '../../components/Layouts/titanchest/kpi-tracker/KpiTrackerFilter';
import NeonText from '../../components/NeonText';
import useCmsData from '../../hooks/cms/useCmsData';
import {
  formatDate,
  getStartOfThisMonthDate,
  getStartOfThisWeekDate,
  getStartOfLastWeekDate,
  getStartOfPreviousMonth,
  getEndOfPreviousMonth,
  getToday,
} from '../../utils/dates';
import { getCmsContent, getStatsList } from '../../utils/getters';
import { generateData } from '../../utils/kpi-tracker/generateData';
import FundamentalsStatus from '../../components/Layouts/titanchest/FundamentalsStatus';
import PopoverTooltip from '../../components/Layouts/titanchest/PopoverTooltip';

function InflationTracker({
  titanoToday,
  titanoStartOfThisWeek,
  titanoStartOfLastWeek,
  titanoStartOfThisMonth,
  titanoStartOfPreviousMonth,
  titanoEndOfPreviousMonth,
  announcements,
}) {
  const [data, setData] = useState();
  const { data: milestones } = useCmsData(announcements, '', true);
  const [toggles, setToggles] = useState({
    totalSupply: true,
    circulatingSupply: true,
    burnedTokens: true,
    tokenPrice: true,
    inflation: true,
    holders: true,
    avgHoldings: false,
    bnbPrice: true,
    thisWeek: true,
    lastWeek: true,
    thisMonth: true,
    previousMonth: true,
  });

  const handleToggle = (toggler) => {
    const newState = { ...toggles };
    newState[toggler] = !toggles[toggler];
    setToggles(newState);
  };

  useEffect(() => {
    if (
      titanoToday &&
      titanoStartOfThisWeek &&
      titanoStartOfLastWeek &&
      titanoStartOfThisMonth &&
      titanoStartOfPreviousMonth &&
      titanoEndOfPreviousMonth &&
      announcements
    ) {
      const dataSet = [
        generateData({
          period: 'This Week',
          date: `${getStartOfThisWeekDate()} - ${getToday()}`,
          fromData: titanoStartOfThisWeek[0],
          toData: titanoToday[0],
          milestones: milestones.filter(({ createdAt }) =>
            isAfter(new Date(createdAt), new Date(getStartOfThisWeekDate()))
          ),
          type: 'thisWeek',
          state: toggles,
        }),
        generateData({
          period: 'Last Week',
          date: `${getStartOfLastWeekDate()} - ${getStartOfThisWeekDate()}`,
          fromData: titanoStartOfLastWeek[0],
          toData: titanoStartOfThisWeek[0],
          milestones: milestones.filter(({ createdAt }) =>
            isBefore(new Date(createdAt), new Date(getStartOfThisWeekDate())) &&
            isAfter(new Date(createdAt), new Date(getStartOfLastWeekDate()))
          ),
          type: 'lastWeek',
          state: toggles,
        }),
        generateData({
          period: 'This Month',
          date: `${getStartOfThisMonthDate()} - ${getToday()}`,
          fromData: titanoStartOfThisMonth[0],
          toData: titanoToday[0],
          milestones: milestones.filter(({ createdAt }) =>
            isAfter(new Date(createdAt), new Date(getStartOfThisMonthDate()))
          ),
          type: 'thisMonth',
          state: toggles,
        }),
        generateData({
          period: 'Previous Month',
          date: `${getStartOfPreviousMonth()} - ${getEndOfPreviousMonth()}`,
          fromData: titanoStartOfPreviousMonth[0],
          toData: titanoEndOfPreviousMonth[0],
          milestones: milestones.filter(({ createdAt }) =>
            !isAfter(new Date(createdAt), new Date(getEndOfPreviousMonth()))
          ),
          type: 'previousMonth',
          state: toggles,
        }),
      ];

      setData(dataSet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [milestones, toggles]);

  const StatsTab = ({ value, name, change, tooltip }) => (
    <DarkBox
      withBorder
      withHover
      className="max-w-[190px] min-w-[180px] h-[120px] flex w-full flex-col items-center justify-center relative"
    >
      <NeonText className="!text-md mb-2 break-all">{value}</NeonText>
      <NeonText className="!text-xs">{name}</NeonText>
      {change && change !== 0 && change !== Infinity ? (
        <div
          className={`absolute top-2 right-2 text-xs font-bold ${
            change > 0 ? 'text-titano-green' : 'text-titano-pink'
          }`}
        >
          {change > 0 && '+'}
          {(change || 0).toFixed(2)}%
        </div>
      ) : (
        ''
      )}

      {tooltip && (
        <div className="absolute bottom-1 left-0 px-2">
          <PopoverTooltip tooltip={tooltip} />
        </div>
      )}
    </DarkBox>
  );

  return (
    <div>
      <Head>
        <title>Titano key performance indicators dashboard</title>
        <meta
          name="description"
          content="Titano key performance indicators dashboard. Track various Titano key indicators for a period of time and measure the impact of new releases, and announcements!"
        />

        <meta
          property="og:description"
          content="Titano key performance indicators dashboard. Track various Titano key indicators for a period of time and measure the impact of new releases, and announcements!"
        />
      </Head>
      <Layout>
        <Container>
          <GoBack />
          <Heading className="text-white">
            Titano Key Performance Indicators
          </Heading>
          {titanoToday && (
            <div className="flex justify-start">
              <FundamentalsStatus dataSet={titanoToday} />
            </div>
          )}
          <div className="mb-4">
            <UseCaseFilter toggles={toggles} handleToggle={handleToggle} />
          </div>
          {data &&
            data.map(
              (
                { period, date, dataSet, milestones, show, description },
                index
              ) =>
                show && (
                  <DarkBox key={`data_wrapper_${index}`} className="mb-8">
                    <p className="text-white text-2xl font-bold">{period}</p>
                    <p className="text-white">{date}</p>
                    <Divider className="my-4" />
                    <div className="flex flex-col gap-4 text-center">
                      <div className="flex gap-4 flex-wrap justify-center">
                        {dataSet.from &&
                          dataSet.from.map(
                            ({ name, value, show, tooltip }, fromIndex) =>
                              show && (
                                <StatsTab
                                  key={`data_wrapper_from_data${fromIndex}`}
                                  value={value}
                                  name={name}
                                  tooltip={tooltip}
                                />
                              )
                          )}
                      </div>
                      <div className="flex flex-1">
                        <ArrowBigDownLines
                          size={50}
                          className="text-titano-pink flex-1 animate-pulse"
                        />
                      </div>
                      <div className="flex gap-4 flex-wrap justify-center">
                        {dataSet.to &&
                          dataSet.to.map(
                            ({ name, value, change, show, tooltip }, toIndex) =>
                              show && (
                                <StatsTab
                                  key={`data_wrapper_to_data${toIndex}`}
                                  value={value}
                                  name={name}
                                  change={change}
                                  tooltip={tooltip}
                                />
                              )
                          )}
                      </div>
                    </div>
                    <DarkBox className="mt-4 text-white">
                      <p className="mb-4 text-xl font-bold">Summary</p>
                      <p>{description}</p>
                    </DarkBox>
                    <DarkBox className="mt-4 text-white">
                      <p className="mb-4 font-bold flex gap-1">
                        <Flame className="text-titano-pink animate-pulse" />{' '}
                        Major Announcements and Releases
                        <Flame className="text-titano-pink animate-pulse" />
                      </p>
                      <Divider className="my-4" />
                      {milestones && milestones.length ? (
                        milestones.map(
                          ({ publishedAt, title, slug }, milestoneIndex) => (
                            <div
                              className="mb-4"
                              key={`milestone_${milestoneIndex}_${period}`}
                            >
                              <Link href={`/announcements/${slug}`}>
                                <a>
                                  <p className="text-titano-green">{title}</p>
                                  <p className="text-xs">
                                    {formatDate(
                                      new Date(publishedAt),
                                      'yyyy-MM-dd HH:mm'
                                    )}
                                  </p>
                                </a>
                              </Link>
                            </div>
                          )
                        )
                      ) : (
                        <div>
                          <p>
                            There were no major announcements or releases during
                            this period
                          </p>
                        </div>
                      )}
                    </DarkBox>
                  </DarkBox>
                )
            )}
        </Container>
      </Layout>
    </div>
  );
}

export default InflationTracker;

export const getServerSideProps = async () => {
  const titanoToday = await getStatsList(
    'Titano?compute=total_supply,circulating_supply',
    true
  );
  const titanoStartOfThisWeek = await getStatsList(
    `Titano?from=${getStartOfThisWeekDate()}&order=asc&compute=total_supply,circulating_supply`,
    true
  );
  const titanoStartOfLastWeek = await getStatsList(
    `Titano?from=${getStartOfLastWeekDate()}&order=asc&compute=total_supply,circulating_supply`,
    true
  );
  const titanoStartOfThisMonth = await getStatsList(
    `Titano?from=${getStartOfThisMonthDate()}&order=asc&compute=total_supply,circulating_supply`,
    true
  );
  const titanoStartOfPreviousMonth = await getStatsList(
    `Titano?from=${getStartOfPreviousMonth()}&order=asc&compute=total_supply,circulating_supply`,
    true
  );
  const titanoEndOfPreviousMonth = await getStatsList(
    `Titano?from=${getEndOfPreviousMonth()}&order=asc&compute=total_supply,circulating_supply`,
    true
  );
  const announcements = await getCmsContent('announcements', true);

  return {
    props: {
      titanoToday,
      titanoStartOfThisWeek,
      titanoStartOfLastWeek,
      titanoStartOfThisMonth,
      titanoStartOfPreviousMonth,
      titanoEndOfPreviousMonth,
      announcements,
    },
  };
};
