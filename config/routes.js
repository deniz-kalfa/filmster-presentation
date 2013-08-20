exports.routes = function (map) {

  map.get('/', 'homepage#show');

  // Partials
  map.get('partials/:partial', 'partials#show');

  // Admin
  map.get('admin*', 'admin#index');
  map.resources('status', { path: 'api/1/status' });

  // Fixtures
  map.get('admin/fixture/reset', 'fixture#reset');
  map.post('admin/fixture/status', 'fixture#statusPost');
};
