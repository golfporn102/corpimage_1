var options = {
    imageBox:   '.imageBox',
    thumbBox:   '.thumbBox',
    spinner:    '.spinner',
    imgSrc:     ''
};

angular.module('app', [])

.controller('appCtrl' , function ($scope) {

//    var cropper;
//    var onChangeImage = function () {
//        
//        var reader = new FileReader();
//        
//        reader.onload = function (e) {
//            options.imgSrc = e.target.result;
//            cropper = new cropbox(options);
//        };
//        
//        reader.readAsDataURL(this.files[0]);
//        this.files = [];
//    };
//  
//    document.querySelector('#file').addEventListener('change', onChangeImage );
//    
//    $scope.cropImage = function () {
//        var img = cropper.getDataURL();
//        document.querySelector('.cropped').innerHTML += '<img src="'+img+'">';
//    };
//    
//    $scope.zoomIn = function () {
//        console.log('BBB');
//    };
//    
//    $scope.zoomOut = function () {
//        console.log('CCC');
//    };
});
