export interface AccountInformation {
  userId: number;
  username: string;
  balance: number;
  email: string;
  role: number;
  accountStatus: number
}

export interface UpgradeAccountInformation {
  userId: number;
  fullname?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  introduce?: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  rePassword: string;
}

export interface SignUpRequest {
  username: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface SignUpRequest{
username:string;
fullName: string;
phoneNumber:string;
address:string;
}