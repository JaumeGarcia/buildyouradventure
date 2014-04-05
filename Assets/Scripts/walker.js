
public var speed:float=6;

public var patrolseconds:float=3;
private var patroltime:float=0;
public var leftorright:boolean;


function Update()
{
	patroltime+=Time.deltaTime;
	if(leftorright)
		rigidbody2D.velocity.x=speed; 
	else
		rigidbody2D.velocity.x=-speed;
	if(patroltime>=patrolseconds)
	{
		if(leftorright){
			leftorright=false;
			;}
		else
			leftorright=true; 
		patroltime=0;
		rigidbody2D.transform.Rotate(0,180,0);
		
	}
}