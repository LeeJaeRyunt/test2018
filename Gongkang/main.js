var express = require('express'); //express모듈을 expres상수에 저장
var app = express(); //상수에 저장한 express모듈에 함수처럼사용!!그리고 그거를 변수app에 저장
//그 외 필요한 모듈 가져옴
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
app.use(helmet());

var topicRouter = require('./routes/topic'); //라우터 파일로 분리

app.use(express.static('public/html'));//public디렉토리 안에서 static파일을 찾겠다는 문장

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get('*', function(request, response, next){ //get함수,주소가 *일때 function을 실행!!
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});


/////////////////////////////////////////////////////////////////
// app.use('/', indexRouter);
app.use('/', topicRouter);//test
app.use('/topic', topicRouter); //슬래시topic으로 시작하는 주소들에게 topicRouter라고 하는 미들웨어를 적용시키겠다.
/////////////////////////////////////////////////////////////////


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
