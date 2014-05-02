using UnityEngine;
using System.Collections;

public class Generator : MonoBehaviour {
	private Item jsScript;  


	public int rows = 10;

	public int columns = 10;

	public float tileWidth = 0.5f;

	public float tileHeight = 0.5f;

	public Sprite material1;

	public Sprite material2;

	public int[,] matrizTerreno;

	private GameObject[] terrainObjects;

	private int liniaTerreno;

	private int nRuidos;

	private int[] centroRuido;
	
	void awake(){
		jsScript = this.GetComponent<Item>();

	}
	// Use this for initialization
	void Start () {
		this.matrizTerreno = new int[this.rows, this.columns];
		float randNum = Random.value;
		this.liniaTerreno = Mathf.RoundToInt (20 * randNum + 40);
		for (int i = 0; i<rows; i++) {
						for (int j = 0; j<columns; j++) {
								if(i<liniaTerreno){
										matrizTerreno [i,j] = 0;
								}else{
										matrizTerreno [i,j] = 1;
								}
						}
				}
		randNum = Random.value;
		this.nRuidos = Mathf.RoundToInt (10 * randNum + 10);
		this.centroRuido = new int[this.nRuidos];
		for (int i = 0; i<this.nRuidos; i++) {
			randNum = Random.value;
			int columna = Mathf.RoundToInt (randNum * this.columns);
			this.centroRuido[i] = columna;
				}
		for (int i = 0; i<this.nRuidos; i++) {
			randNum = Random.value;
			int factor = Mathf.RoundToInt (3*randNum + 3);
			int variacion = 0;
			int fila = 0;
			for(int rep = 0; rep<factor; rep++){
				if(((this.centroRuido[i]+variacion)>0) && ((this.centroRuido[i]+variacion)<this.columns)){
			while((this.matrizTerreno[fila, (this.centroRuido[i]+variacion)] == 0)&&(fila<this.rows)){
				fila = fila+1;
			}
			for(int j = 0; j<(factor-variacion); j++){
				int f = fila + j;
						if(f<this.rows){
				this.matrizTerreno[f , (this.centroRuido[i]+variacion)] = 0;
						}
			}
				}
			if(variacion > 0){
					if(((this.centroRuido[i]-variacion)>0) && ((this.centroRuido[i]-variacion)<this.columns)){
				while((this.matrizTerreno[fila, (this.centroRuido[i]-variacion)] == 0)&&(fila<this.rows)){
					fila = fila+1;
				}
				for(int j = 0; j<(factor-variacion); j++){
					int f = fila + j;
							if(f<this.rows){
					this.matrizTerreno[f , (this.centroRuido[i]-variacion)] = 0;
							}
				}
					}
			}
			variacion = variacion + 1;
			}
				}
		for (int c = 0; c<this.columns; c++) {
			int fila = 0;
			while((this.matrizTerreno[fila, c] == 0)&&(fila<this.rows)){
				fila = fila+1;
			}
			if(fila<this.rows){
				this.matrizTerreno[fila,c] = 2;
			}
				}
		this.terrainObjects = new GameObject[this.rows*this.columns];
		var initialPosition = transform.position;
		var position = initialPosition;
		for (int i = 0; i<rows; i++) {
			position.x = initialPosition.x;
						for (int j = 0; j<columns; j++) {
								if(matrizTerreno[i,j] > 0){

								GameObject cubo = new GameObject ("cubo" + i);
								jsScript=cubo.AddComponent("Item")as Item;
								cubo.transform.parent = transform;
								cubo.transform.position = position;
								cubo.AddComponent<SpriteRenderer> ();
								SpriteRenderer sp = cubo.GetComponent<SpriteRenderer> ();
								if(matrizTerreno[i,j]==1){
								sp.sprite = material1;
								cubo.name="Tierra";
								jsScript.itemIcon=Resources.Load("Tierra01")as Texture2D;
								matrizTerreno[i,j]=0;
								}else{
									if(matrizTerreno[i,j]==2){
							cubo.name="Cesped";
										sp.sprite = material2;
							jsScript.itemIcon=Resources.Load("Cesped01")as Texture2D;
							matrizTerreno[i,j]=0;
									}
								}
								cubo.transform.localScale = new Vector3 (tileWidth, tileHeight, 0.0f);
								cubo.AddComponent<BoxCollider2D> ();
								

						



								

								cubo.layer=8;
								terrainObjects [i] = cubo;

								}

								position.x += this.tileWidth;
						}
						position.y -= this.tileHeight;
				}
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
