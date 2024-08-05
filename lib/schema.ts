import * as z from 'zod';

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const nameSchema = z
  .string()
  .min(1, '이름을 입력해주세요.')
  .max(10, '열 자 이하로 작성해주세요.');

// NOTE - required를 검사하려고 zod에서 제공하는 nonempty를 사용하려고 했는데 ""도 빈 문자열로 인식한다고 해서 min으로 작업했습니당 (required 검사를 안해줌)
// NOTE - 그리고 string 메서드에 required_error 이런것도 있는데 왜 있는지 찾아봤는데 null이나 undefined을 검사한다고 하네용
const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요.')
  .email({ message: '이메일 형식으로 작성해 주세요.' });

const passwordSchema = z
  .string()
  .min(1, '비밀번호를 입력해주세요.')
  .min(8, '비밀번호는 최소 8자리 이상이어야 합니다.')
  .refine(
    (value) => passwordRegex.test(value),
    '비밀번호는 최소 8자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.'
  );

const passwordConfirmSchema = z
  .string()
  .min(1, '비밀번호 확인을 입력해주세요.');

const loginValidationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const authValidationSchema = z
  .object({
    username: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });
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

export {
  createTeamValidationSchema,
  loginValidationSchema,
  authValidationSchema,
};
