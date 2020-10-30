module.exports = function() {

  isEmpty = function(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  };

};
