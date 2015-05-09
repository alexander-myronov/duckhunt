
function Point(x, y)
{
    this.x = x;
    this.y = y;
}

function Sprite(image, x, y, w, h,repeat,flipH)
{
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.position = new Point(0, 0);
    if(repeat === undefined)
	this.repeat = 1;
    else
	this.repeat = repeat;
    if(flipH === undefined)
	this.flipH = false;
    else
	this.flipH = flipH;
    
}

Sprite.prototype.draw = function(context)
{
    
    context.drawImage(this.image, this.x, this.y, this.width, this.height, -this.width/2, -this.height/2, this.width, this.height);
   
};



function SpriteAnimator(sprites)
{
    this.sprites = sprites;
    this.current=0;
    this.rotation=0;
    this.flipV = false;
    this.flipH = false;
    var position = new Point(0,0);
    
    this.spriteReps = new Array(sprites.length);
    
    for (i = 0; i < this.sprites.length; i++) 
    {
	this.sprites[i].position=position;
	this.spriteReps[i] = 0;
    }
    
    this.setPosition=function(newPos)
    {
	position.x = newPos.x;
	position.y = newPos.y;
    };
    
    
    this.getPosition=function()
    {
	return position;
    };
    
    
    
    this.move = function(dx, dy)
    {
	position.x += dx;
	position.y += dy;
    };
}


SpriteAnimator.prototype.draw = function(context)
{
    context.save();
    context.translate(this.getPosition().x, this.getPosition().y);
    context.rotate(this.rotation);
    context.scale(this.flipH!==this.sprites[this.current].flipH?-1:1,this.flipV?-1:1);
    this.sprites[this.current].draw(context);
    this.spriteReps[this.current]++;
    if(this.spriteReps[this.current]===this.sprites[this.current].repeat)
    {
	this.spriteReps[this.current] = 0;
	this.current = (this.current+1)%this.sprites.length;
	
    }
    
    context.restore();
};



