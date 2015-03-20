angular.module('app').directive('gCropimage', function () {
    return {
        templateUrl : '/g-crop/template.html',
        scope: {
            file: "@",
        },
        restrict: 'E',
        
        link: function (scope, element, attrs) {
            
            scope.active = false;
            
            var onChangeImage = function () {
                
                var reader = new FileReader();
        
                reader.onload = function (e) {
                    options.imgSrc = e.target.result;
                    cropper = new cropbox(options);
                };
        
                reader.readAsDataURL(this.files[0]);
                this.files = [];
                
                scope.$apply( function () {
                     scope.active = true;
                });
            };
            
            document.querySelector('#g-corpfile').addEventListener('change', onChangeImage );
        }
    };
});