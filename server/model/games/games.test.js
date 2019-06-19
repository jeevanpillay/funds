// imports
const expect = require("chai").expect;
const assert = require("chai").assert;
const mongoose = require("mongoose");

// model
const Games = require("./games");

// test
describe("Games schema", function () {
    describe("amount", () => {
        it("is invalid if empty", function (done) {
            var g = new Games();

            g.validate(function (err) {
                expect(err.errors.amount).to.exist;
                done();
            });
        });

        it("should be more than 0", function (done) {
            // test lower boundary
            var g = new Games({
                amount: -1
            });

            g.validate(function (err) {
                expect(err.errors.amount).to.exist;
            });

            // test
            var g = new Games({
                amount: 0
            });
            g.validate(function (err) {
                expect(err.errors.amount).to.exist;
            });

            // test upper boundary
            var g = new Games({
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
            var g = new Games();

            g.validate(function (err) {
                expect(err.errors.time).to.not.exist;
                done();
            });
        });

        it("must be equal to the current date", function (done) {
            var g = new Games();

            assert.equal(g.time.Date, Date.now().Date);
            done();
        });
    });

    describe("Bonus", function () {
        it("is valid if empty", function (done) {
            var g = new Games();

            g.validate(function (err) {
                expect(err.errors.bonus).to.not.exist;
                done();
            });
        });

        it("should be more than 0", function (done) {
            // test lower boundary
            var g = new Games({
                bonus: -1
            });

            g.validate(function (err) {
                expect(err.errors.bonus).to.exist;
            });

            // test
            var g = new Games({
                bonus: 0
            });
            g.validate(function (err) {
                expect(err.errors.bonus).to.not.exist;
            });

            // test upper boundary
            var g = new Games({
                bonus: 1
            });
            g.validate(function (err) {
                expect(err.errors.bonus).to.not.exist;
            });

            done();
        });

        it("should be able to have decimal values", function (done) {
            var g = new Games({
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
            var g = new Games();

            g.validate(function (err) {
                expect(err.errors.multiplier).to.exist;
                done();
            });
        });

        it("should be more than or equal to 0", function (done) {
            // test lower boundary
            var g = new Games({
                multiplier: -1
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.exist;
            });

            // test
            var g = new Games({
                multiplier: 0
            });
            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            // test upper boundary
            var g = new Games({
                multiplier: 1
            });
            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            done();
        });

        it("should be able to have decimal values", function (done) {
            var g = new Games({
                multiplier: 1.1
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
                done();
            });
        });

        it("should can have very large values", function (done) {
            var g = new Games({
                multiplier: 1000
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            var g = new Games({
                multiplier: 10000
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            var g = new Games({
                multiplier: 111.11
            });

            g.validate(function (err) {
                expect(err.errors.multiplier).to.not.exist;
            });

            done();
        });
    });

    describe("GamessHash", function () {
        it("is invalid if empty", function (done) {
            let g = new Games();

            g.validate(function (err) {
                expect(err.errors.hash).to.exist;
                done();
            });
        });

        it("is valid if type ObjectID is supplied", function (done) {
            let g = new Games({
                hash: new mongoose.Types.ObjectId
            });

            g.validate(function (err) {
                expect(err.errors.hash).to.not.exist;
                done();
            });
        });

        it("is invalid if type ObjectID is not supplied", function (done) {
            let g = new Games({
                hash: 1
            });

            g.validate(function (err) {
                expect(err.errors.hash).to.exist;
                done();
            });
        });
    });
});