// imports
const expect = require("chai").expect;
const assert = require("chai").assert;
const mongoose = require("mongoose");

// model
const GamesHash = require("./gameshash");

// test
describe("GamesHash schema", function () {
    describe("Hash", function () {
        it("is invalid if empty", function (done) {
            var gh = new GamesHash();

            gh.validate(function (err) {
                expect(err.errors.hash).to.exist;
                done();
            });
        });
        
        it("is of type String", function (done) {
            var gh = new GamesHash({
                hash: "StringTest"
            });

            gh.validate(function (err) {
                expect(err.errors.hash).to.not.exist;
                done();
            });
        });
    });

    describe("Crash", function () {
        it("is invalid if empty", function (done) {
            var gh = new GamesHash();

            gh.validate(function (err) {
                expect(err.errors.crash).to.exist;
                done();
            });
        })

        it("is more than or equal to 0", function (done) {
            var gh = new GamesHash({
                crash: 0
            });

            gh.validate(function (err) {
                expect(err.errors.crash).to.not.exist;
            });

            var gh = new GamesHash({
                crash: -0.0001
            });

            gh.validate(function (err) {
                expect(err.errors.crash).to.exist;
            });

            var gh = new GamesHash({
                crash: 0.0000001
            });

            gh.validate(function (err) {
                expect(err.errors.crash).to.not.exist;
            });

            done();
        })
    });

    describe("Games", function () {
        it("is invalid if empty", function (done) {
            let gh = new GamesHash();

            gh.validate(function (err) {
                expect(err.errors.games).to.not.exist;
                done();
            });
        });

        it("is an empty array", function (done) {
            let gh = new GamesHash();

            assert(gh.games, []);
            done();
        });

        it("can add an ObjectID", function (done) {
            let gh = new GamesHash();
            let objectid = new mongoose.Types.ObjectId;
            gh.games.push(objectid);
            assert(gh.games, [objectid]);
            done();
        });

        it("can add multiple ObjectID's", function (done) {
            let gh = new GamesHash();
            let objectid = new mongoose.Types.ObjectId;
            let objectid2 = new mongoose.Types.ObjectId;
            gh.games.push(objectid);
            gh.games.push(objectid2);
            assert(gh.games, [objectid,objectid2]);
            done();
        });

        it("array items of type ObjectID's", function (done) {
            let gh = new GamesHash();
            let objectid = new mongoose.Types.ObjectId;
            gh.games.push(objectid);
            assert(typeof gh.games[0], typeof objectid);
            done();
        });
    });
});