export interface SignupData {
  email: string;
  password: string;
}

export enum ErrorMessage {
  SameEmail = '이미 사용중인 이메일 입니다',
}
