window.onload = function(){
	waterfall('main','box');
	var dataInt = {"data":[{"src":'01.jpg'},{"src":'02.jpg'},{"src":'03.jpg'},{"src":'04.jpg'},{"src":'05.jpg'}]}
	window.onscroll = function(){
		if(checkScrollSlide){
			var oParent = document.getElementById('main');
			//将数据块渲染到当前页面的尾部
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className = "box";
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className="pic";
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
var oParent = document.getElementById(parent);
var oBox = getByClass(oParent,box);
//计算整个页面显示的列数（页面宽/box的宽）;
var oBoxW = oBox[0].offsetWidth;
var cols =Math.floor(document.documentElement.clientWidth/oBoxW);
// console.log(cols);
//设置main的宽度,让他固定宽度;
oParent.style.cssText = "width:"+oBoxW*cols+"px;margin:0 auto";
var hArr = [];//存放每一列box的高度的数组；
for(var i=0;i<oBox.length;i++){
	if(i<cols){
		hArr.push(oBox[i].offsetHeight);
	}else{
		var minH = Math.min.apply(null,hArr);
		var index = getMinhIndex(hArr,minH);
		oBox[i].style.position = "absolute";
		oBox[i].style.top = minH+'px';
		oBox[i].style.left = oBox[index].offsetLeft +'px';
		hArr[index]+=oBox[i].offsetHeight;
		}
	}
}



function getByClass(parent,clsname){
	var boxArr = [];//用来存储获取到的所有class为box的元素；
	var oElements = parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className == clsname){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//得到高度最小的图片的索引；
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
//检测是否具备了滚条加载数据库的条件；
function checkScrollSlide (){
	var oParent = document.getElementById('main');
	var oBoxs= getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);

	//滚动条滚了多少个像素
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	//窗口可视区域
	var height = document.documentElement.clientHeight||document.body.clientHeight;
	return(lastBoxH<scrollTop+height)?true:false;
}


