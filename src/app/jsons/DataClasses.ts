export class Message {
  constructor(
    public _id: string,
    public message: string,
    public sendTo: string,
    public liked: boolean = false,
    public sendBy: string = "",
    public showSenderIdentity: boolean = false
  ) {}
}

export interface ApiResponse {
  token: string;
  code: number;
  status: string;
  messgae: string;
  data: User;
}

export class User {
  public static convertToUser(jsonObject: object): User {
    let userObject = new User("", "", "");
    for (let key in jsonObject) {
      userObject[key] = jsonObject[key];
    }
    return userObject as User;
  }

  constructor(
    private _id: string,
    private _fullname: string,
    private _email: string,
    private _password: string = "",
    private _messages: Array<Message> = []
  ) {}

  // Getters
  get id(): string {
    return this._id;
  }
  get fullname(): string {
    return this._fullname;
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }
  get messages(): Array<Message> {
    return this._messages as Array<Message>;
  }

  // Setters
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

  public messagesCount(): number {
    return this._messages.length;
  }
  public emailValid() {
    return !!this._email.match(
      /^([a-zA-Z0-9_\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/
    );
  }

  public passwordValid() {
    return this._password.length >= 4 && this._password.length <= 16;
  }

  public getRegisterDataFormat(): {
    fullname: string;
    email: string;
    password: string;
  } {
    return {
      fullname: this._fullname,
      email: this._email,
      password: this._password,
    };
  }

  public static isSame(user1: User, user2: User): boolean {
    if (JSON.stringify(user1) === JSON.stringify(user2)) {
      return true;
    }
    return false;
  }
}
