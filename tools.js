module.exports = function() {
  this.isEmpty = function(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  };
};
