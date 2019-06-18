// imports
const expect = require("chai").expect;
const assert = require("chai").assert;
const mongoose = require("mongoose");

// model
const Game = require("./game");

// test
describe("Game schema", function () {
    describe("Bet", () => {
        it("is invalid if empty", function (done) {
            var g = new Game();

            g.validate(function (err) {
                expect(err.errors.bet).to.exist;
                done();
            });
        });

        it("should be more than 0", function (done) {
            // test lower boundary
            var g = new Game({
                bet: -1
            });

            g.validate(function (err) {
                expect(err.errors.bet).to.exist;
            });

            // test
            var g = new Game({
                bet: 0
            });
            g.validate(function (err) {
                expect(err.errors.bet).to.exist;
            });

            // test upper boundary
            var g = new Game({
                bet: 1
            });
            g.validate(function (err) {
                expect(err.errors.bet).to.not.exist;
            });

            done();
        });
    });

    describe("Time", () => {
        it("valid if empty", function (done) {
            var g = new Game();

            g.validate(function (err) {
                expect(err.errors.time).to.not.exist;
                done();
            });
        });

        it("must be equal to the current date", function (done) {
            var g = new Game();

            assert.equal(g.time.Date, Date.now().Date);
            done();
        });
    });

    describe("Bonus", function () {
        it("is valid if empty", function (done) {
            var g = new Game();

            g.validate(function (err) {
                expect(err.errors.bonus).to.not.exist;
                done();
            });
        });

        it("should be more than 0", function (done) {
            // test lower boundary
            var g = new Game({
                bonus: -1
            });

            g.validate(function (err) {
                expect(err.errors.bonus).to.exist;
            });

            // test
            var g = new Game({
                bonus: 0
            });
            g.validate(function (err) {
                expect(err.errors.bonus).to.not.exist;
            });

            // test upper boundary
            var g = new Game({
                bonus: 1
            });
            g.validate(function (err) {
                expect(err.errors.bonus).to.not.exist;
            });

            done();
        });

        it("should be able to have decimal values", function (done) {
            var g = new Game({
                bonus: 1.1
            });

            g.validate(function (err) {
                expect(err.errors.bonus).to.not.exist;
                done();
            });
        });
    });

    describe("Multiplier", function () {
        it("is invalid if empty", function (done) {
            var g = new Game();

            g.validate(function (err) {
                expect(err.errors.multiplier).to.exist;
                done();
            });
        });

        it("should be more than or equal to 0", function (done) {
            // test lower boundary
            var g = new Game({
                multiplier: -1
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.exist;
            });

            // test
            var g = new Game({
                multiplier: 0
            });
            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            // test upper boundary
            var g = new Game({
                multiplier: 1
            });
            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            done();
        });

        it("should be able to have decimal values", function (done) {
            var g = new Game({
                multiplier: 1.1
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
                done();
            });
        });

        it("should can have very large values", function (done) {
            var g = new Game({
                multiplier: 1000
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            var g = new Game({
                multiplier: 10000
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            var g = new Game({
                multiplier: 111.11
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            done();
        });
    });

    describe("GamesHash", function () {
        it("is invalid if empty", function (done) {
            let g = new Game();

            g.validate(function (err) {
                expect(err.errors.hash).to.exist;
                done();
            });
        });

        it("is valid if type ObjectID is supplied", function (done) {
            let g = new Game({
                hash: new mongoose.Types.ObjectId
            });

            g.validate(function (err) {
                expect(err.errors.hash).to.not.exist;
                done();
            });
        });

        it("is invalid if type ObjectID is not supplied", function (done) {
            let g = new Game({
                hash: 1
            });

            g.validate(function (err) {
                expect(err.errors.hash).to.exist;
                done();
            });
        });
    });
});