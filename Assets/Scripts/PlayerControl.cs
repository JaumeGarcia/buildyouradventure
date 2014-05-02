using UnityEngine;
using System.Collections;
//using UnityEditor;
public class PlayerControl : MonoBehaviour
{

	Enemydmg jsScript; 
	bool grounded, interact; //bool for checking if player is grounded so they can jump, and bool for interact, so that player can only interact when in range of thing to interact with
	public Transform jumpCheck, interactCheck; //transform variable for the end points of the linecasts
	private bool falling;
	GameObject capIK, maIK;
	private float lastY; //ultima posicio Y (per calcular el DMG)
	GameObject o;
	GameObject cap;
	GameObject puntoDeMira;
	public float moveSpeed = 0.1f;
	RaycastHit2D interacted; //a variable type that stores a collider that was hit during linecast
	Animator anim;
	Vector3 posicionMouse, posicionPlayer;

	void Awake(){


	}
	void Start()
	{


		anim = GetComponent<Animator>();
		//Screen.showCursor = false;
		maIK = GameObject.Find ("bdret_IK");
		capIK = GameObject.Find ("cap_IK");
		cap = GameObject.Find ("cap");
		o = GameObject.Find ("cap");
		puntoDeMira = GameObject.Find ("puntoDeMira");
		anim = GetComponent<Animator> ();


	}
	void Update()
	{
		Movement(); //call the function every frame
		RaycastStuff(); //call the function every frame
	}

	float calcularAnguloMouse()
	{
		Vector3 v3Pos;
		float fAngle;
		v3Pos = Input.mousePosition;
		v3Pos.z = (transform.position.z - Camera.main.transform.position.z);
		v3Pos = Camera.main.ScreenToWorldPoint(v3Pos);
		v3Pos = v3Pos - transform.position;
		fAngle = Mathf.Atan2 (v3Pos.y, v3Pos.x) * Mathf.Rad2Deg;
		if (fAngle < 0.0f) fAngle += 360.0f;
		Debug.Log ("1) "+fAngle);

		return fAngle-180.0f;
	}
	void RaycastStuff()
	{
		posicionMouse = Camera.main.ScreenToWorldPoint (Input.mousePosition);

		posicionPlayer = transform.position;


		posicionMouse.z = 0;
		capIK.transform.position = posicionMouse;
		maIK.transform.position = capIK.transform.position;

		float rotacion = calcularAnguloMouse();
		Debug.Log (rotacion);
		GameObject.Find ("Particle System").transform.rotation = Quaternion.Euler(rotacion,270,0);
		//Debug.Log ("aaaaaaaaaaaaaaaaaaaaaaa   " + posicionMouse);
		puntoDeMira.transform.position = posicionMouse;

		//Just a debug visual representation of the Linecast, can only see this in scene view! Doesn't actually do anything!
		Debug.DrawLine (transform.position, jumpCheck.position, Color.magenta);
		Debug.DrawLine (transform.position, interactCheck.position, Color.magenta);

		Vector2 playerPos = new Vector2 (transform.position.x, transform.position.y);
		Vector2 groundPos = new Vector2 (jumpCheck.position.x, jumpCheck.position.y);

		grounded = Physics2D.Linecast (playerPos, groundPos, 1 << LayerMask.NameToLayer ("Ground"));


		//Calculem el DMG de caiguda

		if (grounded == false){ // if character not grounded...
			falling = true;        // assume it's falling
		} else {                   // if character grounded...
			if (falling){            // but was falling last update...
				var hFall = lastY - transform.position.y; // calculate the fall height...
				if (hFall > 2){        // then check the damage/death
					Debug.Log("OUCH");
					jsScript = this.GetComponent <Enemydmg>();
					//jsScript.salud=jsScript.salud-10;

					//Enemydmg.salud=Enemydm.salud-10;
				}
			}
			lastY = transform.position.y; // update lastY when character grounded
		}
	
		
		//Debug.Log(anim.GetBool("atacar"));

		if (anim.GetBool ("atacar"))
			o.GetComponent<SpriteRenderer> ().sprite = Resources.Load<Sprite> ("cap_atac");
		else 
		{
			if (grounded) {
				o.GetComponent<SpriteRenderer> ().sprite = Resources.Load<Sprite> ("cap");
			} else
				o.GetComponent<SpriteRenderer> ().sprite = Resources.Load<Sprite> ("cap_smile");
		}	


		/*
		if (grounded) 
		{
			anim.SetBool ("suelo",true);
		} else {
	anim.SetBool ("suelo",false);
*/



		if (capIK.transform.position.x < posicionPlayer.x) 
		{
			//transform.Translate(Vector3.right * 4f * Time.deltaTime);
			anim.SetBool("derecha",false);
			//transform.eulerAngles = new Vector2(0, 180); //this sets the rotation of the gameobject
			//cap.transform.eulerAngles = new Vector2(0, 180); //this sets the rotation of the gameobject
		} 
		else 
		{
			//transform.Translate(Vector3.right * 4f * Time.deltaTime); 
			anim.SetBool("derecha",true);
			//GameObject.Find("CamaEsquerra_IK").transform.position += new Vector3(0.1f,0,0);
			//transform.eulerAngles = new Vector2(0, 0); //this sets the rotation of the gameobject
		}


		//Debug.Log (playerPos + " " + groundPos + " " + grounded + LayerMask.NameToLayer("Treno"));
		//we assign the bool 'ground' with a linecast, that returns true or false when the end of line 'jumpCheck' touches the ground
		//grounded = Physics2D.Linecast(transform.position, jumpCheck.position, 1 << LayerMask.NameToLayer("Ground"));  

		//Using linecast which takes (start point, end point, layermask) so we can make it only detect objects with specified layers
		//its wrapped in an if statement, so that while the tip of the Linecast (interactCheck.position) is touching an object with layer 'Guard', the code inside executes
		if(Physics2D.Linecast(transform.position, interactCheck.position, 1 << LayerMask.NameToLayer("Guard")))
		{
			//we store the collider object the Linecast hit so that we can do something with that specific object, ie. the guard
			//each time the linecast touches a new object with layer "guard", it updates 'interacted' with that specific object instance
			interacted = Physics2D.Linecast(transform.position, interactCheck.position, 1 << LayerMask.NameToLayer("Guard")); 
			interact = true; //since the linecase is touching the guard and we are in range, we can now interact!
		}
		else
		{
			interact = false; //if the linecast is not touching a guard, we cannot interact
		}

		//Physics2D.IgnoreLayerCollision(8, 10); //if we want certain layers to ignore each others collision, we use this! the number is the layer number in the layers list
	}


	void Movement() //function that stores all the movement
	{
	
		Vector3 mouse_pos;
		Vector3 object_pos;

		mouse_pos = Input.mousePosition;
		object_pos = Camera.main.WorldToScreenPoint (transform.position);
		anim.SetFloat ("velocidad", Mathf.Abs (Input.GetAxis ("Horizontal")));

		if(mouse_pos.x>object_pos.x){
			anim.SetBool("derecha",true);
		}else{
			anim.SetBool("derecha",false);
		}

		if(Input.GetKey (KeyCode.D))
		{
			//transform.Rotate(new Vector3(0,180,0));
			//GameObject cam = GameObject.Find("Main Camera");
			//camera.transform.Rotate(new Vector3(0,180,0));

			transform.Translate(Vector3.right * 4f * Time.deltaTime); 
			gameObject.SendMessage("runSound", SendMessageOptions.DontRequireReceiver); //Play sound

			if(mouse_pos.x>object_pos.x){
			anim.SetBool("derecha",true);
			}else{
				anim.SetBool("derecha",false);
			}
			//transform.eulerAngles = new Vector2(0, 0); //this sets the rotation of the gameobject
			//transform.eulerAngles = new Vector2(0, 0); //this sets the rotation of the gameobject
		}
		if (Input.GetKey (KeyCode.Escape)) {


		Application.LoadLevel("MainMenu");



				}
		if(Input.GetKey (KeyCode.A))
		{

			transform.Translate(Vector3.left * 4f * Time.deltaTime);
	

			if(mouse_pos.x<object_pos.x){
				anim.SetBool("derecha",false);
			}else{
				anim.SetBool("derecha",true);
			}
		
			//transform.eulerAngles = new Vector2(0, 180); //this sets the rotation of the gameobject

		}

		if(Input.GetKeyDown (KeyCode.Space) && grounded) // If the jump button is pressed and the player is grounded then the player jumps 
		{
			rigidbody2D.AddForce(Vector2.up * 200f);

			//Pruebas para cambiar sprite en tiempo real
			//Sprite[] spr = Resources.LoadAll<Sprite>("linkEdi");
			//Debug.Log(gameObject.GetComponent<SpriteRenderer>().sprite);// = Resources.Load<Sprite>("linkEdit_7");
			//gameObject.GetComponent<SpriteRenderer>().sprite = spr[0];

		}

		if(Input.GetKeyDown (KeyCode.E))// && interact) //if you press E and interact is set to true
		{

			//interacted.collider.gameObject.animation.Play (); //access the gameobject of the collider stored in 'interacted' back in the linecast code, and tell its animation component to play the default animation
		}

		if (Input.GetKey (KeyCode.T)) 
		{
			
			cambiarColor ("");
		}
		if (Input.GetKey (KeyCode.P)) 
		{
			GameObject mano = GameObject.Find("ma_dreta");
			mano.AddComponent<SpriteRenderer>().sprite = Resources.Load<Sprite>("sword");
			mano.GetComponent<SpriteRenderer>().sortingLayerName = "Foreground";
			
			GameObject cabells = GameObject.Find("cabells");
			cabells.AddComponent<SpriteRenderer>().sprite = Resources.Load<Sprite>("cabells");
			cabells.GetComponent<SpriteRenderer>().sortingLayerName = "Foreground";
			//cambiarColor ("");
		}

		if (Input.GetKey (KeyCode.O)) 
		{
			GameObject mano = GameObject.Find("ma_dreta");
			GameObject.Find("Llamarada").transform.position= mano.transform.position;
			GameObject.Find("Particle System").GetComponent<ParticleSystem>().enableEmission = true;

			//cambiarColor ("");
		}

		if (Input.GetKey (KeyCode.Mouse0)) 
		{
			anim.SetBool ("atacar", true);
		} 
			else
				anim.SetBool ("atacar", false);
				
		
		if(Input.GetKey (KeyCode.R))
		{
			//Debug.Log((Sprite)Resources.Load("mano"));
			
			
			cambiarColor("red");
			
			//Debug.Log(o);
			//nuevo.transform.parent = o.transform;
			o.GetComponent<SpriteRenderer>().sprite =  Resources.Load<Sprite>("cuerpo2");
			
			//nuevo.transform.localPosition= o.transform.localPosition;
			
			
			
			/*nuevo.transform.parent = o.transform;

			nuevo.transform.localPosition = GameObject.Find("orc_5").transform.localPosition;
			nuevo.transform.localRotation = GameObject.Find("orc_5").transform.localRotation;
			nuevo.transform.localScale = GameObject.Find("orc_5").transform.localScale;
			Debug.Log(nuevo.transform.parent.name);
*/
			//o.GetComponent<SpriteRenderer>().sprite = (Sprite)Resources.Load("orc2_5");
		}
	}

	void cambiarColor(string color)
	{
		GameObject cos, bdret, besquerre;
		if (color != "")
			color = "_" + color;
		
		
		cos = GameObject.Find("cos");
		bdret = GameObject.Find("braç_dret");
		besquerre = GameObject.Find("braç_esquerre");
		
		cos.GetComponent<SpriteRenderer>().sprite = Resources.Load<Sprite>("cos" + color);
		bdret.GetComponent<SpriteRenderer>().sprite = Resources.Load<Sprite>("braç_dret" + color);
		besquerre.GetComponent<SpriteRenderer>().sprite = Resources.Load<Sprite>("braç_esquerre" + color);
		
	}



}


