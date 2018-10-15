$(document).ready(function(){
	newgame();
});

function newgame(){
	if(documentWidth>500){
		containerwidth=500;
		cellwidth=100;
		cellspace=20;
	}else{
		setphone();
	}
	//设置针对移动端的尺寸
	
	init();
	//在随机的2个单元格中生成数字
	getmathrandomnum();
	getmathrandomnum();
};
function setphone(){
	$('.body').css('width',containerwidth-cellspace*2);
	$('.body').css('height',containerwidth-cellspace*2);
	$('.body').css('padding',cellspace);
	$('.body').css('border-radius',containerwidth*0.02);
	
	$('.grid-cell').css('width',cellwidth);
	$('.grid-cell').css('height',cellwidth);
	$('.grid-cell').css('border-radius',cellwidth*0.06);
}
var nums=new Array();
var score=0;
var hascof=new Array(); //用来解决单元格叠加重复的问题

var startx=0;
var starty=0;
var endx=0;
var endy=0;
function init(){
	//初始化页面
	for( var i=0;i<4;i++){ //i代表行
		for( var j=0;j<4;j++){ //J代表
			//获取底层单元格位置
			var gridcell=$('#grid-cell-'+i+'-'+j);
			console.log(gridcell);
			gridcell.css('top',gettop(i,j));
			gridcell.css('left',getleft(i,j));
		}
	}
	//初始化数组
	//判断nums[i][j]=0的是空的单元格
	for( var i=0;i<4;i++){
		nums[i]=new Array();
		hascof[i]=new Array();
		for( var j=0;j<4;j++){
			nums[i][j]=0; //初始化数组
			hascof[i][j]=false;
		}
	}
	//动态创建上层单元格并初始化
	updateview();
	score=0;
	updatescore(score);
};



//生成上层单元格
function updateview(){
	//每次调用清空
	$('.number-cell').remove();

	for( var i=0;i<4;i++){
		for( var j=0;j<4;j++){
		$('.body').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')

			//获取上层单元格
			var numcell=$('#number-cell-'+i+'-'+j);
			//单元格是否为空显示他是否显示 通过CSS设置单元格的宽高
			if(nums[i][j]==0){
				numcell.css('width','0px');
				numcell.css('height','0px');
				numcell.css('top',gettop(i,j)+cellwidth/2);
				numcell.css('left',getleft(i,j)+cellwidth/2);
			}else{
				numcell.css('width',cellwidth);
				numcell.css('height',cellwidth);
				numcell.css('top',gettop(i,j));
				numcell.css('left',getleft(i,j));
				numcell.text(nums[i][j]);
				numcell.css('background',getNumberBackgroundColor(nums[i][j]));
				numcell.css('color',getnumcolor(nums[i][j]));
			}
			hascof[i][j]=false;
			$('.number-cell').css('border-radius',cellwidth*0.06);
			$('.number-cell').css('font-size',cellwidth*0.5);
			$('.number-cell').css('line-height',cellwidth+'px');
		}
	}
}
//在随机的空余2个单元格中生成数字
//	空余的单元格中随机找
//	随机产生2 和4 存放在单元格中
function getmathrandomnum(){
	//判断是否还有空间，如果没有空间直接返回
	if(nospace(nums)){
		return;
	}
	//随机位置
	//定义一个数组用来存放随机位置的坐标
	var count=0;
	var temp =new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				temp[count]=i*4+j;
				count++;
			}	
		}
	}
	// 通过取商和取模的方式获得X Y 坐标
	var pos=Math.floor(Math.random()*count);
	var posx=Math.floor(temp[pos]/4);
	var posy=Math.floor(temp[pos]%4);


	//随机一个数字
	var randnum=Math.random()<0.5?2:4;

	//在随机的位置上显示数字
	nums[posx][posy]=randnum;
	shownumber(posx,posy,randnum);

}

//实现键盘响应

$(document).keydown(function(event){
	event.preventDefault();
	switch(event.keyCode){
		case 37://左
			//判断是否可以向左移动
			if(canmoveleft(nums)){
				moveleft();
				setTimeout(getmathrandomnum, 200);
				setTimeout(isganmeover,500);
			}
			break;
		case 38://上
			if(canmovetop(nums)){
				movetop();
				setTimeout(getmathrandomnum, 200);
				setTimeout(isganmeover,500);
			}
			break;
		case 39://右
			if(canmoveright(nums)){
				moveright();
				setTimeout(getmathrandomnum, 200);
				setTimeout(isganmeover,500);
			}
			break;
		case 40://下
			if(canmovebottom(nums)){
				movebottom();
				setTimeout(getmathrandomnum, 200);
				setTimeout(isganmeover,500);
			}
			break;
		default:
			break;
	}
})

//实现触摸滑动响应
document.addEventListener('touchstatr',function(event){
	startx=event.tocues[0].pageX;
	starty=event.tocues[0].pageY;
});

document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	//判断滑动方向
	var deltax =endx-startx;
	var deltay =endy-starty;

	if(Math.abs(deltax)<documentWidth*0.1 && Math.abs(deltay)<documentWidth*0.08){
		return;
	}

	if(Math.abs(deltax)>=Math.abs(deltay)){
		if(deltax>0){
			if(canmoveright(nums)){
				moveright();
				setTimeout(getmathrandomnum, 200);
				setTimeout(isganmeover,500);
			}
		}else{
			if(canmoveleft(nums)){
				moveleft();
				setTimeout(getmathrandomnum, 200);
				setTimeout(isganmeover,500);
			}
		}
	}else{
		if(deltay>0){
			if(canmovebottom(nums)){
				movebottom();
				setTimeout(getmathrandomnum, 200);
				setTimeout(isganmeover,500);
			}
		}else{
			if(canmovetop(nums)){
				movetop();
				setTimeout(getmathrandomnum, 200);
				setTimeout(isganmeover,500);
			}
		}
	}
});

//向左移动 ：选择合适的落脚点
// 1：nums[i][j]=0 空的地方
// 2：叠加
function moveleft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!=0){
				for(var k=0;k<j;k++){
					if(nums[i][k]==0 && noblock(i,k,j,nums)){ //添加一个判断没有障碍物的函数
						//移动操作
						showmove(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j] && noblock(i,k,j,nums) && !hascof[i][k]){
						showmove(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						//更新分数
						updatescore(score);

						hascof[i][k]=true; //数字的叠加
						break;
					}
				}
			}	
		}
	}
	setTimeout(updateview,200);
}

//向右移动 ：选择合适的落脚点
function moveright(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(nums[i][j]!=0){
				for(var k=3;k>j;k--){
					if(nums[i][k]==0 && noblock(i,j,k,nums)){
						showmove(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j] &&noblock(i,j,k,nums) && !hascof[i][k]){
						showmove(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						//更新分数
						updatescore(score);

						hascof[i][k]=true; //数字的叠加
						break;
					}
				}
			}	
		}
	}
	setTimeout(updateview,200);
}

function movetop(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(nums[i][j]!=0){
				for(var k=0;k<i;k++){
					if(nums[k][j]==0 && nobolckvertical(j,k,i,nums)){
						showmove(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j] && nobolckvertical(j,k,i,nums)&& !hascof[i][k] ){
						showmove(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						//更新分数
						updatescore(score);

						hascof[k][j]=true; //数字的叠加
						break;
					}
				}
			}
		}
	}
	setTimeout(updateview,200);
}
function movebottom(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(nums[i][j]!=0){
				for(var k=3;k>i;k--){
					if(nums[k][j] ==0 && nobolckvertical(j,i,k,nums)){
						showmove(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					} else if(nums[k][j]==nums[i][j] && nobolckvertical(j,i,k,nums) && !hascof[k][j]){
						showmove(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						//统计分数
						score+=nums[k][j];
						//更新分数
						updatescore(score);

						hascof[k][j]=true; //数字的叠加
						break;
					}
				}
			}	
		}
	}
	setTimeout(updateview,200);
}