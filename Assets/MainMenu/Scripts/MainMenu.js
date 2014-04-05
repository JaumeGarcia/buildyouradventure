#pragma strict

var background: Texture2D;
var linkGuardarDatos: GuardarDatos;


function Start () {

}
	function OnGUI(){
		GUI.DrawTexture(new Rect(0,0,Screen.width,Screen.height),background);

		if (GUI.Button (new Rect(Screen.width * .5f, Screen.height * .5f, Screen.width * .5f, Screen.height * .1f),"Comenzar partida")){
			Application.LoadLevel("level01");
		}
		if (GUI.Button (new Rect(Screen.width * .5f, Screen.height * .61f, Screen.width * .5f, Screen.height * .1f),"Cargar")){
			
		//	linkGuardarDatos.cargar();
			
		}
		if (GUI.Button (new Rect(Screen.width * .5f, Screen.height * .72f, Screen.width * .5f, Screen.height * .1f),"Guardar")){
			
		//	linkGuardarDatos.guardar();
		}
		if (GUI.Button (new Rect(Screen.width * .5f, Screen.height * .83f, Screen.width * .5f, Screen.height * .1f),"Salir")){
			
		}
	}

function Update () {

}