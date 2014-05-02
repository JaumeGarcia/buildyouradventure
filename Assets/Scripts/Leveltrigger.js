#pragma strict


     function OnCollisionEnter2D(coll: Collision2D) {
   	if (coll.gameObject.tag== "Portal"){
 	Debug.Log("VAMOS AL LEVEL2");
   	Application.LoadLevel("level02");
		
			
		}
}