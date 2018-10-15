function shownumber(i,j,randnum){
	var numcell=$('#number-cell-'+i+'-'+j);
	numcell.css('background',getNumberBackgroundColor(randnum));
	numcell.css('color',getnumcolor(randnum));
	numcell.text(randnum);

	numcell.animate({
		width:cellwidth,
		heigh:cellwidth,
		top: gettop(i,j),
		left: getleft(i,j)
	}, 500);
}
//通过动画显示移动单元格
function showmove(fromi,fromj,toi,toj){
	var numcell=$('#number-cell-'+fromi+'-'+fromj);

	numcell.animate({
		top:gettop(toi,toj),
		left:getleft(toi,toj)
	},200)
}