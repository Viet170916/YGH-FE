export default interface PersonalProfile {
  accountStatus: number;
  userId: string;
  avatarUrl: string;
  backgroundImageUrl?: string;
  userName: string;
  fullName: string;
  introduce?:string;
  address: string;
  contact: {
    phoneNumber?: string;
    email: string;
  };
}
