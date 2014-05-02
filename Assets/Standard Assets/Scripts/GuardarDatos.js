#pragma strict

var nombre:String;
var carga_sh:int;
var carga_sa:int;
var carga_ma:int;
var link:GameObject;
var posplayerx:int;
var posplayery:int;


function Start () {

}

function Update () {


}

function guardar(){
	Debug.Log("posicion x" + link.gameObject.transform.position.x);		
	
			posplayerx=link.gameObject.transform.position.x;
			posplayery=link.gameObject.transform.position.y;
			//Link.transform.position.x = Vector3(0, 0, 0);
			PlayerPrefs.SetInt("shield",Enemydmg.shield);
			PlayerPrefs.SetInt("salud",Enemydmg.salud);
			PlayerPrefs.SetInt("mana",HUD.energia);
			PlayerPrefs.SetInt("posicionX_player",posplayerx);
			PlayerPrefs.SetInt("posicionY_player",posplayery);
			
			
			Debug.Log ("Guardado");
		
		}
		
		function  cargar(){
		
			if(PlayerPrefs.HasKey("shield")){
				
				Enemydmg.shield = PlayerPrefs.GetInt("shield");
				Enemydmg.salud = PlayerPrefs.GetInt("salud");
				HUD.energia = PlayerPrefs.GetInt("mana");
				link.gameObject.transform.position.x = PlayerPrefs.GetInt("posicionX_player");
				link.gameObject.transform.position.y = PlayerPrefs.GetInt("posicionY_player");
				Application.LoadLevel("level01");
				
				Debug.Log ("Partida Cargada " + Enemydmg.shield + Enemydmg.salud +HUD.energia );
			}
		}
		
		


