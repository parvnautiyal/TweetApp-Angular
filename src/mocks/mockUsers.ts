import {User} from "../app/shared/models/user/user";

const mockUser1: User = {
  userName: 'user1',
  firstName: 'fname1',
  lastName: 'lname1',
  email: 'test1@mail.com',
  password: 'password1',
  gender: 'male',
  dob: '2022-08-22'
};

const mockUser2: User = {
  userName: 'user2',
  firstName: 'fname2',
  lastName: 'lname2',
  email: 'test2@mail.com',
  password: 'password2',
  gender: 'female',
  dob: '2022-06-12'
};

const mockUser3: User = {
  userName: 'user3',
  firstName: 'fname3',
  lastName: 'lname3',
  email: 'test3@mail.com',
  password: 'password3',
  gender: 'other',
  dob: '2022-02-19'
};

const mockUserArray: User[] = [mockUser1, mockUser2, mockUser3];

export {mockUser1, mockUser2, mockUser3, mockUserArray};
