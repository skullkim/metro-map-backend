export interface SignupData {
  email: string;
  password: string;
}

export enum ErrorMessage {
  SameEmail = '이미 사용중인 이메일 입니다',
  InvalidPassword = '비밀번호는 8자리 이상, 특수문자, 숫자, 알파벳을 포함해야 합니다',
}
