import {Tweet} from "../app/shared/models/tweet/tweet";

const mockTweet1: Tweet = {
  id: 'tweet1',
  username: 'username1',
  content: 'content1',
  tag: 'tag1',
  created: new Date("2022-08-02"),
  likes: null,
  replies: null,
  liked: null,
  replyTyping: ''
};

const mockTweet2: Tweet = {
  id: 'tweet2',
  username: 'username2',
  content: 'content2',
  tag: 'tag2',
  created: new Date("2022-07-12"),
  likes: new Map([
    ['user1', 'tweet2'],
    ['user3', 'tweet2'],
  ]),
  replies: Array.of(new Object({username: "user", tweetId: "tweet", replyContent: "reply"})),
  liked: null,
  replyTyping: ''
};

const mockTweet3: Tweet = {
  id: 'tweet3',
  username: 'username3',
  content: 'content3',
  tag: 'tag3',
  created: new Date("2022-01-30"),
  likes: null,
  replies: null,
  liked: null,
  replyTyping: ''
};

const mockTweetArray: Tweet[] = [mockTweet1, mockTweet2, mockTweet3];

export {mockTweet1, mockTweet2, mockTweet3, mockTweetArray};
