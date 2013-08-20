var statusService = function () {
  var statusFunctions = {
    application: function () {
      return [
        {
          name: "Application",
          properties: {
            appVersion: '0.0.1',
            commitHash: 'f959331'
          }
        }
      ];
    },
    health: function() {
      return [
        {
          name: "Health",
          properties: {
            up: 'OK'
          }
        }
      ];
    }
  }

  var service = {
    getStatus: function (section) {
      var status = [];
      if (section) {
        status = statusFunctions[section] ? statusFunctions[section].apply() : [{name: 'Unknown section'}];
      } else {
        for (var section in statusFunctions) {
          if (statusFunctions.hasOwnProperty(section)) {
            status  = status.concat(statusFunctions[section].apply())
          }
        }
      }

      return status;
    }
  };

  return service;
}

module.exports = statusService()