var async = require('async');
var lib = require('./lib');
var _ = require('lodash');

var offset = 1e6;

var games = 1e2; // You might want to make this 10M for a prod setting..
var game = games;
var serverSeed = '1233naprbrGHPURBWPYBYW8BVY48BVWIY4BG4VYB44U';

module.exports = async function loop(cb) {
    var parallel = Math.min(game, 10000);
    var games123 = [];
    var inserts = _.range(parallel).map(function () {
        return function (cb) {
            serverSeed = lib.genGameHash(serverSeed);
            game--;
            games123.push([offset + game, serverSeed]);
            console.log(game);
            cb();
        };
    });
    

    async.parallel(inserts, function (err) {
        if (err) throw err;

        // Clear the current line and move to the beginning.
        var pct = 100 * (games - game) / games;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(
            "Processed: " + (games - game) + ' / ' + games +
            ' (' + pct.toFixed(2) + '%)');
        if (game > 0)
            loop(cb);
        else {
            console.log(' Done');
            cb();
        }
    });
};