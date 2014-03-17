
public var GameOver:GUIText;
public static var salud:int=100;
 function OnCollisionEnter2D(coll: Collision2D) {
   if (coll.gameObject.tag== "Enemy"){
		salud=salud-20;
		
		
		
		}
		
		
	if(salud<=0){
	//Destroy(gameObject);
	print("GAME OVER");
	GameOver.guiText.text= "GAME OVER";
}
      
 }
 
 
 
function Upload(){



    

}
