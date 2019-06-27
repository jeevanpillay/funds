// imports
const expect = require("chai").expect;
const assert = require("chai").assert;

// model
const Deposit = require("./deposit");

// test
describe("Deposit schema", function() {
  describe("Amount", () => {
    it("is invalid if empty", function(done) {
      var d = new Deposit();

      d.validate(function(err) {
        expect(err.errors.amount).to.exist;
        done();
      });
    });

    it("cannot be 0", function(done) {
      var d = new Deposit({
        amount: 0
      });

      d.validate(function(err) {
        expect(err.errors.amount).to.exist;
        done();
      });
    });

    it("cannot be less than 0", function(done) {
      var d = new Deposit({
        amount: -1
      });

      d.validate(function(err) {
        expect(err.errors.amount).to.exist;
        done();
      });
    });

    it("must be more than 0", function(done) {
      var d = new Deposit({
        amount: 1
      });

      assert.equal(d.amount, 1);
      done();
    });

    it("can be an arbitrary number more than 0", function(done) {
      var d = new Deposit({
        amount: 1
      });
      assert.equal(d.amount, 1);

      var d = new Deposit({
        amount: 10
      });
      assert.equal(d.amount, 10);

      var d = new Deposit({
        amount: 10000
      });
      assert.equal(d.amount, 10000);

      done();
    });
  });

  describe("Confirmations", () => {
    // it("is valid if empty", function(done) {
    //   var d = new Deposit();

    //   d.validate(function(err) {
    //     expect(err.errors.confirmations).to.not.exist;
    //     done();
    //   });
    // });

    // it("cannot be less than 0", function(done) {
    //   var d = new Deposit({
    //     confirmations: -1
    //   });

    //   d.validate(function(err) {
    //     expect(err.errors.confirmations).to.exist;
    //     done();
    //   });
    // });

    // it("defaults to 0", function(done) {
    //   var d = new Deposit();

    //   assert.equal(d.confirmations, 0);
    //   done();
    // });

    // it("can be an arbitrary number more than and equal to 0", function(done) {
    //   var d = new Deposit({
    //     confirmations: 1
    //   });
    //   assert.equal(d.confirmations, 1);

    //   var d = new Deposit({
    //     confirmations: 10
    //   });
    //   assert.equal(d.confirmations, 10);

    //   var d = new Deposit({
    //     confirmations: 100
    //   });
    //   assert.equal(d.confirmations, 100);

    //   done();
    // });
  });

  describe("Time", () => {
    it("is valid if empty", function(done) {
      var d = new Deposit();

      d.validate(function(err) {
        expect(err.errors.time).to.not.exist;
        done();
      });
    });

    it("defaults current date", function(done) {
      var d = new Deposit();

      assert.equal(d.time.Date, Date.now().Date);
      done();
    });
  });

  describe("toAddress", () => {
    it("must be alphanumeric", function(done) {
      var d = new Deposit({
        toAddress: "0x123abc"
      });

      d.validate(function(err) {
        expect(err.errors.toAddress).to.not.exist;
        done();
      });
    });

    it("is invalid if empty", function(done) {
      var d = new Deposit();

      d.validate(function(err) {
        expect(err.errors.toAddress).to.exist;
        done();
      });
    });
  });
  describe("fromAddress", () => {
    it("must be alphanumeric", function(done) {
      var d = new Deposit({
        fromAddress: "0x123abc"
      });

      d.validate(function(err) {
        expect(err.errors.fromAddress).to.not.exist;
        done();
      });
    });

    it("is invalid if empty", function(done) {
      var d = new Deposit();

      d.validate(function(err) {
        expect(err.errors.fromAddress).to.exist;
        done();
      });
    });
  });
});
