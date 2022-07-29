export default function setupCustomRoutes(router) {
  // Define your own custom routes here, just as you would in router.js but using 'router' instead of 'this'.
  // For example:
  // router.route('yourroute');

  router.route('inspiration');
  router.route('keypix', { path: '/keys' });
  router.route('keysmagic-magic', { path: '/magic' });
  router.route('keysmagic-spell-list', { path: '/spells' });
  router.route('keysmagic-spell', { path: '/spell/:name' });
  router.route('census-birthday');
}
