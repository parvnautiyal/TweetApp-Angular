import {FilterPipe} from './filter.pipe';
import {mockUser1, mockUserArray} from "../../../../mocks/mockUsers";

describe('FilterPipe', () => {

  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return default date on empty input', function () {
    expect(pipe.transform(mockUserArray, '', 'userName')).toBe(mockUserArray);
  });

  it('should return filtered data', function () {
    expect(pipe.transform(mockUserArray, mockUser1.userName, 'userName')).toEqual(Array.of(mockUser1));
  });
});
