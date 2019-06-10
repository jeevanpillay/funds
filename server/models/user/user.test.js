// imports
const expect = require("chai").expect;
const assert = require("chai").assert;

// model
const User = require("./user");

// test
describe("The User schema should be ", function() {
  it("invalid if username is empty", function(done) {
    var u = new User();

    u.validate(function(err) {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it("invalid if password is empty", function(done) {
    var u = new User();

    u.validate(function(err) {
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it("invalid if email is empty", function(done) {
    var u = new User();

    u.validate(function(err) {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it("valid if joinDate is empty", function(done) {
    var u = new User();

    u.validate(function(err) {
      expect(err.errors.joinDate).to.not.exist;
      done();
    });
  });


  it("password cannot be shorter than 6 characters", function(done) {
    var u = new User({
      password: "Doe"
    });

    u.validate(function(err) {
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it("password must be longer than 4 characters and shorter than 50 characters", function(done) {
    var u = new User({
      password: "Jackson"
    });

    u.validate(function(err) {
      expect(err.errors.password).to.not.exist;
      done();
    });
  });

  it("password cannot be longer than 50 characters", function(done) {
    var u = new User({
        password: "JacksonJacksonJacksonJacksonJacksonJacksonJacksonJackson"
    });

    u.validate(function(err) {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it("joinDate must be equal to the current date", function(done) {
    var u = new User();

    assert.equal(u.joinDate.Date, Date.now().Date);
    done();
  });

  it("username cannot be shorter than 4 characters", function(done) {
    var u = new User({
      username: "Doe"
    });

    u.validate(function(err) {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it("username must be longer than 4 characters and shorter than 15 characters", function(done) {
    var u = new User({
      username: "Jackson"
    });

    u.validate(function(err) {
      expect(err.errors.username).to.not.exist;
      done();
    });
  });

  it("username cannot be longer than 15 characters", function(done) {
    var u = new User({
      username: "JacksonJacksonJackson"
    });

    u.validate(function(err) {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it("username cannot have whitespace", function(done) {
    var u = new User({
      username: "Jackson 123"
    });

    u.validate(function(err) {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it("username cannot have special characters", function(done) {
    var u = new User({
      username: "Jackson$$"
    });

    u.validate(function(err) {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it("username doesn't have trailing whitespaces", function(done) {
    var u = new User({
      username: "Jackson  "
    });

    assert.equal(u.username, "Jackson");
    done();
  });

  it("email must fails if not in default email format", function(done) {
    var u = new User({
        email: "Jack"
    });

    u.validate(function(err) {
        expect(err.errors.email).to.exist;
        done();
    })
});

it("email must pass if in default email format", function(done) {
    var u = new User({
        email: "jack@example.com"
    });

    u.validate(function(err) {
        expect(err.errors.email).to.not.exist;
        done();
    })
});
});

