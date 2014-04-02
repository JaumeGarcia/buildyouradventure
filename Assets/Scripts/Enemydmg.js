
public var GameOver:GUIText;
public static var salud:int=100;
public static var shield:int=50;
public static var cor:int=1;

 
 function OnCollisionEnter2D(coll: Collision2D) {
   	if (coll.gameObject.tag== "Enemy"){
		
			if (shield>0)
	   		{	
	   			shield=shield-10;
	   		}
			else{
			
				salud=salud-10;
				
			}
		}
}
 
 
function Upload(){

}
