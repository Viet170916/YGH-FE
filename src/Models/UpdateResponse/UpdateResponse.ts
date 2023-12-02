interface UpdateResponse<T>{
  status:boolean;
  message:string;
  data?:T;
}
