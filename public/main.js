'use strict';

var app = angular.module('bankingApp', []);

app.controller('mainCtrl', function($scope) {
  $scope.trans = [];

  $scope.addTrans = (type) => {
    var appendTrans = {
      date: $scope.newTrans.date,
      desc: $scope.newTrans.desc,
      memo: $scope.newTrans.memo,
      debit: ($scope.newTrans.debit || 0),
      credit: ($scope.newTrans.credit || 0)
    }

    $scope.trans.push(appendTrans);
    $scope.newTrans = {};
  };

  $scope.removeTrans = (tran) => {
    var r = confirm("Are you sure you want to delete this transaction?");
    if(r) {
      var index = $scope.trans.indexOf(tran);
      $scope.trans.splice(index, 1);
    }
  };

  $scope.sortBy = (order) => {
    if($scope.sortOrder === order) {
      $scope.sortOrder = `-${order}`;
    } else {
      $scope.sortOrder = order;
    }
  };

  var editingIndex;

  $scope.editTrans = (tran) => {
    editingIndex = $scope.trans.indexOf(tran);
    $scope.tranToEdit = angular.copy(tran);
  };

  $scope.saveEdit = () => {
    $scope.trans[editingIndex] = $scope.tranToEdit;
    $scope.tranToEdit = null;
  };

  $scope.cancelEdit = () => {
    $scope.tranToEdit = null;
  };

  $scope.withdrawl = () => {
    var total = 0;
    $scope.trans.forEach(tran => {
      total += tran.debit;
    });
    return total.toFixed(2);
  };
  $scope.deposit = () => {
    var total = 0;
    $scope.trans.forEach(tran => {
      total += tran.credit;
    });
    return total.toFixed(2);
  };

  $scope.getBalance = () => {
    var total = $scope.deposit() - $scope.withdrawl();
    return total;
  };


}); // end of controller
