const { required, tooShort, equality } = require("../../libs/errorsBuilder");

describe("#required", () => {
  describe("when value is undefined", () => {
    const errors = {};

    test("should add required error to the errors list object", () => {
      const response = required(errors, "username", undefined);

      expect(response).toMatchObject({
        username: {
          required: "username is required",
        },
      });
    });
  });

  describe("when have a related error", () => {
    const errors = { username: { toShort: "username too short" } };

    test("should add required error to the errors list object", () => {
      const response = required(errors, "username", undefined);

      expect(response).toMatchObject({
        username: {
          required: "username is required",
          toShort: "username too short",
        },
      });
    });
  });
});

describe("#tooShort", () => {
  describe("when value is undefined", () => {
    const errors = {};

    test("should add required error to the errors list object", () => {
      const response = tooShort(errors, "username", 'bla');

      expect(response).toMatchObject({
        username: {
          tooShort: "username is too short",
        },
      });
    });
  });

  describe("when have a related error", () => {
    const errors = { username: { required: "username is required" } };

    test("should add required error to the errors list object", () => {
      const response = tooShort(errors, "username", 'ble');

      expect(response).toMatchObject({
        username: {
          required: "username is required",
          tooShort: "username is too short",
        },
      });
    });
  });
});

describe("#equality", () => {
  describe("when passwords do not match", () => {
    const errors = {};

    test("should add equality error to the errors list object", () => {
      const response = equality(errors, "password", 'bla', 'ble');

      expect(response).toMatchObject({
        password: {
          equality: "password does not match your validation",
        },
      });
    });
  });

  describe("when have a related error", () => {
    const errors = { password: { required: "password is required" } };

    test("should add required error to the errors list object", () => {
      const response = equality(errors, "password", 'ble', 'blo');

      expect(response).toMatchObject({
        password: {
          required: "password is required",
          equality: "password does not match your validation",
        },
      });
    });
  });
});
