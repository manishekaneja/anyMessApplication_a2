export class Message {
  constructor(public message: string, public fav: boolean) { }
}
export class DataBlock {
  constructor(private _email?: string, private _password?: string, private _fullname?: string, private _messages?: Message[], private _tokenID?: string) { }
  get email(): string {
    return this._email || '';
  }
  get password(): string {
    return this._password;
  }
  get fullname(): string {
    return this._fullname;
  }
  get messages(): Array<Message> {
    return this._messages;
  }
  public messagesCount(): number {
    return this._messages.length;
  }
  public emailValid() {
    return !!this._email.match(/^([a-zA-Z0-9_\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/);
  }
  public passwordValid() {
    return this._password.length >= 4 && this._password.length <= 16;
  }
  set email(email: string) {
    this._email = email;
  }
  set password(password: string) {
    this._password = password;
  }
  set fullname(fullname: string) {
    this._fullname = fullname;
  }
  set messages(messages: Array<Message>) {
    this._messages = messages;
  }
  public getRegiterDataFormat(): Object {
    return {
      "fullname": this._fullname,
      "email": this._email,
      "password": this._password
    }
  }
}