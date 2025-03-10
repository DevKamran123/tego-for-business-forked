export type LoginUserData = {
  accessToken: string;
  refreshToken: string;
  profile: {
    id: string;
    email: string;
    accountType: string;
    pimId?: null | string;
    firstName: string;
    lastName: string;
  };
}