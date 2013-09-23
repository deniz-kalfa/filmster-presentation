var config = compound.app.get('config'),
    configOriginal = compound.app.get('configOriginal');

if(!configOriginal) {
  configOriginal = JSON.parse(JSON.stringify(config));
  compound.app.set('configOriginal', configOriginal);
}

var application = {
  reset: function() {
    compound.app.set('config', JSON.parse(JSON.stringify(configOriginal)));
    send(compound.app.get('config'));
  },
  statusPost: function() {
    for (var key in req.body) {
      config[key] = req.body[key];
    }
    compound.app.set('config', JSON.parse(JSON.stringify(config)));
    send(compound.app.get('config'));
  }
};

action('reset', application.reset);
action('statusPost', application.statusPost);