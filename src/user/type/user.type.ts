export interface UserInfo {
  user_uuid: string;
  user_email_id: string;
  user_name: string;
  user_phone_number: string;
  student_id: string;
}

export type IdpTokenResponse = {
  access_token: string;
  refresh_token: string;
};
