
function Game()
{
    this.dog = new Dog();
    
    var flySprite = null;
    this.settFlySprite = function ()
    {
	flySprite = new SpriteAnimator
	([
	    new Sprite(statsImg,310,3,85,17)
	]);
	flySprite.setPosition(new Point(backgroundImg.width/2, backgroundImg.height/2));
    };
    
    this.draw = function(context)
    {
	if(dogZ===-1)
	{
	    this.dog.draw(context);
	}
	if(this.duck!==null)
	    this.duck.draw(context);
	this.drawBackground(context);
	if(dogZ === 1)
	{
	    this.dog.draw(context);
	}
	if(stats !== null)
	    stats.draw(context);
	if(flySprite !== null)
	    flySprite.draw(context);
	//this.tick();
	
	
    };
    
    var gameStage = 0;
    var action = null;
    var me = this;
    this.start = function()
    {
	this.dog.setPosition(new Point(30,170));
//	action = intro;
//	dogZ = 1;
	gameStage = 1;
	action = game;

	
    };
    
    this.tick = function ()
    {
	if(gameStage===0 || action === null)return;
	if(action())
	    gameStage++;
    };
    
    var introPos = 1;
    var introLimitFrames = 0;
    var dogZ = 0;
    var intro=function ()
    {
	//var p = this.dog.getPosition();
	switch (introPos)
	{
	    case 1:
		me.dog.move(2,0);
		if(me.dog.getPosition().x>60)
		{
		    introPos++;
		    introLimitFrames=24;
		    me.dog.sniff();
		}
		return false;
	    case 2:
		introLimitFrames--;
		if(introLimitFrames===0)
		{
		    me.dog.walk();
		    introPos++;
		}
		return false;
	    case 3:
		me.dog.move(2,0);
		if(me.dog.getPosition().x>120)
		{
		    introPos++;
		    introLimitFrames=24;
		    me.dog.sniff();
		}
		return false;
	    case 4:
		introLimitFrames--;
		if(introLimitFrames===0)
		{
		    introLimitFrames=6;
		    me.dog.jump();
		    introPos++;
		}
		return false;
	    case 5:
		me.dog.move(1,-4);
		introLimitFrames--;
		if(introLimitFrames===0)
		{
		    introLimitFrames=18;
		    dogZ = -1;
		    me.dog.sit();
		    introPos++;
		}
		return false;
	    case 6:
		me.dog.move(0,1);
		introLimitFrames--;
		if(introLimitFrames===0)
		{
		    dogZ = 0;
		    
		    action = game;
		    gameStage = 1;
		    gameState = 0;
		    return true;
		}
		return false;
		
	}
	
    };
    this.shotPoint = null;
    this.duck = null;
    var gameState = 0;
    var round = 0;
    var stats=null;
    var lastShotTime = Date.now();
    
    var spawnDuck = function ()
    {
	me.duck = new Duck();
	me.duck.setPosition(new Point(Math.round(Math.random()*me.duck.width), me.duck.height));
	me.duck.setAlpha(Math.random()*(Math.PI-Math.PI/6)+Math.PI+Math.PI/6);
	//me.duck.setPosition(new Point(100,me.duck.height));
	//me.duck.setAlpha(3*Math.PI/2+Math.PI/16);
    };
    var game = function ()
    {
	switch(gameState)
	{
	    case 0:
		
		
		
		stats = new Stats();
		stats.startRound(round);
		gameState++;
		//introLimitFrames=20;
		return false;
	    case 1:
		if(stats.endCurrent)
		    stats.next();
		if(stats.endRound)
		    stats.startRound(++round);
		spawnDuck();
		gameState++;
		lastShotTime = Date.now();
	    return false;
	    case 2:
		me.duck.move();
		if(me.shotPoint !== null)
		{
		    
		    var success = me.duck.isShot(me.shotPoint);
		    stats.shot(success);
		    me.shotPoint = null;
		    if(success && stats.endCurrent)
		    {
			gameState = 3;
			introLimitFrames = 40;
			me.duck.surprise();
		    }
		    else if(!success && stats.endCurrent)
		    {
			
			gameState = 5;
			introLimitFrames = 40;
			me.duck.flyAway();
			stats.flyAway();
			me.settFlySprite();
			
		    }
		    
		    //lastShotTime = Date.now();
		   return false;
		}
		if(Date.now()-lastShotTime > 5000)
		{
		    gameState = 5;
		    introLimitFrames = 40;
		    me.duck.flyAway();
		    stats.flyAway();
		    me.settFlySprite();
		}
		return false;
	    
	    case 3://success
		
		introLimitFrames--;
		if(introLimitFrames===30)
		{
		    me.duck.shoot();
		}
		else if(introLimitFrames<30)
		{
		    me.duck.move();
		
		    if(!me.duck.fallen())
		    {
			
			return false;
		    }
//		    else
//			me.duck = null;
		}
		if(introLimitFrames<0)
		{
		    dogZ = -1;
		    me.dog.setPosition(new Point(backgroundImg.width/2, backgroundImg.height-60));
		    me.dog.win();
		    introLimitFrames = 80;
		    gameState = 4;
		}
		return false;
	    case 4://dog
		
		if(introLimitFrames>60)
		    me.dog.move(0,-2);
		else if(introLimitFrames<10)
		    me.dog.move(0,2);
		introLimitFrames--;
		if(introLimitFrames===0)
		{
		    dogZ = 0;
		    gameState = 1;
		}
		return false;
	    case 5://fly away
		introLimitFrames--;
		if(me.duck !== null && !me.duck.fallen())
		{    
		    me.duck.move();
		    return false;
		}
		me.duck = null;
		
		if(introLimitFrames < 0)
		{
		    flySprite = null;
		    dogZ = -1;
		    me.dog.setPosition(new Point(backgroundImg.width/2, backgroundImg.height-60));
		    me.dog.laugh();
		    introLimitFrames = 80;
		    gameState = 4;
		}
		return false;
		
	}
	return false;
    };
    
}

Game.prototype.drawBackground = function(context)
{
    context.drawImage(backgroundImg,0,0);
	    
};
