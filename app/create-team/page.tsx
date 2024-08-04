'use client';

import ImageInputUI from '@/components/ui/ImageInputLable';
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
import uploadImage from '@/lib/api/common';
import fetchAPI from '@/lib/api/fetchAPI';
import { createGroup } from '@/lib/api/group';
import createTeamValidationSchema from '@/lib/schema';
import TeamProfile from '@/public/icons/team_profile.svg';
import { GroupList } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function CreateTeam() {
  const form = useForm<z.infer<typeof createTeamValidationSchema>>({
    resolver: zodResolver(createTeamValidationSchema),
  });

  // API에서 팀 목록을 가져오는 함수
  const fetchTeams = async (): Promise<GroupList> => {
    const response = await fetchAPI.GroupList();
    return response;
  };

  // 팀 이름 중복 검사 함수
  const isTeamNameUnique = async (name: string): Promise<boolean> => {
    const teams = await fetchTeams();
    return !teams.some((team) => team.name === name);
  };

  const onSubmit = async (data: z.infer<typeof createTeamValidationSchema>) => {
    try {
      // 팀 이름 중복 검사
      const isUnique = await isTeamNameUnique(data.name);

      if (!isUnique) {
        form.setError('name', {
          type: 'manual',
          message: '이미 존재하는 팀 이름입니다.',
        });
        return;
      }

      const image = data.image ? await uploadImage(data.image) : undefined;

      const datas = {
        name: data.name,
        image,
      };
      await createGroup(datas);

      console.log('팀 생성 성공:', data.name);
    } catch (error) {
      console.error('팀 생성 중 오류 발생:', error);
    }
  };

  return (
    <div className="mx-auto flex w-[600px] items-center justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="inline-block w-[max-content]">
                  <ImageInputUI>
                    <ImageInputUI.Content>
                      <TeamProfile />
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>팀 이름</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">생성하기</Button>
          <p>팀 이름은 회사명이나 모임 이름으로 설정하면 좋아요.</p>
        </form>
      </Form>
    </div>
  );
}
