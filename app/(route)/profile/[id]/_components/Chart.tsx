import dynamic from 'next/dynamic';
import { CardsType } from '@/types/global';
import { useMemo } from 'react';

const ApexChart = dynamic(
  () => import('react-apexcharts').then(mod => mod.default),
  { ssr: false }
);

export default function Chart({ cards }: { cards: CardsType }) {
  const options: any = {
    chart: {
      type: 'heatmap',
    },
    dataLabels: {
      enabled: true,
    },
    colors: ['#008FFB'],
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7'],
    },
    yaxis: {
      categories: ['Morning', 'Afternoon', 'Evening'],
    },
    title: {
      text: 'Daily Activity',
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 0,
              name: '0',
              color: '#FFFFFF',
            },
            {
              from: 1,
              to: 5,
              name: '1 ~ 5',
              color: '#00A100',
            },
            {
              from: 6,
              to: 20,
              name: '6 ~',
              color: '#128FD9',
            },
          ],
        },
      },
    },
  };

  const memo = useMemo(() => {
    let series = [
      {
        name: '1',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: '2',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: '3',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: '4',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: '5',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ];

    cards.result.map(item => {
      const week = Math.floor(parseInt(item.date.split('-')[2]) / 7);
      const day = parseInt(item.date.split('-')[2]) % 7;
      series[week].data[day] += 1;
    });

    return series;
  }, []);

  return (
    <div>
      <ApexChart
        options={options}
        series={memo}
        type="heatmap"
        height={250}
        width={500}
      />
    </div>
  );
}
