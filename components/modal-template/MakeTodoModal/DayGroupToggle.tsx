import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface DaySelectProps {
  field: ControllerRenderProps<any, 'weekDay'>;
}

function DayGroupToggle({ field }: DaySelectProps) {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="0">일</ToggleGroupItem>
      <ToggleGroupItem value="1">월</ToggleGroupItem>
      <ToggleGroupItem value="2">화</ToggleGroupItem>
      <ToggleGroupItem value="3">수</ToggleGroupItem>
      <ToggleGroupItem value="4">목</ToggleGroupItem>
      <ToggleGroupItem value="5">금</ToggleGroupItem>
      <ToggleGroupItem value="6">토</ToggleGroupItem>
    </ToggleGroup>
  );
}

export default DayGroupToggle;
