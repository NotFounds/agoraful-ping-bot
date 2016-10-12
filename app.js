var koa = require('koa');
var koaBody = require('koa-body');

var app = koa();
var dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

app.use(koaBody());
app.use(function *(){
  var isPOST = this.request.method == 'POST';
  var isJSON = this.request.type == 'application/json';

  var body = this.request.body;

  var event = body.event;
  var payload = body.payload;

  var post = payload.post;
  // var thread = payload.thread;
  // var user = payload.user;

  console.log('router:', post.text)
  if (isPOST && isJSON && event == 'post') {
    var doResponse = true;
    var title = '';
    var text = '';
    switch (post.text) {
      case 'Hello':
        text = 'World!';
        break;
      case 'ねこ':
        text = 'にゃー';
        break;
      case 'おはよう':
        text = 'おはようなぎ〜';
        break;
      case 'さいころ':
      case 'サイコロ':
      case 'dice':
        text =  String(dice[Math.floor(Math.random() * 5)]);
        break;
      case 'ご注文は?':
        text = 'うさぎですか?';
        break;
      case 'π':
        text = '3.14159265358979323846264338...';
        break;
      case '真実は':
        text = 'いつも一つ！';
        break;
      case 'さあゲームを始めよう':
        text = 'アッシェンテ!';
        break;
      case 'カレーライス':
        text = '僕は悪くない！';
        break;
      case 'お願い':
        text = 'どんぴしゃり、お願いが叶った。';
        break;
      case 'めがね':
      case 'メガネ':
        text = 'めがね、めがねぇ～';
        break;
      case '脳':
        text = 'あぁ脳が震える震える震える震えるぅぅぅぅぅ！';
        break;
      case '紹介':
        text = 'ワタシは魔女教、大罪司教『怠惰』担当、ペテルギウス・ロマネコンティ……デス！';
        break;
      default:
        var index = -1;
        if ((index = post.text.indexOf('した.')) != -1) {
          text = post.text.slice(0, index) + 'したなんてすごいですね!!';
        } else if ((index = post.text.indexOf('ゲーム')) != -1){
          text = 'これは、ゲームであっても遊びではない';
        } else if ((index = post.text.indexOf('逃')) != -1){
          text = '逃げちゃダメだ。逃げちゃダメだ。逃げちゃダメだ。';
        } else if ((index = post.text.indexOf('疲')) != -1){
          text = 'アナタ怠惰デスね？';
        } else {
          text = 'あんたバカァ？';
        }
        break;
    }
    if (doResponse) {
      this.body = {
        actions: [{
          action: 'post',
          payload: {
            title: title,
            text: text,
          }
        }]
      };
    }
  }
});

app.listen(process.env.PORT || 80);
