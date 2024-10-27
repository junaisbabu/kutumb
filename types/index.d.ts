interface QuoteData {
  id: number;
  username: string;
  mediaUrl: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserData {
  username: string;
  otp: string;
}

interface CreateQuoteData {
  text: string;
  mediaUrl: File | null;
}

interface JWTTokenData {
  username: string;
  iat: number;
  exp: number;
}
