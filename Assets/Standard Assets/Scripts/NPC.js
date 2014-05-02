#pragma strict
var finalizar:boolean;

function Start () {

}

function Update () {

}
 var guiEnabled : boolean;
 
function OnGUI() {



GUI.skin.box.wordWrap = true;  
GUI.color.a = 1;


if(finalizar==false){
GUI.Box(Rect(10,Screen.height/2+115,Screen.width-15,Screen.height/2-120),"GRAN SABIO:¡Bievenido Aventurero! ¿Seras capaz de sobrevivir a todos los peligros que te esperan?");

  
if(GUI.Button (new Rect(Screen.width * .4f, Screen.height * .70f, Screen.width * .3f, Screen.height * .1f),"¡Por supuesto que si!")){
finalizar=true;




  
  
}



}
}
 
 