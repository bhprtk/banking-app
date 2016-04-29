'use strict';

var app = angular.module('bankingApp');

app.service('Trans', function($http) {

  this.create = tran => {
    return $http.post('/api', tran);
  };

  this.getAll = () => $http.get('/api');

  this.remove = tran => $http.delete(`/api/${tran.id}`);

  this.update = tran => $http.put('/api', tran);







});
