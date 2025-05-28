import { first } from 'rxjs';

export type login_request = {
  email: string;
  password: string;
};

export type login_response = {
  message: string;
  token: string;
};

export type register_request = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type register_response = login_response;
