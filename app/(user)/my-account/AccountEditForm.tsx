'use client';

import ImageInputUI from '@/components/ui/ImageInputLabel';
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
import { Input } from '@/components/ui/input';
import { login } from '@/lib/api/auth';
import uploadImage from '@/lib/api/common';
import { updateUser } from '@/lib/api/user';
import Profile from '@/public/icons/profile.svg';
import { User } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  image: z.custom<File | string>(
    (v) => v instanceof File || typeof v === 'string'
  ),
  nickname: z
    .string()
    .min(1, '변경할 닉네임을 입력해주세요')
    .max(30, '30자 이하로 닉네임을 입력해주세요'),
  email: z.string().min(1).max(50),
  password: z.string(),
});

interface AccountEditFormProps {
  currentUserAccountInfo: User;
}

const AccountEditForm = ({ currentUserAccountInfo }: AccountEditFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: currentUserAccountInfo?.image || undefined,
      nickname: currentUserAccountInfo.nickname,
      email: currentUserAccountInfo.email,
      password: '',
    },
  });

  const [imagePreview, setImagePreview] = useState(
    currentUserAccountInfo?.image
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const nickname =
      currentUserAccountInfo.nickname === values.nickname
        ? null
        : values.nickname;
    const image =
      values.image && values.image !== currentUserAccountInfo?.image
        ? await uploadImage(values.image)
        : undefined;

    if (!nickname && !image) {
      alert('변경된 내용이 없습니다');
      return;
    }

    if (nickname) updateUser({ nickname, image });
    else updateUser({ image });
  }

  const image = form.watch('image');

  useEffect(() => {
    if (!image || typeof image === 'string') return;
    setImagePreview(URL.createObjectURL(image));
  }, [image]);

  async function validationPassword(values: z.infer<typeof formSchema>) {
    try {
      await login({ email: values.email, password: values.password });
    } catch (err) {
      alert('현재 비밀번호를 정확하게 입력해주세요');
    }
    // TODO 로그인 성공하면 재설정 모달 띄우기
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel className="inline-block w-[max-content]">
                <ImageInputUI>
                  <ImageInputUI.Content imagePreview={imagePreview}>
                    <Profile />
                  </ImageInputUI.Content>
                </ImageInputUI>
              </FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                  className="hidden"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input {...field} placeholder="닉네임을 입력해주세요" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <div className="relative">
                  <PasswordInput
                    placeholder="현재 비밀번호를 입력해주세요"
                    {...field}
                  />
                  <Button
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    size="x-small"
                    formAction={() => form.handleSubmit(validationPassword)}
                  >
                    변경하기
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button formAction={() => form.handleSubmit(onSubmit)}>
          변경사항 저장하기
        </Button>
      </form>
    </Form>
  );
};

export default AccountEditForm;
