class Inimigo {
  constructor(x,y,img,direita,tamanhoMovimento,velocidade) {
    this.sprite = createSprite();
    this.sprite.position.x = x
    this.sprite.position.y = y;
    this.sprite.addAnimation('normal', inimigoAnimation[img].clone());
    this.direita = direita;
    this.tamanhoMovimento = tamanhoMovimento;
    this.velocidade = velocidade;
    this.posicaoInicial = x;
  }
 
  getSprite() {
    return this.sprite;
  }
  
  atualizar() {
	  this.sprite.velocity.x = 0;
	  
	  if(this.direita) {
		  this.sprite.mirrorX(-1);
	      this.sprite.velocity.x = this.velocidade;
	      
	      if(this.sprite.position.x + this.velocidade - this.posicaoInicial >= this.tamanhoMovimento){
	    	  this.direita = false;
	      }
	  } else {
		  this.sprite.mirrorX(1);
          this.sprite.velocity.x = -this.velocidade;
          
          if((this.sprite.position.x - this.velocidade - this.posicaoInicial)*-1 >= this.tamanhoMovimento){
	    	  this.direita = true;
	      }
	  }
  }
}

let inimigoAnimation;
let TipoInimigo = {};

function inicializarInimigoAnimations() {
	inimigoAnimation = {
		azul : loadAnimation (
		      'assets/sprites/inimigo/azul/frame-1.png',
		      'assets/sprites/inimigo/azul/frame-2.png'
			 ),
		olhudo : loadAnimation (
		      'assets/sprites/inimigo/olhudo/1.png',
		      'assets/sprites/inimigo/olhudo/2.png',
		      'assets/sprites/inimigo/olhudo/3.png',
		      'assets/sprites/inimigo/olhudo/4.png',
		      'assets/sprites/inimigo/olhudo/5.png',
		      'assets/sprites/inimigo/olhudo/6.png'
			),
		verde : loadAnimation (
			  'assets/sprites/inimigo/verde/frame-1.png',
			  'assets/sprites/inimigo/verde/frame-2.png',
			  'assets/sprites/inimigo/verde/frame-3.png',
			  'assets/sprites/inimigo/verde/frame-4.png',
			  'assets/sprites/inimigo/verde/frame-5.png',
			  'assets/sprites/inimigo/verde/frame-6.png'
			),
		voador_verde : loadAnimation (
		      'assets/sprites/inimigo/voador_verde/frame-1.png',
		      'assets/sprites/inimigo/voador_verde/frame-2.png',
		      'assets/sprites/inimigo/voador_verde/frame-3.png',
		      'assets/sprites/inimigo/voador_verde/frame-4.png'
			),
		voador_vermelho : loadAnimation (
		      'assets/sprites/inimigo/voador_vermelho/frame-1.png',
		      'assets/sprites/inimigo/voador_vermelho/frame-2.png'
			)
	};
	
	inimigoAnimation.verde.frameDelay = 6;
	inimigoAnimation.voador_verde.frameDelay = 6;
	
	for(key in inimigoAnimation) {
		TipoInimigo[key.toUpperCase()] = key; 
	}
}