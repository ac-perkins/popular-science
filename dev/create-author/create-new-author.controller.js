(function() {
    'use strict';

    angular.module('blog')
      .controller('CreateNewAuthorController', CreateNewAuthorController);

      CreateNewAuthorController.$inject = ['$state', 'NewAuthorService', 'LoginService'];

      function CreateNewAuthorController($state, NewAuthorService, LoginService){

        // console.log('In Author Stories');
        var that = this;
        this.newAuthor = {};
        this.errorMessage = "";

        this.newAuthorForm = function newAuthorForm() {
          // console.log(this.newAuthor);
          console.log(LoginService);

          return NewAuthorService.createAuthor(this.newAuthor)
            .then( LoginService.authenticate(this.newAuthor) )
            .then( function goHome() {
              console.log('success');
              $state.go('home');
            })
            .catch( function errorHandler(response) {
              console.log('failure', response);
              if (response.status === 422) {
                that.errorMessage = "This user account already exists. Please use another email.";
              }
            });


          };

      }

})();
