export class User {
  constructor(
    private email: string,
    private token: string,
    private localId: string,
    private expirationDate: Date
  ) {}

  get token1() {
    if (!this.expirationDate || new Date() > this.expirationDate) {
      return null;
    } else {
      return this.token;
    }
  }
}
