#pragma strict


var Loading_Screen:Texture2D;
 
function OnGUI () {
   if(Application.isLoadingLevel){
     Debug.Log("CARGANDO");
       GUI.Box(new Rect(0,0,Screen.width,Screen.height),Loading_Screen);
    }
    
}