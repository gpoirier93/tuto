var app = angular.module('flapperNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
      url:'/home',
      templateUrl:'/home.html',
      controller: 'MainCtrl'
    });
    $stateProvider.state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

    $urlRouterProvider.otherwise('home');
}]);


app.factory('posts', [function() {
  var o = {
    posts: [
      {title:'post 1', likes: 4, comments: []},
      {title:'post 2', likes: 8, comments: []},
      {title:'post 3', likes: 1, comments: []},
      {title:'post 4', likes: 20, comments: []},
      {title:'post 5', likes: 16, comments: []}
    ]
  }
  return o;
}]);

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {
  $scope.posts = posts.posts;
  $scope.addPost = function() {
    if ($scope.title || !$scope.title === '') {
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        likes:0,
        comments: [
          {author: 'Joe', body: 'Cool post!', likes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', likes: 1}
        ]
      });
      $scope.title = '';
      $scope.link = '';
    }
  };
  $scope.incrementLikes = function(post) {
    post.likes += 1;
  };
}]);

app.controller('PostsCtrl', ['$scope', 'posts', '$stateParams', function($scope, posts, $stateParams) {
  $scope.post = posts.posts[$stateParams.id];

  $scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    likes: 0
  });
  $scope.body = '';
};
  $scope.incrementLikes = function(comment) {
    comment.likes += 1;
  };
}]);
