public var info: GUIText;
var itemIcon : Texture2D; //The Icon.
var itemIcon2 : Texture2D;


var canGet = true; //If we can pick up the Item.
var itemType : String; //This will let us equip the item to specific slots. Ex: Head, Shoulder, or whatever we set up. If the item is equipment (or weapon) this needs to match a slot to work properly.
var stackable = true; //Is it stackable? If yes then items with the same itemType will be stacked.SE HA CAMBIADOESTO
var maxStack = 20; //How many Items each stack can have before creating a new one. Remember that the Items that should be stacked should have the same itemType.
var stack = 1; //This is how many stack counts this Item will take up.
var isEquipment = true; //Can the Item be equipped? This includes weapons.
var isAlsoWeapon = false; //Is the Item also a Weapon? This only works with isEquipment set to true.
var construir=true;

var contador=0;
var dureza=2;
//This is the object we will instantiate in the Players hand.
//We use this so we can have two versions of the weapon. One for picking up and one for using.
var equippedWeaponVersion : Transform;
public var protagonista : GameObject;
//These will store information about usefull components.
static var playersinv : Inventory;

private var FPPickUpFound = false;


@script AddComponentMenu ("Inventory/Items/Item")

//Here we find the components we need.
function Awake ()
{
	playersinv = FindObjectOfType(Inventory); //finding the players inv.
	if (playersinv == null)
	{
		canGet = false;
		Debug.LogWarning("No 'Inventory' found in game. The Item " + transform.name + " has been disabled for pickup (canGet = false).");
	}
	else
	{
		gameObject.SendMessage("RetrievePlayer", playersinv, SendMessageOptions.DontRequireReceiver);
	}
	
	if (isEquipment == false && GetComponent(ItemEffect) == null)
	{
		//Debug.LogError(gameObject.name + " is not equipment so please assign an ItemEffect script to it");
	}
	
	if (GetComponent(FirstPersonPickUp) != null)
	{
		FPPickUpFound = true;
	}
	else if (transform.GetComponentInChildren(FirstPersonPickUp) != null)
	{
		FPPickUpFound = true;
	}
}

function isInRango()
{
	protagonista = GameObject.Find("Esqueleto");
	
	restaX = protagonista.transform.position.x - transform.position.x;
	restaY = protagonista.transform.position.y - transform.position.y;
	
	Debug.Log(restaX + " " + restaY);
	if (restaX >= -0.8 && restaX <= 0.8)
	{
		if (restaY >= -0.83 && restaY <= 0.83)
		{
			return true;
		}
	}
	return false;
}
//When you click an item
function OnMouseDown()
{
	

	//If the 'FirstPersonPickUp' script is not attached we want to pick up the item.
	if (FPPickUpFound == false && isInRango())
	{
		PickUpItem();
	}
}

//Picking up the Item.
function PickUpItem ()
{

	if(canGet){//if its getable or hasnt been gotten.
	var locatedit:Item;
	Debug.Log("HOLA CARACOLA");
	
	if (contador<dureza){
	renderer.material.mainTexture=itemIcon2;
	
	contador=contador+1;
	
	
	}
	
	if(contador==dureza){
	
	playersinv.gameObject.SendMessage ("PlayPickUpSound", SendMessageOptions.DontRequireReceiver); //Play sound
	
		if(stackable){
		Debug.Log("LO COJO");
			
			for(var t:Transform in playersinv.Contents){
				if(t.name==this.transform.name){//if the item we wanna stack this on has the same name
					var i:Item=t.GetComponent(Item);
					if(i.stack<i.maxStack){
						locatedit=i;
					}
				}
			}
			if(locatedit!=null){//if we have a stack to stack it to!
			
				locatedit.stack+=1;
				Destroy(this.gameObject);
			}
			else{
				getit=true;
			}
		}
		//If we can get it and the inventory isn't full.
		if (getit && playersinv.Contents.length < playersinv.MaxContent)
		{
			
		
			playersinv.AddItem(this.transform);
			MoveMeToThePlayer(playersinv.itemHolderObject);//moves the object, to the player7
			
			
		}
		else if (playersinv.Contents.length >= playersinv.MaxContent)
		{
			Debug.Log("Inventory is full");
			info.guiText.text="Inventario lleno";
		}
	contador=0;
		
	}
}
}

//Moves the item to the Players 'itemHolderObject' and disables it. In most cases this will just be the Inventory object.
function MoveMeToThePlayer(itemHolderObject : Transform)
{
	canGet = false;
	
	//gameObject.SetActive(false);	It's normally best to disable the individual components so we can keep item effects and update functions alive.
	
	if (GetComponent(MeshRenderer) != null)
	{
		GetComponent(MeshRenderer).enabled = false;
	}
	if (GetComponent(SpriteRenderer) != null)
	{
		GetComponent(SpriteRenderer).enabled = false;
	}
	
	if (GetComponent(Collider) != null)
	{
		GetComponent(Collider).enabled = false;
	}
	if (GetComponent(BoxCollider2D) != null)
	{
		GetComponent(BoxCollider2D).enabled = false;
	}
	
	GetComponent("Item").enabled = false;
	
transform.parent = itemHolderObject;
	transform.localPosition = Vector3.zero+Vector3(0,0.5,0);
	
	
}

//Drops the Item from the Inventory.
function DropMeFromThePlayer(makeDuplicate : boolean)

{


     
	if (makeDuplicate == false) //We use this if the object is not stacked and so we can just drop it.
	{
	

   

		canGet = true;
		gameObject.SetActive(true);
		
		if (GetComponent(MeshRenderer) != null)
		{
			GetComponent(MeshRenderer).enabled = true;
		}
		if (GetComponent(SpriteRenderer) != null)
		{
			GetComponent(SpriteRenderer).enabled = true;
		}
		
		if (GetComponent(Collider) != null)
		{
			GetComponent(Collider).enabled = true;
		}
		if (GetComponent(BoxCollider2D) != null)
		{
			GetComponent(BoxCollider2D).enabled = true;
		}
	
		 GetComponent("Item").enabled = true;
	
		transform.parent = null;
	
		DelayPhysics();
		
			 // transform.position = point;
			 
			  }
		
		
		
		
	
	else //If the object is stacked we need to make a clone of it and drop the clone instead.
	{
		canGet = true;
		clone = Instantiate(gameObject, transform.position, transform.rotation);
		canGet = false;
		clone.SetActive(true);
		
			if (GetComponent(SpriteRenderer) != null)
		{
			clone.GetComponent(SpriteRenderer).enabled = true;
		}
	
		
		if (clone.GetComponent(MeshRenderer) != null)
		{
			clone.GetComponent(MeshRenderer).enabled = true;
		}
		
		if (clone.GetComponent(Collider2D) != null)
		{
			clone.GetComponent(Collider2D).enabled = true;
		}
		
		clone.GetComponent("Item").enabled = true;
		
		clone.transform.parent = null;
		
		clone.name = gameObject.name;
		
		
	}
	
}

function DelayPhysics ()
{
	if (playersinv.transform.parent.collider != null && collider != null)
	{
		Physics.IgnoreCollision(playersinv.transform.parent.collider, collider, true);
		yield WaitForSeconds (1);
		Physics.IgnoreCollision(playersinv.transform.parent.collider, collider, false);
	}
	
}

//Drawing an 'I' icon on top of the Item in the scene to keep organised.
function OnDrawGizmos ()
{
	Gizmos.DrawIcon (Vector3(transform.position.x, transform.position.y + 1, transform.position.z), "ItemGizmo.png", true);
}