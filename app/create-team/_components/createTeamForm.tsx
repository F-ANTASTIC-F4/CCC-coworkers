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
import { createTeamValidationSchema } from '@/lib/schema';
import TeamProfile from '@/public/icons/team_profile.svg';
import { GroupList } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function CreateTeamForm() {
  const [teams, setTeams] = useState<GroupList>([]);

  const form = useForm<z.infer<typeof createTeamValidationSchema>>({
    resolver: zodResolver(createTeamValidationSchema),
  });

  useEffect(() => {
    // 그룹 목록 가져옴
    const fetchTeams = async () => {
      try {
        const response = await fetchAPI.GroupList();
        setTeams(response);
      } catch (error) {
        console.error('팀 목록을 가져오는 중 오류 발생:', error);
      }
    };

    fetchTeams();
  }, []);

  // 팀 이름 중복 검사
  const isTeamNameUnique = (name: string): boolean =>
    !teams.some((team) => team.name === name);

  const onSubmit = async (data: z.infer<typeof createTeamValidationSchema>) => {
    try {
      if (!isTeamNameUnique(data.name)) {
        form.setError('name', {
          type: 'manual',
          message: '이미 존재하는 팀 이름입니다.',
        });
        return;
      }

      const image = data.image ? await uploadImage(data.image) : undefined;

      const teamData = {
        name: data.name,
        image,
      };
      await createGroup(teamData);

      alert('팀 생성 성공');
    } catch (error) {
      console.error('팀 생성 중 오류 발생:', error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
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
      </form>
    </Form>
  );
}
