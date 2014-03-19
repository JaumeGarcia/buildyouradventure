#pragma strict


var mana:GameObject;
var manaVacio:GameObject;
var shieldVacio:GameObject;
var shield:GameObject;
var vidaVacia:GameObject;
var vida:GameObject;



static var escudo : int = 100;
static var energia : int = 100;


function Start () {
	mana.guiTexture.pixelInset = Rect (-0.7393252, 6.339361, 200, 11);
	manaVacio.guiTexture.pixelInset = Rect (-0.7393252, 6.33936, 204, 15);
	
	shieldVacio.guiTexture.pixelInset = Rect (-0.8319398, 6.246746, 50, 50);
	shield.guiTexture.pixelInset = Rect (-0.8319398, 6.246746, 50, 50);
	
	
	vidaVacia.guiTexture.pixelInset = Rect (-0.7393252, 6.277617, 200, 11);
	vida.guiTexture.pixelInset = Rect (-0.7393252, .277617, 204, 15);
}

function Update () {
	
		if (energia>0)
		{
			if (Input.GetKeyDown (KeyCode.E))
			{
				
				
				energia -= 5;
			}
		}
		print("el escudo es:" + escudo);
		if(Enemydmg.shield<=0)
		{
			if(Enemydmg.salud>=0)
			 {
				vida.guiTexture.pixelInset = Rect (-0.7393252, .277617, 2* Enemydmg.salud, 15);
			}
		}
		
		
		
	mana.guiTexture.pixelInset = Rect (-0.7393252, 6.339361, 2 * energia , 15);
	shield.guiTexture.pixelInset = Rect (-0.8319398, 6.246746, 50 , Enemydmg.shield);
	
}