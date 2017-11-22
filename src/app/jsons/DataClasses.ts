// export class Register {
//   constructor(public fullName: string, public username: string, public email: string, public password: string, public cpassword: string) { }
// }
export class Message {
  constructor(public message: string, public fav: boolean) { }
}
// export class Login {
//   constructor(public email: string, public password: string) { }  
// }

export class DataBlock{
  constructor(public email: string, public password: string,public fullName?:string, public username?: string, public cpassword?: string ,public messages?:Message[],public tokenID?:string) { }
  
}