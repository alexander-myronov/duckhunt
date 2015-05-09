var spritesImg = null;
var backgroundImg = null;
var statsImg = null;
var numImages = 3;

function Dog()
{
    var animator = null;
    
    var oldPostion=new Point(0,0);
    var savePosition = function()
    {
	if(animator!==null)
	    oldPostion = animator.getPosition();
    };
    
    var restorePosition = function()
    {
	if(animator!==null)
	    animator.setPosition(oldPostion);
    };
    
    
    this.setPosition = function(newPos)
    {
	animator.setPosition(newPos);
    };
    
    this.getPosition = function ()
    {
	return animator.getPosition();
    };

    this.walk = function()
    {
	savePosition();
	animator = new SpriteAnimator
		([
		    new Sprite(spritesImg, 0, 0, 60, 45,5),
		    new Sprite(spritesImg, 60, 0, 60, 45,5),
		    new Sprite(spritesImg, 120, 0, 60, 45,5)
		]);
	restorePosition();
    };
    this.walk();

    this.sniff = function()
    {
	savePosition();
	animator = new SpriteAnimator
		([
		    new Sprite(spritesImg, 180, 0, 60, 45,4),
		    new Sprite(spritesImg, 240, 0, 60, 45,4)
		]);
	restorePosition();
    };

    this.jump = function()
    {
	savePosition();
	animator = new SpriteAnimator
		([
		    new Sprite(spritesImg, 0, 55, 60, 45,2),
		    new Sprite(spritesImg, 60, 55, 60, 45,2),
		    new Sprite(spritesImg, 120, 55, 60, 45,2)
		]);
	restorePosition();
    };

    this.laugh = function()
    {
	savePosition();
	animator = new SpriteAnimator
		([
		    new Sprite(spritesImg, 180, 55, 60, 45,4),
		    new Sprite(spritesImg, 240, 55, 60, 45,4)
		]);
	restorePosition();
    };
    
    this.laugh = function()
    {
	savePosition();
	animator = new SpriteAnimator
		([
		    new Sprite(spritesImg, 180, 55, 60, 45,4),
		    new Sprite(spritesImg, 240, 55, 60, 45,4)
		]);
	restorePosition();
    };
    
    this.sit = function()
    {
	savePosition();
	animator = new SpriteAnimator
		([
		    new Sprite(spritesImg, 180, 55, 60, 45)
		]);
	restorePosition();
    };
    
    this.win = function()
    {
	savePosition();
	animator = new SpriteAnimator
		([
		    new Sprite(spritesImg, 315, 0, 60, 45)
		]);
	restorePosition();
    };
    
    this.draw = function(context)
    {
	animator.draw(context);
    };
    
    this.move = function(dx, dy)
    {
	animator.move(dx,dy);
    };
}


function Duck()
{
    this.width = backgroundImg.width;
    this.height = backgroundImg.height-60;
    var type = Math.floor((Math.random()*3));
    this.shot = false;
    var getBaseX = function ()
    {
	switch(type)
	{
	    case 0:
		return 0;
	    case 1:
		return 130;
	    case 2:
		return 255;
	}
	throw new Error();
    };
    var alpha=0.0;
    var animator = null;
    var oldPostion=new Point(0,0);
    var savePosition = function()
    {
	if(animator!==null)
	    oldPostion = animator.getPosition();
    };
    
    var restorePosition = function()
    {
	if(animator!==null)
	    animator.setPosition(oldPostion);
    };
    
    this.granularity = 4;
    this.setPosition = function(newPos)
    {
	newPos.x -= newPos.x%this.granularity;
	newPos.y -= newPos.y%this.granularity;
	animator.setPosition(newPos);
    };
    
    this.getPosition = function ()
    {
	return animator.getPosition();
    };
    
    var flyHor = function()
    {
	animator = new SpriteAnimator
		([
		    new Sprite(spritesImg, getBaseX()+0, 115, 35, 35),
		    new Sprite(spritesImg, getBaseX()+40, 115, 35, 35),
		    new Sprite(spritesImg, getBaseX()+80, 115, 35, 35)
		]);
    };
    
    var flyDiag = function()
    {
	animator = new SpriteAnimator
		([
		    new Sprite(spritesImg, getBaseX()+0, 155, 35, 35),
		    new Sprite(spritesImg, getBaseX()+40, 155, 35, 35),
		    new Sprite(spritesImg, getBaseX()+80, 155, 35, 35)
		]);
    };
    
    var flyVert = function()
    {
	animator = new SpriteAnimator
		([
		    new Sprite(spritesImg, getBaseX()+0, 195, 35, 35),
		    new Sprite(spritesImg, getBaseX()+40, 195, 35, 35),
		    new Sprite(spritesImg, getBaseX()+80, 195, 35, 35)
		]);
    };
    
    var flyEast = function()
    {
	savePosition();
	flyHor();
	animator.rotation = 0;
	restorePosition();
    };
    
    var flySouthEast = function()
    {
	savePosition();
	flyDiag();
	animator.rotation = Math.PI/2;
	restorePosition();
    };
    
    var flySouth = function()
    {
	savePosition();
	flyVert();
	animator.flipV = true;
	restorePosition();
    };
    
    
    
    var flySouthWest = function()
    {
	savePosition();
	flyDiag();
	animator.flipH = true;
	animator.rotation = 3*Math.PI/2;
	restorePosition();
    };
    
    var flyWest = function()
    {
	savePosition();
	flyHor();
	animator.flipH = true;
	restorePosition();
    };
    
    var flyNorthWest = function()
    {
	savePosition();
	flyDiag();
	animator.flipH = true;
	restorePosition();
    };
    
    var flyNorth = function()
    {
	savePosition();
	flyVert();
	restorePosition();
    };
    
    var flyNorthEast = function()
    {
	savePosition();
	flyDiag();
	restorePosition();
    };
    
    var flyDown = function()
    {
	savePosition();
	animator = new SpriteAnimator
	([
		    new Sprite(spritesImg, getBaseX()+40, 235, 35, 35,2,true),
		    new Sprite(spritesImg, getBaseX()+40, 235, 35, 35,2,false)
	]);
	restorePosition();
    };
    
    
    this.fallen = function ()
    {
	
	if(alpha === Math.PI/2)
	    return this.getPosition().y === this.height;
	else if(alpha === 3*Math.PI/2)
	    return this.getPosition().y <= 0;
	return false;
    };
    
    this.setAlpha = function(a)
    {
	if(a>=Math.PI*2)
	    a -= Math.PI*2;
	if(a<0)
	    a += Math.PI*2;
	if(a<Math.PI/8)
	    flyEast();
	else if(a<3*Math.PI/8)
	    flySouthEast();
	else if(a<5*Math.PI/8)
	{
	     if(this.shot)
		flyDown();
	    else
		flySouth();
	}
	    
	else if(a<7*Math.PI/8)
	    flySouthWest();
	else if(a<9*Math.PI/8)
	    flyWest();
	else if(a<11*Math.PI/8)
	    flyNorthWest();
	else if(a<13*Math.PI/8)
	    flyNorth();
	else if(a<15*Math.PI/8)
	    flyNorthEast();
	else if(a<2*Math.PI)
	    flyEast();
	alpha = a;
	this.target = this.calculate();
	this.target.x -= this.target.x%this.granularity;
	this.target.y -= this.target.y%this.granularity;
	
	this.bresenhamInit();
	
    };
    
    this.getAlpha = function ()
    {
	return alpha;
    };
    
    
    this.draw = function (context)
    {
	animator.draw(context);
    };
    this.target = new Point(200,200);
    
    var deltay,deltax,error,err2,ystep,xstep,x,y,x0,y0,x1,y1;
    
    
    this.bresenhamInit = function()
    {
	x0 = this.getPosition().x;
	y0 = this.getPosition().y;
	x1 = this.target.x;
	y1 = this.target.y;

	
	deltax = Math.abs(x1 - x0);
	deltay = Math.abs(y1 - y0);
	error = deltax - deltay;

	y = y0;
	x = x0;
	if (y0 < y1)
	    ystep = this.granularity;
	else //if(y0>y1)
	    ystep = -this.granularity;
//	else 
//	    ystep = 0;
	
	if (x0 < x1)
	    xstep = this.granularity;
	else //if( x0>x1)
	    xstep = -this.granularity;
//	else 
//	    xstep = 0;
	
    };
    
    this.bresenhamStep = function ()
    {
	this.setPosition(new Point(x0,y0));
	if(x0 === x1 && y0 === y1)
	    return;
	    
//	if(steep)
//	    this.setPosition(new Point(y,x));
//	else
	err2 = 2*error;
	if(err2>-deltay)
	{
	    error -= deltay;
	    x0 += xstep;
	}
	
	if(x0 === x1 && y0 === y1)
	{
	    
	    this.setPosition(new Point(x0,y0));
	    return;
	}
	if(err2<deltax)
	{
	    error += deltax;
	    y0+=ystep;
	}
	
	
    };
    this.setAlpha(0.0);
    
    this.shoot=function()
    {
	  this.shot = true;
	  this.setAlpha(Math.PI/2);
	  
    };
    
    this.flyAway=function()
    {
	this.shot = true;
	this.setAlpha(3*Math.PI/2);
	
    };
    
    this.surprise = function()
    {
	savePosition();
	animator = new SpriteAnimator
	([
	    new Sprite(spritesImg, getBaseX(), 235, 35, 35)
	]);
	restorePosition();
    };
}

Duck.prototype.calculate = function()
{
    var alpha = this.getAlpha();
    var pos = this.getPosition();
    
    
    
    if(this.shot)
    {
	if(alpha === Math.PI/2)
	    return new Point(pos.x,this.height);
	else
	    return new Point(pos.x,0);
    }
    
    if(alpha === 0)
    {
	return new Point(this.width, pos.y);
    }
    if(alpha === Math.PI/2)
    {
	return new Point(pos.x, this.height);
    }
    if(alpha === Math.PI)
    {
	return new Point(0, pos.y);
    }
    if(alpha === 3*Math.PI/2)
    {
	return new Point(pos.x, 0);
    }
    
   var w = this.width;
   var h = this.height;
   var tan = Math.tan(alpha);
   

    if(alpha<Math.PI/2)
    {
	var tx = (h-pos.y)/tan+pos.x;
	if(tx>=0&&tx<=w)
	    return new Point(tx,h);
	var ty = (w-pos.x)*tan+pos.y;
	if(ty>=0&&ty<=h)
	    return new Point(w,ty);
    }
    if(alpha <Math.PI)
    {
	var tx = pos.x+(h-pos.y)/tan;
	if(tx>=0&&tx<=w)
	    return new Point(tx,h);
	var ty = -pos.x*tan+pos.y;
	if(ty>=0&&ty<=h)
	    return new Point(0,ty);
    }
    if(alpha < 3*Math.PI/2)
    {
	var tx = pos.x - pos.y/tan;
	if(tx>=0&&tx<=w)
	    return new Point(tx,0);
	var ty = pos.y-pos.x*tan;
	if(ty>=0&&ty<=h)
	    return new Point(0,ty);
    }
    if(alpha<2*Math.PI)
    {
	var tx = pos.x - pos.y/tan;
	if(tx>=0&&tx<=w)
	    return new Point(tx,0);
	var ty = pos.y+(w-pos.x)*tan;
	if(ty>=0&&ty<=h)
	    return new Point(w,ty);
    }
    return new Point(200,200);
	
};

Duck.prototype.move = function ()
{
    
    this.bresenhamStep();
    var pos = this.getPosition();
    if(this.shot) return;
    var a = this.getAlpha();
    var w= this.width;
    var h = this.height;
    
    if(pos.x === this.target.x && pos.y === this.target.y)// && pos.y === this.target.y)
    {
	if(pos.x === 0)
	{
	    if(pos.y === 0)
	    {
		this.setAlpha(3*Math.PI/2-a);
		
	    }
	    else if(pos.y === h)
	    {
		this.setAlpha(2*Math.PI-a+Math.PI/2);
	    }
	    if(a<Math.PI)
		this.setAlpha(Math.PI-a);
	    else
		this.setAlpha(3*Math.PI-a);
	    
	}
	else if(pos.x === w)
	{
	    if(pos.y === 0)
	    {
		this.setAlpha(Math.PI*2-a+Math.PI/2);
		
	    }
	    else if(pos.y === h)
	    {
		this.setAlpha(3*Math.PI/2-a);
		
	    }
	    if(a<Math.PI/2)
		this.setAlpha(Math.PI-a);
	    else
		this.setAlpha(3*Math.PI-a);
	}
	else if(pos.y === 0 || pos.y === h)
	{
	    this.setAlpha(2*Math.PI-a);
	}
    }

    
};


Duck.prototype.isShot = function (pt)
{
    var p = this.getPosition();  
    return Math.sqrt(Math.pow(pt.x-p.x,2)+Math.pow(pt.y-p.y,2))<30;
};



function Stats()
{
    this.round=0;
    this.ducks = new Array(10);
    
    this.current=-1;
    this.shots=3;
    this.ducksShot = 0;
    this.score = 0;
    
    this.endRound = false;
    this.endCurrent = false;
    
    var duckStatsSprite = new SpriteAnimator
    ([
	new Sprite(statsImg,84,3,112,17)
    ]);
    
     
    duckStatsSprite.setPosition(new Point(120,215));
    
    
    var shotStatsSprite = new SpriteAnimator
    ([
	new Sprite(statsImg,55,4,24,16)
    ]);
    shotStatsSprite.setPosition(new Point(33,215));
    
    var shotSprite = new SpriteAnimator
    ([
	new Sprite(statsImg,33,20,7,8)
    ]);
    var getWhiteDucky=function(c)
    {
	var anim= new SpriteAnimator
	([
	    new Sprite(statsImg,11,20,9,12)
	]);
	anim.setPosition(new Point(100+c*8,212));
	return anim;
    };
    var getRedDucky=function(c)
    {
	var anim = new SpriteAnimator
	([
	    new Sprite(statsImg,22,20,9,12)
	]);
	anim.setPosition(new Point(100+c*8,212));
	return anim;
    };
    
    var getBlinkingDucky=function(c)
    {
	var anim= new SpriteAnimator
	([
	    new Sprite(statsImg,11,20,9,12,3),
	    new Sprite(statsImg,0,0,9,12,3)
	]);
	anim.setPosition(new Point(100+c*8,212));
	return anim;
    };
    
    
   
    for(var i=0;i<10;i++)
    {
	this.ducks[i] = getWhiteDucky(i);
    }
    
    this.startRound = function(round)
    {
	this.round = round;
	for(var i=0;i<10;i++)
	{
	    this.ducks[i] = getWhiteDucky(i);
	}
	this.ducksShot = 0;
	this.current = 0;
	this.endCurrent = false;
	this.endRound = false;
	this.ducks[0] = getBlinkingDucky(0);
	
    };
    
    
    this.next =function ()
    {
	    this.current++;
	    if(this.current<10)
	    {
		this.ducks[this.current] = getBlinkingDucky(this.current);
		this.shots = 3;
		this.endCurrent = false;
	    }
	    else
	    {
		this.endRound = true;
		this.endCurrent = true;
	    }

    };
    this.shot = function(success)
    {
	if(success)
	{
	    this.ducksShot++;
	    this.ducks[this.current] = getWhiteDucky(this.current);
	    this.endCurrent = true;
	    this.score += 100;

	    
	}
	this.shots--;
	if(this.shots===0)
	{
	    this.ducks[this.current] = getRedDucky(this.current);
	    this.endCurrent = true;
	}
	
    };
    
    this.flyAway = function()
    {
	this.ducks[this.current] = getRedDucky(this.current);
	this.endCurrent = true;

    };
    
    
    this.draw=function(context)
    {
	duckStatsSprite.draw(context);
	
	for(var i=0;i<10;i++)
	{
	    this.ducks[i].draw(context);
	}
	
	shotStatsSprite.draw(context);
	for(var i =0;i<this.shots;i++)
	{
	    shotSprite.setPosition(new Point(28+i*7,211));
	    shotSprite.draw(context);
	}
	context.fillStyle = '#83D313';
	
	context.fillText("R="+this.round,25,200);
	
	context.fillStyle = '#FFFFFF';
	context.fillText(this.score,190,215);
	context.fillText("SCORE",190,223);
	
	
    };
    
    
    
}


 


