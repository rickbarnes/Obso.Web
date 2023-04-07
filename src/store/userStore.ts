import { User } from "./../interfaces/user";
import { action, makeObservable, observable } from "mobx";

export default class UserStore {
  user = {} as User;
  loggedIn = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      loggedIn: observable,
      logOut: action,
      setUser: action,
    });
  }

  setUser = (user: any) => {
    this.user = user;
    localStorage.setItem("user", user);
    this.loggedIn = true;
  };

  logOut = () => {
    this.user = {} as User;
    localStorage.removeItem("user");
    this.loggedIn = false;
  };
}
