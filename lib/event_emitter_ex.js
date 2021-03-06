var Objex = require('objex'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,

    /**
     * @constructor
     * @class EventEmitterEx
     * @augments EventEmitter
     * @augments Objex
     */
    EventEmitterEx = Objex.wrap(EventEmitter).create();

function inspect(val) {
    return util.inspect(val, { depth : 1 }).replace(/^\s+/mg, ' ').replace(/\n/g, '');
}

// add 'luster:eex' to the `NODE_DEBUG` environment variable to enable events logging
if (process.env.NODE_DEBUG && /luster:eex/i.test(process.env.NODE_DEBUG)) {
    EventEmitterEx.prototype.emit = function() {
        var iid = this.wid || this.id;
        var args = Array.prototype
                .slice.call(arguments, 0)
                .map(inspect);

        iid = typeof iid === 'undefined' ? '' : '(' + iid + ')';

        console.log('%s%s.emit(%s)', this.constructor.name || 'EventEmitterEx', iid, args.join(', '));

        return EventEmitterEx.__super.prototype.emit.apply(this, arguments);
    };
}

module.exports = EventEmitterEx;