import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface FrequencySelectProps {
  field: ControllerRenderProps<any, 'frequencyType'>;
  handleState: (value: boolean) => void;
}

function FrequencySelect({ field, handleState }: FrequencySelectProps) {
  React.useEffect(() => {
    if (field.value === 'WEEKLY') {
      handleState(true);
    } else {
      handleState(false);
    }
  }, [field.value, handleState]);

  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger className="w-[109px]">
        <SelectValue placeholder="한 번" />
      </SelectTrigger>
      <SelectContent className="z-[100]">
        <SelectItem value="ONCE">한 번</SelectItem>
        <SelectItem value="DAILY">매일</SelectItem>
        <SelectItem value="WEEKLY">주 반복</SelectItem>
        <SelectItem value="MONTHLY">월 반복</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default FrequencySelect;
