export type login_Request = {
  email: string;
  password: string;
};

export type login_Response = {
  success: boolean;
  message: string;
};
