class Player {
  constructor(fase) {
    this.velocidade = 5;
    this.GRAVIDADE = 0.8;
    this.VELOCIDADE_SALTO = -15;
    
    this.fase = fase;
    this.coletaveis = fase.getColetaveis();
    this.altura = 60;
    this.largura = 38;
    this.pulando = false;
    this.vivo = true;
    this.somColetavel = loadSound('assets/sounds/coletavel.ogg');
    this.vidas = 3;
    
    this.sprite = createSprite();
    this.carregarAnimacoes();
    this.sprite.position.x = fase.getPosicaoInicialJogador().x
    this.sprite.position.y = fase.posicaoInicialJogador.y;
  }
  
  atualizar() {
    this.sprite.velocity.x = 0;
    
    if(this.vivo) {
      if (keyIsDown(RIGHT_ARROW)) {
        if(!this.pulando) {
          this.sprite.changeAnimation('andar');
        }
        this.sprite.mirrorX(1);
        this.sprite.velocity.x = this.velocidade;

      } else if (keyIsDown(LEFT_ARROW)) {
          if(!this.pulando) { 
              this.sprite.changeAnimation('andar');
          }
          this.sprite.mirrorX(-1);
          this.sprite.velocity.x = -this.velocidade;

      }else {
        if(!this.pulando) {
          this.sprite.changeAnimation('normal');
        }
      }
    }
    
    if(this.vivo || !this.noSolo()) {
      this.sprite.velocity.y += this.GRAVIDADE;
    }
    
    if(!this.vivo && this.noSolo()) {
      this.sprite.changeAnimation('morto');
    }
    
    this.sprite.collide(this.fase.getObstaculos(), this.tratamentoColisao.bind(this));
    this.sprite.overlap(this.fase.getColetaveis(), this.tratamentoColeta.bind(this));
    this.sprite.overlap(this.fase.getInimigos(), this.tratamentoInimigo.bind(this));
  }
  
  pular() {
    if(this.vivo && this.noSolo()) {
      this.sprite.velocity.y = this.VELOCIDADE_SALTO;
      this.sprite.changeAnimation('pulando');
      this.pulando = true;
    }
  }
  
  noSolo() {
    return this.sprite.velocity.y == 0 || this.sprite.velocity.y == this.GRAVIDADE;
  }
  
  tratamentoColisao(player, obstaculo) {    
    if((floor(player.position.y) + this.altura/2 == obstaculo.position.y - obstaculo.height/2) ) {
      this.sprite.velocity.y = 0;
      this.pulando = false;
    }
    if((floor(player.position.y) - this.altura/2 == obstaculo.position.y + obstaculo.height/2)) {
      this.sprite.velocity.y = 0;
    }
  }
  
  tratamentoColeta(player, coletavel) {
    this.somColetavel.play();
    coletavel.remove();
  }
  
  tratamentoInimigo(player, inimigo) {
    if(this.vivo)
      this.vidas--;
    this.vivo = false;
  }
  
  getPosicao() {
    return this.sprite.position;
  }

  carregarAnimacoes() {
    let normalAnimation = loadAnimation('assets/sprites/player/parado/parado1.png',
	  'assets/sprites/player/parado/parado2.png',
	  'assets/sprites/player/parado/parado3.png',
	  'assets/sprites/player/parado/parado4.png',
	  'assets/sprites/player/parado/parado5.png',
	  'assets/sprites/player/parado/parado6.png',
	  'assets/sprites/player/parado/parado7.png',
	  'assets/sprites/player/parado/parado8.png',
	  'assets/sprites/player/parado/parado9.png',
	  'assets/sprites/player/parado/parado10.png',
	  'assets/sprites/player/parado/parado11.png',
	  'assets/sprites/player/parado/parado12.png',
	  'assets/sprites/player/parado/parado13.png',
	  'assets/sprites/player/parado/parado14.png',
	  'assets/sprites/player/parado/parado15.png');
    normalAnimation.frameDelay = 10;
    this.sprite.addAnimation('normal', normalAnimation);
    
    let andarAnimation = loadAnimation(
      'assets/sprites/player/andando/andando1.png',
      'assets/sprites/player/andando/andando2.png',
      'assets/sprites/player/andando/andando3.png',
      'assets/sprites/player/andando/andando4.png',
      'assets/sprites/player/andando/andando5.png',
      'assets/sprites/player/andando/andando6.png',
      'assets/sprites/player/andando/andando7.png',
      'assets/sprites/player/andando/andando8.png',
      'assets/sprites/player/andando/andando9.png',
      'assets/sprites/player/andando/andando10.png',
      'assets/sprites/player/andando/andando11.png',
      'assets/sprites/player/andando/andando12.png',
      'assets/sprites/player/andando/andando13.png',
      'assets/sprites/player/andando/andando14.png',
      'assets/sprites/player/andando/andando15.png');
      andarAnimation.frameDelay = 3;
    this.sprite.addAnimation('andar',andarAnimation);
    
    let pulandoAnimation = loadAnimation(
      'assets/sprites/player/pulando/pulando6.png',
      'assets/sprites/player/pulando/pulando7.png',
      'assets/sprites/player/pulando/pulando8.png',
      'assets/sprites/player/pulando/pulando9.png',
      'assets/sprites/player/pulando/pulando10.png',
      'assets/sprites/player/pulando/pulando11.png',
      'assets/sprites/player/pulando/pulando12.png');
    this.sprite.addAnimation('pulando', pulandoAnimation);
    
    let mortoAnimation = loadAnimation(
      'assets/sprites/player/morto/morto1.png',
      'assets/sprites/player/morto/morto2.png',
      'assets/sprites/player/morto/morto3.png',
      'assets/sprites/player/morto/morto4.png',
      'assets/sprites/player/morto/morto5.png',
      'assets/sprites/player/morto/morto6.png',
      'assets/sprites/player/morto/morto7.png',
      'assets/sprites/player/morto/morto8.png',
      'assets/sprites/player/morto/morto9.png',
      'assets/sprites/player/morto/morto10.png',
      'assets/sprites/player/morto/morto12.png',
      'assets/sprites/player/morto/morto13.png',
      'assets/sprites/player/morto/morto14.png',
      'assets/sprites/player/morto/morto15.png')
    
    mortoAnimation.frameDelay = 8;
    mortoAnimation.looping = false;
    this.sprite.addAnimation('morto', mortoAnimation);
  }
}