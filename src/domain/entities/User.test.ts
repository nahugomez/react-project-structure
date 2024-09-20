import { User } from './User';

describe('User', () => {
  it('should create a new instance', () => {
    const user = new User({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john.doe@example.com');
  });
});
