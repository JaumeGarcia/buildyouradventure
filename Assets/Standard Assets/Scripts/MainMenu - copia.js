#pragma strict

var background: Texture2D;

var linkGuardarDatos: GuardarDatos;
var texto: String;
texto= "Comenzar nueva aventura";
var apretado:boolean;
apretado=false;
function Start () {

}
	function OnGUI(){
		
	
	
		
		
		GUI.DrawTexture(new Rect(0,0,Screen.width,Screen.height),background);

		if (GUI.Button (new Rect(Screen.width * .5f, Screen.height * .40f, Screen.width * .5f, Screen.height * .1f),texto)){
			texto= "Continuar Partida";
			if(apretado==false){
				apretado=true;
				Application.LoadLevel("Editor");
				}
				else{
				Application.LoadLevel("level01");
				}
			
			
			
			
		}
		if (GUI.Button (new Rect(Screen.width * .5f, Screen.height * .51f, Screen.width * .5f, Screen.height * .1f),"Cargar")){
			
			linkGuardarDatos.cargar();
			
		}
		if (GUI.Button (new Rect(Screen.width * .5f, Screen.height * .62f, Screen.width * .5f, Screen.height * .1f),"Guardar")){
			
			linkGuardarDatos.guardar();
		}
		if (GUI.Button (new Rect(Screen.width * .5f, Screen.height * .73f, Screen.width * .5f, Screen.height * .1f),"Instrucciones")){
		Application.LoadLevel("instrucciones");
		}
			
		
		if (GUI.Button (new Rect(Screen.width * .5f, Screen.height * .84f, Screen.width * .5f, Screen.height * .1f),"Salir")){
		 Application.Quit();
	}
	}

function Update () {
if (Input.GetKey (KeyCode.Escape)) { //tornem al joc presionant ESCAPE

			
		Application.LoadLevel("level01");
		}


}