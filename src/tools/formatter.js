/*jshint esversion: 6 */

module.exports = function() {

  String.prototype.startsWithCommand = function(command) {
    return this.startsWith(`${command.toTrigger()} `);
  };

  String.prototype.isCommand = function(command) {
    return this == command.toTrigger();
  };

  String.prototype.toMessageCleanWith = function(command) {
    return this.replace(`${command.toTrigger()} `, '');;
  };

  String.prototype.toTrigger = function() {
    return require('../config/config.json').trigger.prefix + this;
  };

};
