// imports
const expect = require("chai").expect;
const assert = require("chai").assert;

// model
const Token = require("./token");

// test
describe("The Token schema attribute", function() {
  describe("Address (id)", () => {
    it("is invalid if empty", function(done) {
      var t = new Token();

      t.validate(function(err) {
        expect(err.errors._id).to.exist;
        done();
      });
    });

    it("must be alphanumeric", function(done) {
      var t = new Token({
        address: "0x123abc"
      });

      t.validate(function(err) {
        expect(err.errors.address).to.not.exist;
        done();
      });
    });
  });

  describe("Name", () => {
    it("is valid if empty", function(done) {
      var t = new Token();

      t.validate(function(err) {
        expect(err.errors.name).to.not.exist;
        done();
      });
    });

    it("defaults to VET if empty", function(done) {
      var t = new Token();
      assert.equal(t.name, "VET");
      done();
    });

    it("can only contain the recommended Token names (under enums)", function(done) {
      var t = new Token({
        name: "VET"
      });

      var t1 = new Token({
        name: "OCE"
      });

      var t2 = new Token({
        name: "PLA"
      });

      var t3 = new Token({
        name: "SHA"
      });

      assert.equal(t.name, "VET");
      assert.equal(t1.name, "OCE");
      assert.equal(t2.name, "PLA");
      assert.equal(t3.name, "SHA");
      done();
    });

    it("cannot contain invalid token names (under enums)", function(done) {
      var t = new Token({
        name: "ECH"
      });

      t.validate(function(err) {
        expect(err.errors.name).to.exist;
        done();
      });
    });
  });


  it("cannot be shorter than 3 characters", function(done) {
    var t = new Token({
      name: "EC"
    });

    t.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  describe("Private Key", () => {
    it("is invalid if empty", function(done) {
      var t = new Token();

      t.validate(function(err) {
        expect(err.errors.privateKey).to.exist;
        done();
      });
    });

    it("must be alphanumeric", function(done) {
      var t = new Token({
        privateKey: "0x123abc"
      });

      t.validate(function(err) {
        expect(err.errors.privateKey).to.not.exist;
        done();
      });
    });
  });
  describe("Balance", () => {
    it("is valid if empty", function(done) {
      var t = new Token();

      t.validate(function(err) {
        expect(err.errors.balance).to.not.exist;
        done();
      });
    });


  it("should be more than 0", function(done) {
    // test lower boundary
    var t = new Token({
      balance: -1
    });

    t.validate(function(err) {
      expect(err.errors.balance).to.exist;
    });

    // test
    var t = new Token({
      balance: 0
    });
    t.validate(function(err) {
      expect(err.errors.balance).to.not.exist;
    });

    // test upper boundary
    var t = new Token({
      balance: 1
    });
    t.validate(function(err) {
      expect(err.errors.balance).to.not.exist;
    });

    done();
  });
  });


});
