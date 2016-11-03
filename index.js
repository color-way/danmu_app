var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'))
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});

io.on('connection',function(socket){
	// 用户登录
	socket.on('username',function(username){
		io.emit('username',username);
		console.log(username+' is login');
	});
	// 用户断开连接
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	// 发送消息到用户
	socket.on('chat message',function(uname,msg){
		io.emit('chat message',uname,msg);
		console.log(uname+' say:'+msg);
	});
});
http.listen(3000,function(){
	console.log('listening on *:3000');
});