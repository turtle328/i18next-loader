import path from 'path';
import chai from ('chai');
import loader from '../index.js';

const assert = chai.assert;

describe('basename', function () {
  ['yaml', 'json'].forEach((type) => {
    context(type, () => {
      let thisScope;
      beforeEach(function (done) {
        //mock webpack loader this scope
        const emptFn = function () { };
        thisScope = {
          addDependency: emptFn,
          addContextDependency: emptFn,
          cacheable: emptFn,
          resource: path.join(__dirname, `./data/basic-app-${type}/locales/index.js`),
          query: {
            basenameAsNamespace: true
          }
        };
        done();
      });

      function assertCommon(resStore) {
        assert.strictEqual(resStore.dev.main.main.test, 'Dev dev dev!');
        assert.strictEqual(resStore.de.main.main.test, 'Das ist ein Test!');
        assert.strictEqual(resStore.en.main.main.test, 'This is a test!');
        assert.strictEqual(resStore.fr.main.main.test, 'Ceci est un test!');
      }

      it('should generate the structure', function () {
        const res = loader.call(thisScope, 'index.js');
        const resStore = eval(res);
        assertCommon(resStore);
      });
    });
  });
});