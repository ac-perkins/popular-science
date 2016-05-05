(function() {
    'use strict';

    var assert = chai.assert;

    suite('create new author controller', function() {
      var cnac;
      var $rootScope;
      var mockNewAuthorService = {};
      var mockLoginService = {};

      setup(module('blog'));

      setup(module(function($provide) {
        $provide.value('NewAuthorService', mockNewAuthorService);
        $provide.value('LoginService', mockLoginService);
      }));

      setup(inject(function($controller, $q, _$rootScope_) {
        $rootScope = _$rootScope_;
        cnac = $controller('CreateNewAuthorController');

        mockNewAuthorService.createAuthor = function(author) {
          var def = $q.defer();
          if(author.email === 'acperkins@gmail.com'){
            def.reject({
              status: 422
            });
          } else {
          def.resolve({
            id: 123456,
            name: 'Alex',
            email: 'test@gmail.com'
          });
          }
          return def.promise;
        };

        mockLoginService.authenticate = function() {
          var def = $q.defer();
          def.resolve({
            id: '123456',
            ttl: 1209600,
            created: '"2016-04-25T19:08:00.145Z"',
            userId: '48fj30fgkjsd'
          });
          return def.promise;
        };

        mockLoginService.getLoginData = function() {
          var def = $q.defer();
          def.resolve({
            id: '123456',
            ttl: 1209600,
            created: '"2016-04-25T19:08:00.145Z"',
            userId: '48fj30fgkjsd'
          });
          return def.promise;
        };

      }));

      test('errorMessage is an emptry string to start', function() {
        assert.strictEqual(cnac.errorMessage, '', 'errorMessage is empty');
      });

      test('creating a new author works', function(doneCallback) {
        assert.strictEqual(cnac.newAuthor.name, undefined, 'newAuthor key values begin as undefined');

        cnac.newAuthor = {name: 'alex', email:'test@gmail.com', password:'password123'};
        cnac.newAuthorForm()
          .then(function() {
            assert.strictEqual(cnac.newAuthor.name, 'alex', 'author name is expected name');
            console.log('newAuthor', cnac.newAuthor);
            doneCallback();
          })
          .catch(function() {
            assert.ok(false, 'should not fire');
            doneCallback();
          });

        $rootScope.$digest();
      });

      test('errorMessage works', function(doneCallback) {

        cnac.newAuthor = {name: 'alex', email:'acperkins@gmail.com', password:'password123'};
        cnac.newAuthorForm()
          .then(function() {
            assert.isAtLeast(cnac.errorMessage.length, 5, 'error message because email already exists');
            doneCallback();
          })
          .catch(function() {
            assert.ok(false, 'should not fire');
            doneCallback();
          });

        $rootScope.$digest();
      });

    });

})();
