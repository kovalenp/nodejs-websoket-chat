const { generateMessage } = require('../server/utils/message')

describe('message generator unit tests', () => {
  test('generateMessage() should generate correct message object', () => {
    const message = generateMessage('unitTest', 'Test has passed!')
    expect(message.from).toEqual('unitTest');
    expect(message.text).toEqual('Test has passed!');
    expect(typeof message.createdAt).toBe('number');
  });
});
