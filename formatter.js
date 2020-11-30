/*jshint esversion: 6 */

module.exports = function() {

  String.prototype.startsWithCommand = function(command) {
    return this.startsWith(`${command.toTrigger()} `);
  };

  String.prototype.isCommand = function(command) {
    return this == command.toTrigger();
  };

  String.prototype.toMessageCleanWith = function(command) {
    let msgClean = this.replace(`${command.toTrigger()} `, '');
    // People mentioned with a nickname have ! before their user id. We don't need that.
    msgClean = msgClean.replace(/<@!/g, '<@');
    return msgClean;
  };

  String.prototype.toTrigger = function() {
    return require('./config.json').trigger.prefix + this;
  };

};
