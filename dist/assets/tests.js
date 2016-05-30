define('engines-testapp/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - app.js', function () {
    it('should pass jshint', function () {
      expect(false, 'app.js should pass jshint.\napp.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 4, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 6, col 1, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\napp.js: line 13, col 3, \'object short notation\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\napp.js: line 29, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n7 errors').to.be.ok;
    });
  });
});
define('engines-testapp/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('engines-testapp/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - helpers/destroy-app.js', function () {
    it('should pass jshint', function () {
      expect(false, 'helpers/destroy-app.js should pass jshint.\nhelpers/destroy-app.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/destroy-app.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors').to.be.ok;
    });
  });
});
define('engines-testapp/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'engines-testapp/tests/helpers/start-app', 'engines-testapp/tests/helpers/destroy-app'], function (exports, _qunit, _enginesTestappTestsHelpersStartApp, _enginesTestappTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _enginesTestappTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _enginesTestappTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('engines-testapp/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - helpers/module-for-acceptance.js', function () {
    it('should pass jshint', function () {
      expect(false, 'helpers/module-for-acceptance.js should pass jshint.\nhelpers/module-for-acceptance.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/module-for-acceptance.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/module-for-acceptance.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/module-for-acceptance.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/module-for-acceptance.js: line 5, col 39, \'default parameters\' is only available in ES6 (use \'esversion: 6\').\nhelpers/module-for-acceptance.js: line 7, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nhelpers/module-for-acceptance.js: line 15, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n7 errors').to.be.ok;
    });
  });
});
define('engines-testapp/tests/helpers/resolver', ['exports', 'ember/resolver', 'engines-testapp/config/environment'], function (exports, _emberResolver, _enginesTestappConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _enginesTestappConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _enginesTestappConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('engines-testapp/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - helpers/resolver.js', function () {
    it('should pass jshint', function () {
      expect(false, 'helpers/resolver.js should pass jshint.\nhelpers/resolver.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/resolver.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/resolver.js: line 4, col 1, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nhelpers/resolver.js: line 11, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors').to.be.ok;
    });
  });
});
define('engines-testapp/tests/helpers/start-app', ['exports', 'ember', 'engines-testapp/app', 'engines-testapp/config/environment'], function (exports, _ember, _enginesTestappApp, _enginesTestappConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _enginesTestappConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _enginesTestappApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('engines-testapp/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - helpers/start-app.js', function () {
    it('should pass jshint', function () {
      expect(false, 'helpers/start-app.js should pass jshint.\nhelpers/start-app.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/start-app.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/start-app.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/start-app.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/start-app.js: line 6, col 3, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nhelpers/start-app.js: line 8, col 3, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nhelpers/start-app.js: line 11, col 14, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n7 errors').to.be.ok;
    });
  });
});
define('engines-testapp/tests/mirage/config.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - mirage/config.js', function () {
    it('should pass jshint', function () {
      expect(false, 'mirage/config.js should pass jshint.\nmirage/config.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n1 error').to.be.ok;
    });
  });
});
define('engines-testapp/tests/mirage/scenarios/default.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - mirage/scenarios/default.js', function () {
    it('should pass jshint', function () {
      expect(false, 'mirage/scenarios/default.js should pass jshint.\nmirage/scenarios/default.js: line 2, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n1 error').to.be.ok;
    });
  });
});
define('engines-testapp/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - router.js', function () {
    it('should pass jshint', function () {
      expect(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 4, col 1, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nrouter.js: line 12, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors').to.be.ok;
    });
  });
});
define('engines-testapp/tests/services/active-session.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - services/active-session.js', function () {
    it('should pass jshint', function () {
      expect(false, 'services/active-session.js should pass jshint.\nservices/active-session.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/active-session.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nservices/active-session.js: line 6, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors').to.be.ok;
    });
  });
});
define('engines-testapp/tests/services/blog-data.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - services/blog-data.js', function () {
    it('should pass jshint', function () {
      expect(false, 'services/blog-data.js should pass jshint.\nservices/blog-data.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/blog-data.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nservices/blog-data.js: line 14, col 15, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\nservices/blog-data.js: line 22, col 22, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\nservices/blog-data.js: line 30, col 15, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\nservices/blog-data.js: line 38, col 22, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\nservices/blog-data.js: line 6, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n7 errors').to.be.ok;
    });
  });
});
define('engines-testapp/tests/test-helper', ['exports', 'engines-testapp/tests/helpers/resolver', 'ember-mocha'], function (exports, _enginesTestappTestsHelpersResolver, _emberMocha) {

  (0, _emberMocha.setResolver)(_enginesTestappTestsHelpersResolver['default']);
});
define('engines-testapp/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  describe('JSHint - test-helper.js', function () {
    it('should pass jshint', function () {
      expect(false, 'test-helper.js should pass jshint.\ntest-helper.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ntest-helper.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors').to.be.ok;
    });
  });
});
/* jshint ignore:start */

require('engines-testapp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map