import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import timeArr from '@/constants/timeArr';
import { formatToDate } from '@/utils/dateFormat';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface StartDatePickerProps {
  field: ControllerRenderProps<any, 'startDate'>; // 'startDate'로 수정
}

function StartDatePicker({ field }: StartDatePickerProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] =
    React.useState<boolean>(false);
  const [isTimePickerOpen, setIsTimePickerOpen] =
    React.useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>('12:00');
  const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM');

  // NOTE - 자동으로 날짜나 시간을 결정하는 부분이 변경되도록 설정 (ex. 날짜를 지정하면 자동으로 시간 지정으로 넘어감)
  const handleDatePickerOpen = () => {
    setIsDatePickerOpen((prev) => !prev);
    if (isTimePickerOpen) setIsTimePickerOpen(false);
  };

  const handleTimePickerOpen = () => {
    setIsTimePickerOpen((prev) => !prev);
    if (isDatePickerOpen) setIsDatePickerOpen(false);
  };

  // NOTE - 날짜와 시간을 지정하면 날짜 + 오전/오후 + 시간을 합쳐 startDate 키로 최종 값을 넘겨줌
  const updateDateTime = (
    day: Date | undefined,
    timeValue: string,
    periodValue: 'AM' | 'PM'
  ) => {
    if (day) {
      const [hours, minutes] = timeValue.split(':');
      const hourOffset = periodValue === 'AM' ? 0 : 12;
      day.setHours(parseInt(hours, 10) + hourOffset);
      day.setMinutes(parseInt(minutes, 10));
      field.onChange(day.toISOString());
    }
  };

  const handleDate = (day: Date | undefined) => {
    if (day) {
      setDate(day);
      setIsDatePickerOpen(false);
      setIsTimePickerOpen(true);
      updateDateTime(day, time, period);
    }
  };

  const updateTimeValue = (periodValue: 'AM' | 'PM', timeValue: string) => {
    setPeriod(periodValue);
    setTime(timeValue);
    updateDateTime(date, timeValue, periodValue);
  };

  const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
    updateTimeValue(newPeriod, time);
  };

  const handleTimeChange = (timeValue: string) => {
    updateTimeValue(period, timeValue);
    setIsTimePickerOpen(false);
  };

  return (
    <>
      <div className="flex gap-2">
        <Input
          readOnly
          className={`w-[204px] cursor-pointer rounded-xl focus:outline-none focus-visible:ring-0 ${
            isDatePickerOpen ? 'border-2 border-brand-primary' : ''
          }`}
          placeholder={formatToDate(new Date(), 'koreanFullDate')}
          value={date ? formatToDate(date, 'koreanFullDate') : ''}
          onClick={handleDatePickerOpen}
        />
        <Input
          readOnly
          className={`cursor-pointer rounded-xl focus:outline-none focus-visible:ring-0 ${
            isTimePickerOpen ? 'border-2 border-brand-primary' : ''
          }`}
          value={`${period === 'AM' ? '오전' : '오후'} ${time}`}
          onClick={handleTimePickerOpen}
        />
      </div>
      {isDatePickerOpen && (
        <div className="flex w-[336px] items-center justify-center">
          <Calendar
            mode="single"
            className="rounded-xl border-2 border-brand-primary"
            selected={date}
            onSelect={handleDate}
            initialFocus
          />
        </div>
      )}
      {isTimePickerOpen && (
        <div className="flex gap-3 rounded-xl border-2 border-brand-primary p-3">
          <div className="flex w-[78px] flex-col gap-2">
            <button
              type="button"
              className={`h-[40px] w-[78px] rounded-xl bg-[#18212F] text-text-default ${period === 'AM' && 'bg-brand-primary text-customBackground-primary'}`}
              onClick={() => handlePeriodChange('AM')}
            >
              오전
            </button>
            <button
              type="button"
              className={`h-[40px] w-[78px] rounded-xl bg-[#18212F] text-text-default ${period === 'PM' && 'bg-brand-primary text-customBackground-primary'}`}
              onClick={() => handlePeriodChange('PM')}
            >
              오후
            </button>
          </div>
          <div className="custom-scroll flex h-[152px] w-full flex-col gap-3 overflow-scroll overflow-x-hidden rounded-xl bg-[#18212F] py-3">
            {timeArr.map((timeOption) => (
              <button
                key={timeOption}
                type="button"
                className={`w-full pl-5 text-start text-text-default ${timeOption === time && 'text-text-primary'}`}
                onClick={() => handleTimeChange(timeOption)}
              >
                {timeOption}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default StartDatePicker;
