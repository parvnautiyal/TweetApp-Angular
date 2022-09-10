import {User} from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User("user1", "test", "user", "test@email.com", "password", "male", "2022-08-22")).toBeTruthy();
  });
});
