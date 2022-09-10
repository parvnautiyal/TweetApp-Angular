import {Tweet} from './tweet';

describe('Tweet', () => {
  it('should create an instance', () => {
    expect(new Tweet("tweet1", "user1", "this is a tweet","tag", new Date("2022-08-02"), null, null)).toBeTruthy();
  });
});
