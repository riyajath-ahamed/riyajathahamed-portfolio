"use client";

import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core';
import {

} from 'echarts/components';
import { RadarChart, RadarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

type Props = {}
echarts.use([RadarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
    RadarSeriesOption
>;

const SkillRadarChart = (props: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const option: EChartsOption = {
    radar: {
        indicator: [
          { name: 'React / TypeScript', max: 1000 },
          { name: 'UI/UX Design', max: 1000 },
          { name: 'Design Systems', max: 1000 },
          { name: 'Performance Optimi', max: 1000 }, //Performance Optimization
          { name: 'Problem Solving', max: 1000 },
          { name: 'Collaboration/Commun', max: 1000 }, // Collaboration / Communication
          { name: 'API Integration', max: 1000 },
          { name: 'Data Visualization', max: 1000 }
        ],
        axisName: {
          color: '#737373',
        //   fontWeight: 'bold',
          fontSize: 12,
          fontFamily: 'monospace',
          width: 1,
          overflow: "break",
        }
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [900, 850, 950, 800, 750, 850, 900, 700],
              name: 'Skill Level'
            }
          ],
          itemStyle: {
            color: '#adff2f'
          },
          lineStyle: {
            color: '#adff2f'
          }
        }
      ]
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
  )
}

export default SkillRadarChart