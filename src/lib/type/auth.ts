export interface SignupData {
  email: string;
  password: string;
}

export enum ErrorMessage {
  SameEmail = '이미 사용중인 이메일 입니다',
  InvalidPassword = '비밀번호는 8자리 이상, 특수문자, 숫자, 알파벳을 포함해야 합니다',
  InvalidEmail = '유효하지 않은 이메일입니다',
  EmailValidationTimeOut = '인증메일 유효시간이 지났습니다. 다시 인증 요청을 해주세요',
}

export enum SuccessMessage {
  VerifyEmail = '회원가입 완료를 위해 이메일 인증을 해주세요',
  VerifyEmailComplete = '회원가입 인증이 완료되었습니다',
}

export interface EmailContext {
  emailContext: string;
  authEmailId: number;
}
