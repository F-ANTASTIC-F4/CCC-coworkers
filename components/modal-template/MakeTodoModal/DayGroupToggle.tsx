import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface DaySelectProps {
  field: ControllerRenderProps<any, 'weekDays'>;
}

function DayGroupToggle({ field }: DaySelectProps) {
  const selectedValues = field.value || [];

  // NOTE - 각각의 배열의 value를 가지고와 weekDays의 배열 키로 지정
  const handleWeekDayValue = (value: string[]) => {
    const numeberValue = value.map((v) => parseInt(v, 10));
    field.onChange(numeberValue);
  };

  return (
    <ToggleGroup
      type="multiple"
      value={selectedValues.map(String)}
      onValueChange={handleWeekDayValue}
    >
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
