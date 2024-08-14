'use client';

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
import useRequestFunction from '@/hooks/useRequestFunction';
import { inviteMemberViaLink } from '@/lib/api/group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  token: z.string().min(1, {
    message: '팀 링크를 입력하세요.',
  }),
});

export default function InvitationTeamForm({
  userEmail,
}: {
  userEmail: string;
}) {
  const api = useRequestFunction(
    (props: { userEmail: string; token: string }) =>
      inviteMemberViaLink(props.userEmail, props.token)
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await api.request({ userEmail, token: data.token });
  };

  // API 요청 결과에 따른 alert
  useEffect(() => {
    if (api.isError) {
      alert(api.error?.message || api.error?.info);
    }
    if (api.isSuccess) {
      alert('팀 참여가 완료되었습니다.');
    }
  }, [
    api.isError,
    api.isSuccess,
    api.data,
    api.error?.info,
    api.error?.message,
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>팀 링크</FormLabel>
              <FormControl>
                <Input placeholder="팀 링크를 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={api.isPending}>
          {api.isPending ? '참여하는중...' : '참여하기'}
        </Button>
      </form>
    </Form>
  );
}
