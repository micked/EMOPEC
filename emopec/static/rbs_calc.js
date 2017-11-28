angular.module('EMOPEC', ['ui.bootstrap'])

.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}])

.controller('EmopecCtrl', function($scope, $http) {

    $scope.resetForm = function() {
        $scope.leaderSeq = '';
        $scope.cdsSeq    = '';
        $scope.wobbleSeq = '';

        $scope.libSize          = 10;
        $scope.libTarget        = 'both';
        $scope.libSpacing       = 'auto';
        $scope.libManualSpacing = 6;
    }

    $scope.showWobble = false;
    $scope.resetForm();

    $scope.invalidSeq = function(seqModel) {
        return !seqModel.match(/^[atcgu]*$/i);
    }

    $scope.invalidInt = function(i) {
        return !String(i).match(/^(0|[1-9]\d*)$/);
    }

    $scope.invalidInput = function() {
        return (
            $scope.invalidSeq($scope.leaderSeq) ||
            $scope.invalidSeq($scope.cdsSeq)    ||
            $scope.invalidInt($scope.libSize)   ||
            $scope.invalidInt($scope.libManualSpacing)
        )
    }

    $scope.alerts  = [];
    $scope.results = [];
    $scope.running = false;

    //Run EMOPEC
    $scope.runEMOPEC = function() {
        $scope.running = true;
        payload = {
            'leader': $scope.leaderSeq || $('#pre_sequence').attr('placeholder'),
            'cds':    $scope.cdsSeq    || $('#coding_sequence').attr('placeholder'),
            'libdir': $scope.libTarget,
            'n':      $scope.libSize,
            'force_spacing': ($scope.libSpacing == 'auto') ? false : $scope.libManualSpacing,
            'constraints': $scope.showWobble ? $scope.wobbleSeq || $('#wobble_sequence').attr('placeholder') : false,
        }
        $http.post('/emopec', payload).
        success(function(data, status, headers, config) {
            data.isCollapsed = true;
            $scope.results.push(data);
            angular.forEach(data.warnings, function(warning) {
                $scope.alerts.push({ 'msg': warning, 'type': 'warning'});
            });
            $scope.running = false;
        }).
        error(function(data, status, headers, config) {
            if (data.error) {
                $scope.alerts.push({ 'msg': data.error, 'type': 'danger'});
            } else {
                $scope.alerts.push({ 'msg': 'Unknown error occured.', 'type': 'danger'});
            }
            $scope.running = false;
        });
    }

});