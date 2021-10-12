export const isValidPassword = (password: string): boolean => {
  const passwordRegexp: RegExp =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return passwordRegexp.test(password);
}