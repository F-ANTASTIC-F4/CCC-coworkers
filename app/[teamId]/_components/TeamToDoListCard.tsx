'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import Kebab from '@/public/icons/kebab.svg';
import { Pie, PieChart } from 'recharts';

const chartConfig = {
  completed: {
    label: 'Completed',
    color: 'hsl(var(--color-green-500))',
  },
  todo: {
    label: 'Todo',
    color: 'hsl(var(--color-white))',
  },
};

const chartData = [
  { name: 'completed', total: 3, fill: '#10B981' },
  { name: 'todo', total: 2, fill: '#FFF' },
];

function TeamToDoListCard() {
  return (
    <div className="relative flex h-10 items-center justify-between rounded-xl bg-background-secondary py-3 pl-6 pr-2">
      <div className="absolute left-0 top-0 h-full w-[10px] rounded-l-xl bg-red-400" />
      <p>TeamToDoListCard</p>
      <div className="flex items-center gap-x-1">
        <div className="flex h-[25px] w-[58px] items-center rounded-xl bg-background px-2 py-1 text-brand-primary">
          <div className="size-4">
            <ChartContainer config={chartConfig} className="aspect-square">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="total"
                  nameKey="name"
                  // TODO - 원의 크기는 밖 div, innerRadius와 outerRadius로 조정 가능합니다!
                  innerRadius={4}
                  outerRadius={6}
                  strokeWidth={0}
                />
              </PieChart>
            </ChartContainer>
          </div>
          3/5
        </div>
        <Kebab />
      </div>
    </div>
  );
}
export default TeamToDoListCard;
