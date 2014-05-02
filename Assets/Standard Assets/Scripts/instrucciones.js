#pragma strict

function Start () {

}

function Update () {

}
function OnGUI(){
if (GUI.Button (new Rect(Screen.width * .3f, Screen.height * .65f, Screen.width * .5f, Screen.height * .1f),"Volver atras")){
			
			Application.LoadLevel("MainMenu");
		}
		
		}