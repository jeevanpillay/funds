// imports
const expect = require("chai").expect;
const assert = require("chai").assert;

// model
const Withdrawal = require("./withdrawal");

// test
describe("Withdrawal schema", function() {
  describe("Amount", () => {
    it("is invalid if empty", function(done) {
      var w = new Withdrawal();

      w.validate(function(err) {
        expect(err.errors.amount).to.exist;
        done();
      });
    });

    it("cannot be 0", function(done) {
      var w = new Withdrawal({
        amount: 0
      });

      w.validate(function(err) {
        expect(err.errors.amount).to.exist;
        done();
      });
    });
    it("cannot be less than 0", function(done) {
      var w = new Withdrawal({
        amount: -1
      });

      w.validate(function(err) {
        expect(err.errors.amount).to.exist;
        done();
      });
    });

    it("must be more than 0", function(done) {
      var w = new Withdrawal({
        amount: 1
      });

      assert.equal(w.amount, 1);
      done();
    });

    it("can be an arbitrary number more than 0", function(done) {
      var w = new Withdrawal({
        amount: 1
      });
      assert.equal(w.amount, 1);

      var w = new Withdrawal({
        amount: 10
      });
      assert.equal(w.amount, 10);

      var w = new Withdrawal({
        amount: 10000
      });
      assert.equal(w.amount, 10000);

      done();
    });
  });
  describe("Time", () => {
    it("is valid if empty", function(done) {
      var w = new Withdrawal();

      w.validate(function(err) {
        expect(err.errors.time).to.not.exist;
        done();
      });
    });

    it("defaults current date", function(done) {
      var w = new Withdrawal();

      assert.equal(w.time.Date, Date.now().Date);
      done();
    });
  });
  describe("Confirmation", () => {
    it("is valid if empty", function(done) {
      var w = new Withdrawal();

      w.validate(function(err) {
        expect(err.errors.confirmations).to.not.exist;
        done();
      });
    });

    it("cannot be less than 0", function(done) {
      var w = new Withdrawal({
        confirmations: -1
      });

      w.validate(function(err) {
        expect(err.errors.confirmations).to.exist;
        done();
      });
    });

    it("defaults to 0", function(done) {
      var w = new Withdrawal();

      assert.equal(w.confirmations, 0);
      done();
    });

    it("can be an arbitrary number more than and equal to 0", function(done) {
      var w = new Withdrawal({
        confirmations: 1
      });
      assert.equal(w.confirmations, 1);

      var w = new Withdrawal({
        confirmations: 10
      });
      assert.equal(w.confirmations, 10);

      var w = new Withdrawal({
        confirmations: 100
      });
      assert.equal(w.confirmations, 100);

      done();
    });
  });
  describe("Address", () => {
    it("must be alphanumeric", function(done) {
      var w = new Withdrawal({
        address: "0x123abc"
      });

      w.validate(function(err) {
        expect(err.errors.address).to.not.exist;
        done();
      });
    });

    it("is invalid if empty", function(done) {
      var w = new Withdrawal();

      w.validate(function(err) {
        expect(err.errors.address).to.exist;
        done();
      });
    });
  });
});
