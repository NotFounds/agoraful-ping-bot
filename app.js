var koa = require('koa');
var koaBody = require('koa-body');

var app = koa();

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
        text = 'おはよう！';
        break;
      case 'サイコロ':
        text =  String(Math.floor( Math.random() * 5 ) + 1);
        break;
      default:
        var index = post.text.indexOf('した.');
        if (index != -1) {
          text = post.text.slice(0, index) + 'したなんてすごいですね!!';
        } else {
          doResponse = false;
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

app.listen(process.env.PORT || 8080);
