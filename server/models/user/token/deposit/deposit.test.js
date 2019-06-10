// imports
const expect = require("chai").expect;
const assert = require("chai").assert;

// model
const Deposit = require("./deposit");

// test
describe("The Deposit schema attribute", function() {
  it("amount is invalid if empty", function(done) {
    var d = new Deposit();

    d.validate(function(err) {
      expect(err.errors.amount).to.exist;
      done();
    });
  });

  it("confirmations is valid if empty", function(done) {
    var d = new Deposit();

    d.validate(function(err) {
      expect(err.errors.confirmations).to.not.exist;
      done();
    });
  });

  it("time is valid if empty", function(done) {
    var d = new Deposit();

    d.validate(function(err) {
      expect(err.errors.time).to.not.exist;
      done();
    });
  });

  it("amount cannot be 0", function(done) {
    var d = new Deposit({
      amount: 0
    });

    d.validate(function(err) {
        expect(err.errors.amount).to.exist;
        done();
    })
  });

  it("amount cannot be less than 0", function(done) {
    var d = new Deposit({
      amount: -1
    });

    d.validate(function(err) {
        expect(err.errors.amount).to.exist;
        done();
    })
  });

  it("amount must be more than 0", function(done) {
    var d = new Deposit({
      amount: 1
    });

    assert.equal(d.amount, 1);
    done();
  });

  it("amount can be an arbitrary number more than 0", function(done) {
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

  it("confirmations cannot be less than 0", function(done) {
    var d = new Deposit({
      confirmations: -1
    });

    d.validate(function(err) {
        expect(err.errors.confirmations).to.exist;
        done();
    })
  });

  it("confirmations defaults to 0", function(done) {
    var d = new Deposit();

    assert.equal(d.confirmations, 0);
    done();
  });

  it("confirmations can be an arbitrary number more than and equal to 0", function(done) {
    var d = new Deposit({
        confirmations: 1
    });
    assert.equal(d.confirmations, 1);

    var d = new Deposit({
        confirmations: 10
    });
    assert.equal(d.confirmations, 10);

    var d = new Deposit({
        confirmations: 100
    });
    assert.equal(d.confirmations, 100);

    done();
  });

  it("time defaults current date", function(done) {
    var d = new Deposit();

    assert.equal(d.time.Date, Date.now().Date);
    done();
  });
});
