#pragma strict

var falling: boolean = false; // tells when the player is falling
private var lastY: float;     // last grounded height
public var character: CharacterController;

function Start(){
  character = GetComponent(CharacterController);
  lastY = transform.position.y;
}

function Update(){
  if (character.isGrounded == false){ // if character not grounded...
    falling = true;        // assume it's falling
  } else {                   // if character grounded...
    if (falling){            // but was falling last update...
      var hFall = lastY - transform.position.y; // calculate the fall height...
      if (hFall > 2){        // then check the damage/death
        Debug.Log("OUCH");
       
      }
    }
    lastY = transform.position.y; // update lastY when character grounded
  }
}