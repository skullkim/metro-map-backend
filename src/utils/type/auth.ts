export interface SignupData {
  email: string;
  password: string;
}

export enum ErrorMessage {
  SameEmail = '이미 사용중인 이메일 입니다',
  InvalidPassword = '비밀번호는 8자리 이상, 특수문자, 숫자, 알파벳을 포함해야 합니다',
  InvalidEmail = '유효하지 않은 이메일입니다',
  EmailValidationTimeOut = '인증메일 유효시간이 지났습니다. 다시 인증 요청을 해주세요',
  EmailAlreadyVerified = '이미 인증한 이메일 입니다',
  DidNotSignUpYet = '회원가입을 하지 않은 계정입니다',
  WrongPassword = '비밀번호가 틀렸습니다',
  DidNotVerifyEmailYet = '아직 이메일 인증을 하지 않았습니다',
  TokenAuth = 'Authentication error',
  TokenExpired = 'token expired',
  InvalidToken = 'invalidToken',
  ComplainContextIsTooShort = '민원내용은 10글자 이상이여야 합니',
  InvalidSubwayLine = '올바르지 않은 지하철 노선입니다',
}

export enum SuccessMessage {
  VerifyEmail = '회원가입 완료를 위해 이메일 인증을 해주세요',
  VerifyEmailComplete = '회원가입 인증이 완료되었습니다',
  RecertificationEmail = '인증이메일이 재발송 됬습니다',
}

export interface EmailContext {
  emailContext: string;
  authEmailId: number;
}

export interface UserAccessToken {
  id: number;
  email: string;
}

export interface RefreshToken {
  id: number;
  email: string;
  iat: number;
}
export interface UserComplain {
  email?: string;
  subwayLine?: number;
  userComplainContext?: string;
}
