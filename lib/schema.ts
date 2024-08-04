import * as z from 'zod';

const imageSchema = z
  .union([
    // NOTE: union: file혹은 string 중 일치하는 값
    z.instanceof(File, {
      message: '유효한 이미지 파일을 업로드해주세요.',
    }),
    z
      .string()
      .url('유효한 이미지 URL을 입력해주세요.')
      .min(1, '이미지 URL을 입력해주세요.'),
  ])
  .refine(
    // NOTE: 파일 유형 검사
    (value) => {
      if (value instanceof File) {
        // 파일 유형 검사
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }
      return true; // URL인 경우 추가 검증 없이 통과
    },
    {
      message: '지원되는 이미지 형식은 JPEG, PNG, GIF입니다.',
    }
  );

const teamNameSchema = z.string().min(1, '팀 이름을 선택해주세요.');

const createTeamValidationSchema = z.object({
  image: imageSchema,
  name: teamNameSchema,
});

export default createTeamValidationSchema;
