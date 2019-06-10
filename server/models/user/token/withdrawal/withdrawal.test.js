// imports
const expect = require("chai").expect;
const assert = require("chai").assert;

// model
const Withdrawal = require("./withdrawal");

// test
describe("The Withdrawal schema attribute", function() {
  it("amount is invalid if empty", function(done) {
    var w = new Withdrawal();

    w.validate(function(err) {
      expect(err.errors.amount).to.exist;
      done();
    });
  });

  it("confirmations is valid if empty", function(done) {
    var w = new Withdrawal();

    w.validate(function(err) {
      expect(err.errors.confirmations).to.not.exist;
      done();
    });
  });

  it("time is valid if empty", function(done) {
    var w = new Withdrawal();

    w.validate(function(err) {
      expect(err.errors.time).to.not.exist;
      done();
    });
  });

  it("amount cannot be 0", function(done) {
    var w = new Withdrawal({
      amount: 0
    });

    w.validate(function(err) {
        expect(err.errors.amount).to.exist;
        done();
    })
  });

  it("amount cannot be less than 0", function(done) {
    var w = new Withdrawal({
      amount: -1
    });

    w.validate(function(err) {
        expect(err.errors.amount).to.exist;
        done();
    })
  });

  it("amount must be more than 0", function(done) {
    var w = new Withdrawal({
      amount: 1
    });

    assert.equal(w.amount, 1);
    done();
  });

  it("amount can be an arbitrary number more than 0", function(done) {
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

  it("confirmations cannot be less than 0", function(done) {
    var w = new Withdrawal({
      confirmations: -1
    });

    w.validate(function(err) {
        expect(err.errors.confirmations).to.exist;
        done();
    })
  });

  it("confirmations defaults to 0", function(done) {
    var w = new Withdrawal();

    assert.equal(w.confirmations, 0);
    done();
  });

  it("confirmations can be an arbitrary number more than and equal to 0", function(done) {
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

  it("time defaults current date", function(done) {
    var w = new Withdrawal();

    assert.equal(w.time.Date, Date.now().Date);
    done();
  });

  it("address must be alphanumeric", function(done) {
    var w = new Withdrawal({
      address: "0x123abc"
    });

    w.validate(function(err) {
      expect(err.errors.address).to.not.exist;
      done();
    });
  });

  it("address must be uppercase", function(done) {
    var w = new Withdrawal({
      address: "0x123abc"
    });

    assert.equal(w.address, "0X123ABC");
    done();
  });

  it("address is invalid if empty", function(done) {
    var w = new Withdrawal();

    w.validate(function(err) {
      expect(err.errors.address).to.exist;
      done();
    });
  });
});
