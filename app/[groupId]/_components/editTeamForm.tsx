'use client';

import ImageInputUI from '@/components/ui/ImageInputLabel';
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
import uploadImage from '@/lib/api/common';
import { updateGroup } from '@/lib/api/group';
import { createTeamValidationSchema } from '@/lib/schema/auth';
import TeamProfile from '@/public/icons/group_profile.svg';
import { Group, Id } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type EditTeamProps = {
  groupData: Group;
};
export default function EditTeamForm({ groupData }: EditTeamProps) {
  const [imagePreview, setImagePreview] = useState(groupData.image);
  const router = useRouter();

  // NOTE - useRequestFunction은 하나의 인자값만 받는다고 기대?추론?해서 인자값이 두개임을 명시
  const api = useRequestFunction(
    (props: { groupId: Id; data: Partial<Pick<Group, 'image' | 'name'>> }) =>
      updateGroup(props.groupId, props.data)
  );

  const form = useForm<z.infer<typeof createTeamValidationSchema>>({
    resolver: zodResolver(createTeamValidationSchema),
    defaultValues: {
      name: groupData.name,
      image: groupData.image || undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof createTeamValidationSchema>) => {
    let imageUrl: string | undefined;

    if (data.image && data.image instanceof File) {
      const imageResult = await uploadImage(data.image);
      if ('data' in imageResult) {
        imageUrl = imageResult.data;
      }
    } else {
      imageUrl = groupData.image;
    }

    const editTeamData = {
      name: data.name,
      image: imageUrl,
    };

    const res = await api.request({
      groupId: groupData.id,
      data: editTeamData,
    });

    if (res) {
      router.push(`/${groupData.id}`);
    }
  };

  const currentImage = form.watch('image');

  // 이미지 프리뷰 설정
  useEffect(() => {
    if (!currentImage || typeof currentImage === 'string') return;
    setImagePreview(URL.createObjectURL(currentImage));
  }, [currentImage]);

  // API 요청 결과에 따른 alert
  useEffect(() => {
    if (api.isError) {
      alert(api.error?.message || api.error?.info);
    }
    if (api.isSuccess) {
      alert('팀 수정이 완료되었습니다.');
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
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel className="inline-block w-[max-content]">
                <ImageInputUI className="cursor-pointer">
                  <ImageInputUI.Content imagePreview={imagePreview}>
                    <TeamProfile width="60" height="60" />
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
                <Input placeholder="팀 이름을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={api.isPending}>
          {api.isPending ? '저장중...' : '수정하기'}
        </Button>
      </form>
    </Form>
  );
}
