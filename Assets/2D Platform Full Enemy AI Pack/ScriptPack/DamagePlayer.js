var damagetaken:int;


function takeDMG(other:Collider) {

	if(other.gameObject.tag=="Enemy")
	{
		
		
		Enemydmg.Salud=Enemydmg.Salud-1;
		Debug.Log("SE HAN TOCADOO");
		
		
	}

}