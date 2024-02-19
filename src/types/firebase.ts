export interface FirebaseAuth {
  name: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
}

export interface FirebaseChat {
  messages: {
    text: string;
    timestamp: number;
    uid: string;
  }[];
  name: string;
  session: string;
  uid: string;
}
