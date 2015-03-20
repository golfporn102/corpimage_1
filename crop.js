var cropbox = function (options) {
    var obj = {};
    var el = document.querySelector(options.imageBox);
    
    obj.state       = {};
    obj.ratio       = 1;
    obj.options     = options,
    obj.imageBox    = document.querySelector(options.imageBox);
    obj.thumbBox    = document.querySelector(options.thumbBox);
    obj.image       = new Image();
    
    
    var setBackground = function () {
        var w =  parseInt(obj.image.width)  * obj.ratio;
        var h =  parseInt(obj.image.height) * obj.ratio;
        
        var pw = (el.clientWidth - w) / 2;
        var ph = (el.clientHeight - h) / 2;
        
        el.querySelector('img').setAttribute('src', obj.image.src);
        el.querySelector('img').setAttribute('style',
                'width:' + w  + 'px;' + 
                'height:'+ h  + 'px;' +
                'left:'  + pw + 'px;' + 
                'top:' + ph + 'px;' );
    };
    
    var attachEvent = function (node, event, cb) {
        if (node.attachEvent)
            node.attachEvent('on' + event, cb);
        
        else if (node.addEventListener)
            node.addEventListener(event, cb);
    }
    
    var detachEvent = function (node, event, cb) {
        if (node.detachEvent)
            node.detachEvent('on' + event, cb);
        
        else if (node.removeEventListener) 
            node.removeEventListener(event, render);
    };
    
    var stopEvent = function (e) {
        if(window.event) e.cancelBubble = true;
        else e.stopImmediatePropagation();
    };
    
    var imgMouseDown = function (e) {
        stopEvent(e);
        
        obj.state.dragable = true;
        obj.state.mouseX   = e.clientX;
        obj.state.mouseY   = e.clientY;
    };
    
    var imgMouseMove = function (e) {
        stopEvent(e);
        
        if (obj.state.dragable)
        {
            var x = e.clientX - obj.state.mouseX;
            var y = e.clientY - obj.state.mouseY;

            var bg_style = el.querySelector('img').style;

            var bgX = x + parseInt( bg_style.getPropertyValue('left') );
            var bgY = y + parseInt( bg_style.getPropertyValue('top') );

            bg_style.left = bgX + 'px';
            bg_style.top  = bgY + 'px';

            obj.state.mouseX = e.clientX;
            obj.state.mouseY = e.clientY;
        }
    };
    
    var imgMouseUp   = function (e) {
        stopEvent(e);
        obj.state.dragable = false;
    };
    
    obj.getDataURL  = function () {
       
        var width =  obj.thumbBox.clientWidth,
            height = obj.thumbBox.clientHeight,
            canvas = document.createElement("canvas"),
            dim =   el.querySelector('img').style,
            //size =  el.querySelector('img')
            dx = parseInt(dim.left) - el.clientWidth/2 + width/2,
            dy = parseInt(dim.top) - el.clientHeight/2 + height/2,
            dw = parseInt(dim.width),
            dh = parseInt(dim.height),
            sh = parseInt(obj.image.height),
            sw = parseInt(obj.image.width);

        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext("2d");
        context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh);
        var imageData = canvas.toDataURL('image/png');
        
        return imageData;
    };
    
    obj.zoomImage = function (e) {
        var evt = window.event || e;
        var delta = evt.detail? evt.detail*(-120) : evt.wheelDelta;
        
        delta > -120 ? obj.ratio*=1.1 : obj.ratio*=0.9;
        setBackground();
    };
    
    obj.image.onload = function () {
        setBackground();
        
        attachEvent(el, 'mousedown', imgMouseDown);
        attachEvent(el, 'mousemove', imgMouseMove);
        attachEvent(document.body, 'mouseup', imgMouseUp);
        var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';
        attachEvent(el, mousewheel, obj.zoomImage);
    };
    
    obj.image.src = options.imgSrc;
    attachEvent(el, 'DOMNodeRemoved', function(){ 
        detachEvent(document.body, 'DOMNodeRemoved', imgMouseUp)});
    
    return obj;
};