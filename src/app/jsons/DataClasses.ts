import { Validators } from '@angular/forms';

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
    return Validators.email(this._email)
  }
  set email(email: string) {
    this._email = email;
  }
  set password(password: string) {
    this._password = password;
  }

}