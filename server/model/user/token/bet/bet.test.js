// imports
const expect = require("chai").expect;
const assert = require("chai").assert;
const mongoose = require("mongoose");

// model
const Bet = require("./bet");

// test
describe("Bet schema", function () {
    describe("amount", () => {
        it("is invalid if empty", function (done) {
            var g = new Bet();

            g.validate(function (err) {
                expect(err.errors.amount).to.exist;
                done();
            });
        });

        it("should be more than 0", function (done) {
            // test lower boundary
            var g = new Bet({
                amount: -1
            });

            g.validate(function (err) {
                expect(err.errors.amount).to.exist;
            });

            // test
            var g = new Bet({
                amount: 0
            });
            g.validate(function (err) {
                expect(err.errors.amount).to.exist;
            });

            // test upper boundary
            var g = new Bet({
                amount: 1
            });
            g.validate(function (err) {
                expect(err.errors.amount).to.not.exist;
            });

            done();
        });
    });

    describe("Time", () => {
        it("valid if empty", function (done) {
            var g = new Bet();

            g.validate(function (err) {
                expect(err.errors.time).to.not.exist;
                done();
            });
        });

        it("must be equal to the current date", function (done) {
            var g = new Bet();

            assert.equal(g.time.Date, Date.now().Date);
            done();
        });
    });
    
    describe("Multiplier", function () {
        it("is invalid if empty", function (done) {
            var g = new Bet();

            g.validate(function (err) {
                expect(err.errors.multiplier).to.exist;
                done();
            });
        });

        it("should be more than or equal to 0", function (done) {
            // test lower boundary
            var g = new Bet({
                multiplier: -1
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.exist;
            });

            // test
            var g = new Bet({
                multiplier: 0
            });
            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            // test upper boundary
            var g = new Bet({
                multiplier: 1
            });
            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            done();
        });

        it("should be able to have decimal values", function (done) {
            var g = new Bet({
                multiplier: 1.1
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
                done();
            });
        });

        it("should can have very large values", function (done) {
            var g = new Bet({
                multiplier: 1000
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            var g = new Bet({
                multiplier: 10000
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            var g = new Bet({
                multiplier: 111.11
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            done();
        });
    });

    describe("BetsHash", function () {
        it("is invalid if empty", function (done) {
            let g = new Bet();

            g.validate(function (err) {
                expect(err.errors.hash).to.exist;
                done();
            });
        });

        it("is valid if type ObjectID is supplied", function (done) {
            let g = new Bet({
                hash: new mongoose.Types.ObjectId
            });

            g.validate(function (err) {
                expect(err.errors.hash).to.not.exist;
                done();
            });
        });

        it("is invalid if type ObjectID is not supplied", function (done) {
            let g = new Bet({
                hash: 1
            });

            g.validate(function (err) {
                expect(err.errors.hash).to.exist;
                done();
            });
        });
    });
});