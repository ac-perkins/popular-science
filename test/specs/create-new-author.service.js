(function() {
    'use strict';

    var assert = chai.assert;

    suite('create new author service', function() {
      var NewAuthorService, $httpBackend;

      setup(module('blog'));

      setup(inject(function(_NewAuthorService_, _$httpBackend_) {

        NewAuthorService = _NewAuthorService_;
        $httpBackend = _$httpBackend_;

        $httpBackend
          .whenPOST('https://tiy-blog-api.herokuapp.com/api/Authors')
          .respond({
            id: 123,
            name: 'alex',
            email: 'test@gmail.com',
            }
          );
        $httpBackend
          .whenGET('home/home.template.html')
          .respond('<p>hi!</p>');
      }));

      // test('math works', function() {
      //   assert.strictEqual((2 + 2), 4, '2 + 2 equals 4');
      // });

      test('createAuthor works', function(doneCallback) {

        // assert.strictEqual(NewAuthorService.createAuthor().name, 'alex', 'user data starts as null');

        var p = NewAuthorService.createAuthor({});
        assert.ok(p.then, 'login returns a promise');

        p.then(function(response) {
          // console.log(response);
          // console.log(authorData);
          // console.log('promise success!');
          assert.strictEqual(response.name, 'alex', 'api responds with expected data');
          assert.isAbove(response.email.indexOf('@'), -1, 'email address contains @');
          doneCallback();
        })
        .catch(function() {
          assert.ok(false, 'login api endpoint failed');
          doneCallback();
        });

        $httpBackend.flush();

      });

    });

})();
