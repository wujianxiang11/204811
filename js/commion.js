//获取移动端尺寸
var documentWidth = document.documentElement.clientWidth;
var containerwidth=documentWidth*0.92;
var cellwidth=documentWidth*0.18;
var cellspace =documentWidth*0.04;

//获取距离
function gettop(i,j){
	return cellspace+(cellwidth+cellspace)*i;
}
function getleft(i,j){
	return cellspace+(cellwidth+cellspace)*j;
}

//获取数字背景颜色
function getNumberBackgroundColor(num){
	switch(num){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}
//获取数字的颜色
function getnumcolor(nums){
	if(nums<=4){
		return '#776e65';
	}else{
		return "#fff";
	}
}
//判断还有空间

function nospace(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				return false;
			}	
		}
	}
	return true;
}

//判断是否可以向左移动
function canmoveleft(nums){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i][j-1]==0||nums[i][j-1]==nums[i][j]){
					return true;
				}
			}	
		}
	}
		return false;
}
//判断是否可以向右移动
function canmoveright(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(nums[i][j]!=0){
				if(nums[i][j+1]==0||nums[i][j+1]==nums[i][j]){
					return true;
				}
			}	
		}
	}
		return false;
}

//判断是否向上移动


function canmovetop(nums){
	for(var i=1;i<4;i++){
		for(var j=0;i<4;j++){
			if(nums[i][j]!=0){
				if(nums[i-1][j]==0||nums[i-1][j]==nums[i][j]){
					return true;
				}
			}
		}
	}
		return false;

}
//判断是否向下移动
function canmovebottom(nums){
	for(var i=1;i<3;i++){
		for(var j=0;i<4;j++){
			if(nums[i][j]!=0){
				if(nums[i+1][j]==0||nums[i+1][j]==nums[i][j]){
					return true;
				}
			}
		}
	}
		return false;
}

function noblock(row,col1,col2,nums){
	for(var i=col1+1;i<col2;i++){
		if(nums[row][i]!=0){
			return false;
		}
	}
	return true;
}

function nobolckvertical(col,row1,row2,nums){
	for(var i=row1+1;i<row2;i++){
		if(nums[i][col]!=0){
			return false;
		}
	}
	return true;
}
function updatescore(score){
	$('.score').text(score);
}



function nomove(nums){
	if(canmoveleft(nums) || canmoveright(nums) || canmovetop(nums) || canmovebottom (nums)){
		return false
	}
	return true;
}
//判断游戏是否结束，2个条件、、没有单元格 不能移动


function isganmeover(){
	if(nospace(nums) && nomove(nums) ){
		alert("GAME OVER!!!!");
	}

}