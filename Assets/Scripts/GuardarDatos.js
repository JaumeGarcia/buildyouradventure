#pragma strict

var nombre:String;
var carga_sh:int;
var carga_sa:int;
var carga_ma:int;

function Start () {

}

function Update () {

	if(Input.GetKeyDown("g"))
		{
			PlayerPrefs.SetInt("shield",Enemydmg.shield);
			PlayerPrefs.SetInt("salud",Enemydmg.salud);
			PlayerPrefs.SetInt("mana",HUD.energia);
			




			Debug.Log ("Guardado");
		}
		
		if(Input.GetKeyDown("c"))
		{	if(PlayerPrefs.HasKey("shield")){
				
				Enemydmg.shield = PlayerPrefs.GetInt("shield");
				Enemydmg.salud = PlayerPrefs.GetInt("salud");
				HUD.energia = PlayerPrefs.GetInt("mana");


				Debug.Log ("Partida Cargada " + Enemydmg.shield + Enemydmg.salud +HUD.energia );
			}
		}


}