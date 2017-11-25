export class Message {
  constructor(public message: string, public fav: boolean) { }
}
export class DataBlock{
  constructor(public email: string, public password: string,public fullName?:string, public username?: string, public cpassword?: string ,public messages?:Message[],public tokenID?:string) { }
  
}