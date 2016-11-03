window.onload=function(){
  		//初始化变量
  		var myButton=document.getElementById("button_submit");
  		var myInput=document.getElementById("comment_input");
  		var myWin=document.getElementById("videoWin");
  		var myBlock=document.getElementById("block_right");
  		var myHisComments=document.getElementById("comments");
  		var socket = io();
        // 登录
        $('.sub1').submit(function(){
            socket.emit('username',$('.username').val());
            $('.login').hide();
            $(document).attr("title",$('.username').val());
            $('.content').show();
            return false;
        });
        // 从服务器接收数据
        socket.on('chat message', function(uname,msg){
            move(shotDanmu(msg),1);
            $('#comments').append($('<li></li>').text(uname+"说："+msg));
        });
 		//创建移动弹幕DIV
 		function shotDanmu(message){
 			var newDiv=document.createElement("div");
 			myWin.appendChild(newDiv);
 			newDiv.className="movediv";
 			newDiv.innerHTML=message;
 			newDiv.style.color='black';
 			newDiv.style.fontSize='20px';
 			newDiv.style.fontWeight='bold';
 			newDiv.style.display="inline-block";
 			var width = newDiv.offsetWidth;
 			var height = newDiv.offsetHeight; 
 			newDiv.style.display="block";
 			newDiv.style.width=(width)+'px';
 			newDiv.style.height=(height)+'px';
 			newDiv.style.position = 'absolute';
            newDiv.style.top=((Math.floor(((Math.random()*(myWin.offsetHeight-2*newDiv.offsetHeight))+newDiv.offsetHeight)/newDiv.offsetHeight))*newDiv.offsetHeight)+'px';
            return newDiv;
        }
        //弹幕移动
        function move(ele, v){
        	var startTime = new Date();
        	requestAnimationFrame(function step(){
        		var time = Date.now() - startTime;
        		var long = myWin.offsetWidth-time * v/10;
        		ele.style.left = long + "px";
        		ele.style.color='black';
        		ele.style.fontSize='20px';
        		ele.style.fontWeight='bold';
        		if (ele.offsetLeft +ele.offsetWidth>0){
        			requestAnimationFrame(step);
        		}
        		else {
        			ele.parentElement.removeChild(ele);
        		}
        	});
        }
		//提交
		function submit(){
			if(myInput.value.replace(/(^\s*)|(\s*$)/g, "")==""){}
				else {
                    socket.emit('chat message', $('.username').val(),$('#comment_input').val());
                    $('#comment_input').val('');
                    return false;
                }
                myInput.value='';
                myInput.focus();
            }
        //点击Button
        myButton.onclick =function(){
        	submit();
            return false;
        }
	    //回车操作
	    myInput.onkeydown=function(event){
	    	var e = event || window.event || arguments.callee.caller.arguments[0];
	    	if(e.keyCode== 13){
	    		submit();
	    		return false;	
	    	}
	    }
    }

