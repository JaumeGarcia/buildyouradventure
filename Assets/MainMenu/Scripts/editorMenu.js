#pragma strict

var background: Texture2D;
var imagen1: Texture2D;
var imagen2: Texture2D;
var imagen3: Texture2D;
var imagen4: Texture2D;

var aux: Texture2D;

var cuerpo1: Texture2D;
var cuerpo2: Texture2D;
var cuerpo3: Texture2D;
var cuerpo4: Texture2D;

var auxcuerpo: Texture2D;
var linkGuardarDatos: GuardarDatos;
var btnDerecha : Texture2D;
var btnIzquierda : Texture2D;

function Start () {

} 
	function OnGUI(){ 
	var dentro :boolean;
	GUI.DrawTexture(Rect(500,100,300,300), imagen1);
	GUI.DrawTexture(Rect(500,200,300,300), cuerpo1);
		GUI.DrawTexture(new Rect(0,0,Screen.width,Screen.height),background);
	
		
			if(dentro==false){
		if (GUI.Button (new Rect(Screen.width * .7f, Screen.height * .3f, Screen.width * .1f, Screen.height * .1f),btnDerecha)){
		
	
		
		if( imagen1!=imagen2 && imagen1!=imagen3 && imagen1!= imagen4 && dentro==false){
		aux=imagen1;
		imagen1=imagen2;
		dentro=true;
		}
		if(imagen1==imagen2 && dentro==false){
		
		imagen1=imagen3;
		dentro=true;
		}
		if(imagen1==imagen3 && dentro==false){
		imagen1=imagen4;
		dentro=true;
		}
		
		if (imagen1==imagen4 && dentro==false){
		imagen1=aux;
		dentro=true;
		
		}
		}
		
		
		
		
			
		
		if (GUI.Button (new Rect(Screen.width * .1f, Screen.height * .3f, Screen.width * .1f, Screen.height * .1f),btnIzquierda)){
		if( imagen1!=imagen2 && imagen1!=imagen3 && imagen1!= imagen4 && dentro==false){
		aux=imagen1;
		imagen1=imagen4;
		dentro=true;
		}
		if(imagen1==imagen2 && dentro==false){
		imagen1=aux;
		dentro=true;
		}
		if(imagen1==imagen3 && dentro==false){
		imagen1=imagen2;
		dentro=true;
		}
		
		if (imagen1==imagen4 && dentro==false){
		imagen1=imagen3;
		dentro=true;
		
		}
		}
		
		if (GUI.Button (new Rect(Screen.width * .7f, Screen.height * .5f, Screen.width * .1f, Screen.height * .1f),btnDerecha)){
		if(cuerpo1!=cuerpo2 && cuerpo1!=cuerpo3 && cuerpo1!= cuerpo4 && dentro==false){
		auxcuerpo=cuerpo1;
		cuerpo1=cuerpo2;
		dentro=true;
		}
		if(cuerpo1==cuerpo2 && dentro==false){
		cuerpo1=cuerpo3;
		dentro=true;
		}
		if(cuerpo1==cuerpo3 && dentro==false){
		cuerpo1=cuerpo4;
		dentro=true;
		}
		
		if (cuerpo1==cuerpo4 && dentro==false){
		cuerpo1=aux;
		dentro=true;
		}
		}
		if (GUI.Button (new Rect(Screen.width * .1f, Screen.height * .5f, Screen.width * .1f, Screen.height * .1f),btnIzquierda)){
		if( cuerpo1!=cuerpo2 && cuerpo1!=cuerpo3 && cuerpo1!= cuerpo4){
		auxcuerpo=cuerpo1;
		cuerpo1=cuerpo4;
		dentro=true;
		}
		if(cuerpo1==cuerpo2 && dentro==false){
		cuerpo1=aux;
		dentro=true;
		}
		if(cuerpo1==cuerpo3 && dentro==false){
		cuerpo1=cuerpo2;
		dentro=true;
		}
		
		if (cuerpo1==cuerpo4 && dentro==false){
		cuerpo1=cuerpo3;
		dentro=true;
		
		}
		}
		
		if (GUI.Button (new Rect(Screen.width * .4f, Screen.height * .8f, Screen.width * .2f, Screen.height * .1f),"¡Empieza tu aventura!")){
			Application.LoadLevel("level01");
		}
		
		}
		}
		
		
	

function Update () {

}