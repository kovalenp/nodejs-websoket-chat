const { Users } = require('../server/utils/users');

describe('Users storage unit test', () => {
  

  test('addUser() adds new user', () => {
    const users = new Users();
    const addedUser = users.addUser({id: 'a1', name: 'Foo', room: 'Bar'});
    expect(users.users).toEqual([addedUser]);
  });

  test('removeUser() removes existing user', () => {
    const users = new Users();
    const testUser = {id: 'a2', name: 'Foo', room: 'Bar'}
    users.users = [testUser];
    const removedUser = users.removeUser('a2')
    expect(users.users).toHaveLength(0);
    expect(removedUser).toEqual(testUser);
  });

  test('removeUser() returns undefined for non-existing userId', () => {
    const users = new Users();
    const testUser = {id: 'a2', name: 'Foo', room: 'Bar'}
    users.users = [testUser];
    const removedUser = users.removeUser('no-such-id')
    expect(users.users).toHaveLength(1);
    expect(removedUser).toEqual(undefined);
  });

  test('getUser() returns existing userId', () => {
    const users = new Users();
    const testUser = {id: 'a3', name: 'Foo', room: 'Bar'}
    users.users = [testUser];
    const gotUser = users.getUser('a3')
    expect(users.users).toHaveLength(1);
    expect(gotUser).toEqual(testUser);
  });

  test('getUser() returns undefined for non-existing userId', () => {
    const users = new Users();
    const testUser = {id: 'a3', name: 'Foo', room: 'Bar'}
    users.users = [testUser];
    const gotUser = users.getUser('no-such-id')
    expect(users.users).toHaveLength(1);
    expect(gotUser).toEqual(undefined);
  });

  test('getUserList() returns array of user names in the room', () => {
    const users = new Users();
    users.users = [{id: 'b1', name: 'Foo1', room: 'Bar'}, {id: 'b2', name: 'Foo2', room: 'Bar'}, {id: 'b3', name: 'Foo3', room: 'Bar'}];
    const userlist = users.getUserList('Bar');
    expect(users.users).toHaveLength(3);
    expect(userlist).toEqual(['Foo1','Foo2','Foo3']);
  });

  test('getUserList() returns empty array if there are no users in the room', () => {
    const users = new Users();
    users.users = [{id: 'b1', name: 'Foo1', room: 'Bar'}, {id: 'b2', name: 'Foo2', room: 'Bar'}, {id: 'b3', name: 'Foo3', room: 'Bar'}];
    const userlist = users.getUserList('non-existing');
    expect(users.users).toHaveLength(3);
    expect(userlist).toEqual([]);
  });
});
