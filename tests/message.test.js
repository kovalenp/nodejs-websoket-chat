const { generateMessage, generateLocationMessage } = require('../server/utils/message');

describe('message generator unit tests', () => {
  test('generateMessage() should generate correct message object', () => {
    const message = generateMessage('unitTest', 'Test has passed!');
    expect(message.from).toEqual('unitTest');
    expect(message.text).toEqual('Test has passed!');
    expect(typeof message.createdAt).toBe('number');
  });
  test('generateLocationMessage() should generate correct message object', () => {
    const testLocation = { latitude: 1, longitude: -1 };
    const message = generateLocationMessage('unitTest', testLocation);
    expect(message.from).toEqual('unitTest');
    expect(message.url).toEqual('https://maps.google.com/maps?q=1,-1');
    expect(typeof message.createdAt).toBe('number');
  });
});
