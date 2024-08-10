'use client';

import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import timeArr from '@/constants/timeArr';
import { formatToDate, formatToTime } from '@/utils/dateFormat';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import DayGroupToggle from './DayGroupToggle';
import FrequencySelect from './FrequencySelect';

const formSchema = z.discriminatedUnion('frequencyType', [
  z.object({
    name: z
      .string()
      .min(2, { message: '최소 2자 이상 입력해주세요.' })
      .max(10, { message: '최대로 입력할 수 있는 글자수는 10개입니다.' }),
    description: z
      .string()
      .min(2, { message: '최소 2자 이상 입력해주세요.' })
      .max(30, { message: '최대로 입력할 수 있는 글자수는 30개입니다.' }),
    startDate: z.string().default(new Date().setHours(0, 0, 0, 0).toString()),
    frequencyType: z.literal('WEEKLY'),
    weekDay: z.array(z.number().min(0).max(6)),
  }),
  z.object({
    name: z
      .string()
      .min(2, { message: '최소 2자 이상 입력해주세요.' })
      .max(10, { message: '최대로 입력할 수 있는 글자수는 10개입니다.' }),
    description: z
      .string()
      .min(2, { message: '최소 2자 이상 입력해주세요.' })
      .max(30, { message: '최대로 입력할 수 있는 글자수는 30개입니다.' }),
    startDate: z.string().default(new Date().setHours(0, 0, 0, 0).toString()),
    frequencyType: z.literal('MONTHLY'),
    monthDay: z.number().min(1).max(31),
  }),
  z.object({
    name: z
      .string()
      .min(2, { message: '최소 2자 이상 입력해주세요.' })
      .max(10, { message: '최대로 입력할 수 있는 글자수는 10개입니다.' }),
    description: z
      .string()
      .min(2, { message: '최소 2자 이상 입력해주세요.' })
      .max(30, { message: '최대로 입력할 수 있는 글자수는 30개입니다.' }),
    startDate: z.string().default(new Date().setHours(0, 0, 0, 0).toString()),
    frequencyType: z.enum(['ONCE', 'DAILY']),
  }),
]);

const commonClassName =
  'flex h-[75px] w-full resize-none rounded-xl border border-input/10 bg-background-secondary px-4 py-[10px] text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:text-text-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:text-base';

function MakeTodoModal({ className = '' }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isDayPickerOpen, setIsDayPickerOpen] = React.useState<boolean>(false);
  const [isDatePickerOpen, setIsDatePickerOpen] =
    React.useState<boolean>(false);
  const [isTimePickerOpen, setIsTimePickerOpen] =
    React.useState<boolean>(false);
  const [date, setDate] = React.useState<Date>();
  const [dateValue, setDateValue] = React.useState<string | undefined>(
    formatToDate(new Date(), 'koreanFullDate').toString()
  );
  const [timeValue, setTimeValue] = React.useState<string | undefined>(
    '오전 00:00'
  );
  const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      frequencyType: 'ONCE',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset();
    setIsOpen(false);
  };

  const handleDayPickerOpen = (value: boolean) => {
    setIsDayPickerOpen(value);
  };

  const handleDatePickerOpen = () => {
    setIsDatePickerOpen((prev) => !prev);
    if (isTimePickerOpen) {
      setIsTimePickerOpen((prev) => !prev);
    }
  };
  const handleTimePickerOpen = () => {
    setIsTimePickerOpen((prev) => !prev);
    if (isDatePickerOpen) {
      setIsDatePickerOpen((prev) => !prev);
    }
  };

  const handleDate = (day: Date | undefined) => {
    if (day) {
      setDateValue(formatToDate(day, 'koreanFullDate'));
      setDate(day);
      setIsDatePickerOpen(false);
      setIsTimePickerOpen(true);
    }
  };

  const updateTimeValue = (periodValue: 'AM' | 'PM', time: string) => {
    const formattedTime =
      periodValue === 'AM' ? `오전 ${time}` : `오후 ${time}`;
    setTimeValue(formattedTime);
  };

  const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
    setPeriod(newPeriod);
    updateTimeValue(period, newPeriod);
  };

  const handleTimeChange = (time: string) => {
    updateTimeValue(period, time);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        <Button variant="floating">+ 할 일 추가</Button>
      </DialogTrigger>
      <DialogContent hasCloseIcon className="z-[80]">
        <DialogTitle>할 일 만들기</DialogTitle>
        <DialogDescription />
        <p className="mt-[-20px] text-[14px] font-medium text-text-default">
          할 일은 실제로 실행 가능한 작업 중심으로
        </p>
        <p className="mt-[-20px] text-[14px] font-medium text-text-default">
          작성해주시면 좋습니다.
        </p>
        <div className="gap- flex w-full max-w-[336px] flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>할 일 제목</FormLabel>
                    <Input
                      className="rounded-xl"
                      placeholder="할 일 제목을 입력해주세요."
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="frequencyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>시작 날짜 및 시간</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        readOnly
                        className={`w-[204px] cursor-pointer rounded-xl focus:outline-none focus-visible:ring-0 ${isDatePickerOpen && 'border-2 border-brand-primary'}`}
                        placeholder={dateValue}
                        onClick={handleDatePickerOpen}
                      />
                      <Input
                        readOnly
                        className={`cursor-pointer rounded-xl focus:outline-none focus-visible:ring-0 ${isTimePickerOpen && 'border-2 border-brand-primary'}`}
                        placeholder={timeValue}
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
                          {...field}
                        />
                      </div>
                    )}
                    {isTimePickerOpen && (
                      <div
                        className={`flex gap-3 rounded-xl p-3 ${isTimePickerOpen && 'border-2 border-brand-primary'}`}
                      >
                        <div className="flex w-[78px] flex-col gap-2">
                          <button
                            type="button"
                            className="h-[40px] w-[78px] rounded-xl bg-[#18212F] text-text-default"
                            onClick={() => handlePeriodChange('AM')}
                          >
                            오전
                          </button>
                          <button
                            type="button"
                            className="h-[40px] w-[78px] rounded-xl bg-[#18212F] text-text-default"
                            onClick={() => handlePeriodChange('PM')}
                          >
                            오후
                          </button>
                        </div>
                        <div className="custom-scroll flex h-[152px] w-full flex-col gap-3 overflow-scroll overflow-x-hidden rounded-xl bg-[#18212F] py-3">
                          {timeArr.map((time) => (
                            <button
                              type="button"
                              className="w-full pl-5 text-start text-text-default"
                              onClick={() => handleTimeChange(time)}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="frequencyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>반복 설정</FormLabel>
                    <FrequencySelect
                      field={field}
                      handleState={handleDayPickerOpen}
                    />
                  </FormItem>
                )}
              />
              {isDayPickerOpen && (
                <Controller
                  control={form.control}
                  name="frequencyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>반복 요일</FormLabel>
                      <DayGroupToggle field={field} />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>할 일 메모</FormLabel>
                    <textarea
                      placeholder="메모를 입력해주세요."
                      {...field}
                      className={commonClassName}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-3">
                만들기
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MakeTodoModal;
