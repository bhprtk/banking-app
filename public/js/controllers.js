'use strict';

var app = angular.module('bankingApp');

app.controller('mainCtrl', function($scope, Trans) {

  $scope.trans = [];

  // get all

  Trans.getAll()
  .then(res => {
    $scope.trans = res.data;

  })
  .catch(err => {
    console.error(err);
  });



    // withdrawl

    $scope.withdrawl = () => {
       var total = 0;
       $scope.trans.forEach(tran => {
         if(tran.debit != null){
           total += tran.debit;
         }
       });
       return total;
     };

     // deposit

     $scope.deposit = () => {
       var total = 0;
       $scope.trans.forEach(tran => {
         if(tran.credit != null){
           total += tran.credit;
         }
       });
       return total;
     };

     // get balance

     $scope.getBalance = () => {
       var total = $scope.deposit() - $scope.withdrawl();
       return total;
     };


     // sort by

     $scope.sortBy = (order) => {
       if($scope.sortOrder === order) {
         $scope.sortOrder = `-${order}`;
       } else {
         $scope.sortOrder = order;
       }
     };


     // create Trans

     $scope.createTrans = () => {
           Trans.create($scope.newTrans)
           .then(res => {
             var appendTrans = res.data;
             $scope.trans.push(appendTrans);
             $scope.newTrans = {};

           })
           .catch(err => {
             console.error(err);
           });


     };

     // remove tran

     $scope.removeTran = (tran) => {
       Trans.remove(tran)
       .then(() => {
          var r = confirm("Are you sure you want to delete this transaction?");
          if(r){
            var index = $scope.trans.indexOf(tran);
            $scope.trans.splice(index, 1);
          }
       })
       .catch(err => {
         console.error(err);
       });
     };

    // edit

    var editingIndex;

    $scope.editTrans = (tran) => {
      editingIndex = $scope.trans.indexOf(tran);
      $scope.tranToEdit = angular.copy(tran);
      $scope.tranToEdit.date = tran.date.slice(0, 10);
    };

    $scope.cancelEdit = () => {
      $scope.tranToEdit = null;
    };

    $scope.saveEdit = () => {
      Trans.update($scope.tranToEdit)
      .then(() => {
        $scope.trans[editingIndex] = $scope.tranToEdit;
        $scope.tranToEdit = null;
      })
      .catch(err => {
        console.error(err);
      });
    };










}); // end of controller
