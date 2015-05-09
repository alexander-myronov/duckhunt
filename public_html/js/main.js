var canvas = null;
var ctx = null;
var imagesLoaded=0;
var imageReady = false;

window.onload= function()
{
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext("2d");
   
    spritesImg = new Image();
    spritesImg.src = 'img/sprites.png';
    spritesImg.onload = loaded();
    
    backgroundImg = new Image();
    backgroundImg.src = 'img/background.png';
    backgroundImg.onload = loaded;
    
    statsImg = new Image();
    statsImg.src = 'img/stats.png';
    statsImg.onload = loaded;
    
    var submit = document.getElementById('submit');
    submit.onclick = function()
    {
	window.alert("server side is not reade :(");
    };
     
     canvas.addEventListener('click', function(evt) 
     {
	 if(game!==null)
	 {
	    var p = getMousePos(canvas,evt);
	    p.x = p.x / (canvas.width/backgroundImg.width);
	    p.y = p.y / (canvas.height/backgroundImg.height);
	    game.shotPoint = p;
	 }
     }, false);
};



function resize()
{
    if(canvas===null)return;
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight;
    
    
};

function loaded() 
{
    imagesLoaded++;
    if(imagesLoaded<numImages) return;
    imageReady = true;
  
  
  game = new Game();
  game.start();
  resize();
  window.requestAnimationFrame(update);
}


var game=null;

function redraw() 
{
    ctx.fillStyle = '#3FBFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!imageReady)
      return;
    ctx.save();
    ctx.scale(canvas.width/backgroundImg.width,canvas.height/backgroundImg.height);
    game.draw(ctx);
    
    ctx.restore();
    
    
   
}

function getMousePos(canvas, evt) 
{
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

var lastUpdateTime = 0;
var acDelta = 0;
var msPerFrame = 2;

function update()
{
    window.requestAnimationFrame(update);
    game.tick();
    var delta = Date.now() - lastUpdateTime;
    if (acDelta > msPerFrame)
    {
        acDelta = 0;
	redraw();
    }
    
    else
    {
        acDelta += delta;
    }

    lastUpdateTime = Date.now();
}

//window.requestAnimFrame = (function()
//{
//    return  window.requestAnimationFrame       ||
//            window.webkitRequestAnimationFrame ||
//            window.mozRequestAnimationFrame    ||
//            window.oRequestAnimationFrame      ||
//            window.msRequestAnimationFrame     ||
//            function( callback ){
//              window.setTimeout(callback, 1000 / 60);
//            };
//})();