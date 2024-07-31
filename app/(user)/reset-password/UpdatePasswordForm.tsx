'use client';

import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.'
      ),
    passwordConfirmation: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.'
      ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: '비밀번호가 일치하지 않습니다.',
  });

interface UpdatePasswordFormProps {
  onSubmit: (data: any) => Promise<void>;
}

const UpdatePasswordForm = ({ onSubmit }: UpdatePasswordFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    await onSubmit({
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    });
  }

  return (
    <Form {...form}>
      <form
        className="w-full space-y-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="새 비밀번호를 다시 한번 입력해주세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>재설정</Button>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
