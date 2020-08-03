const { validateCreateUser } = require("../../../entities/users/user.validations");

describe("#isValidCreateUser", () => {
  describe("when all required parameters are present", () => {
    const userParameters = {
      username: 'Papscript',
      password: '123456',
      passwordConfirmantion: '123456',
      createdAt: new Date()
    };

    test("should add required error to the errors list object", () => {
      const response = validateCreateUser(userParameters);

      expect(response).toMatchObject({ errors: null, parameters: userParameters});
    });
  });

  describe('when parameters not present', () => {
    const userParameters = {}

    test('should return expected errors object', () => {
      const response = validateCreateUser(userParameters);

      const expectedErrors = {
        username: { required: 'username is required' },
        password: { required: 'password is required' },
        createdAt: { required: 'createdAt is required' }
      }

      expect(response).toMatchObject({ errors: expectedErrors, parameters: null });
    })
  })

});