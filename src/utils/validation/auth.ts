export const isValidPassword = (password: string): boolean => {
  const passwordRegexp: RegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%^*#?&])[A-Za-z\d$@$!%^*#?&]{8,}$/;
  return passwordRegexp.test(password);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegexp: RegExp =
    /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
  return emailRegexp.test(email);
};
