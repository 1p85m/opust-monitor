var ros = new ROSLIB.Ros({url : "ws://" + "192.168.100.236" + ":9000"});

ros.on("connection", function() {console.log("websocket: connected"); });
ros.on("error", function(error) {console.log("websocket error; ", error); });
ros.on("close", function() {console.log("websocket: closed");});

function sleep(waitsecond, callback){
    var time_count = 0;
    var id = setInterval(function(){
	time_count ++;
	if (time_count >=waitsecond){
	    clearInterval(id)
	    if (callback){
		callback()
	    }
	}else{};
    },1000);
}
/*
var ls = new ROSLIB.Topic({
    ros : ros,
    name : "/read_status",
    messageType : "opust/Read_status_msg"
});

var auth = new ROSLIB.Topic({
    ros : ros,
    name : "/authority_check",
    messageType : "opust/String_opust"
});
*/

var topic_name = new ROSLIB.Topic({
    ros : ros,
    name : "/tp_name",
    messageType : "opust/String_list_msg"
});

var topic_value = new ROSLIB.Topic({
    ros : ros,
    name : "/tp_value",
    messageType : "opust/String_list_msg"
});
/*
var xx = new ROSLIB.Topic({
    ros : ros,
    name : "/String",
    messageType : "opust/String"
});
*/

var size = 0
var current_array = []
var name_array = []
topic_name.subscribe(function(sub_array) {
    name_array = sub_array
});
var check = 0
topic_value.subscribe(function(value_array) {
    if (check==0){
	lll = []
	for(i=0; i<value_array.data.length; i++){
	    lll.push("test"+i);
	    check = 1;
	}
    }else{}

    //for (num in name_list.data){
    //console.log(current_array);
    count = 0
    //console.log(name_array.data);
    current_array.concat(name_array.data)
	.forEach(item => {
	    if (current_array.includes(item) && !name_array.data.includes(item)) {
		num = current_array.indexOf(item);
		console.log("del");
		console.log(num)
		del_table(num-count)
		count += 1
	    } else if (!current_array.includes(item) && name_array.data.includes(item)) {
		console.log("add");
		num = name_array.data.indexOf(item)-size;
		add_table([item, value_array.data[Number(num)]]);
		//$(function(){
		    //$('table tr').each(function(i){
			//$(this).attr('id',item);
		    //});
		//});
		console.log(num)
		var kk = lll[num]
		var kk = new ROSLIB.Topic({
		    ros : ros,
		    name : name_array.data[num],
		    messageType : value_array.data[num]
		});
		kk.subscribe(function(message){
		    console.log(item, message)
		    //console.log(item, name_array.data[num]);
		    try{
			target = document.getElementById(item);
			target.innerHTML = message.data;
		    }catch(e){}
		});
	    };
	});
    size = current_array.length
    current_array = name_array.data

});
/*
xx.subscribe(function(message){
    console.log("######")
    console.log(message)
});
*/


/*
document.getElementById("obs_box").style.display = "block";
document.getElementById("obs_box_one").style.display = "none";
*/
var cl = document.getElementsByClassName("btn");
for (i=0;i < cl.length;i++){
    cl[i].onclick = function(){
        console.log(this.id);
        writefunction(this.id);
    };
};


function writefunction(id){
    var key = id.split("_")[0];
    var value = id.split("_")[1];
    var dt = new Date();
    now = dt.getTime()/1000.;

    if (key=="queue"){
	if (value=="start"){
	    param = true
	}else if(value=="stop"){
	    param = false
	}else{param = ""}
	console.log(value)
	msg = new ROSLIB.Message({data:param, from_node:"web", timestamp:now});
	queue.publish(msg)
    }else{};
};

function add_table(data){
    var tbl = document.getElementById("data_table");
    var newRow = tbl.insertRow();
    for (j = 0; j < tbl.rows[0].cells.length; j++) {
	var newCell = newRow.insertCell();
	newCell.innerHTML = data[j];
	//console.log(data[0])
	//$('table tr').each(function(i){
	//    $(function(){
	//	$("tr").attr("id","element"+i);
	//    })
	//});
    }
    newCell.innerHTML = '<p id="'+data[0]+'"></p>';
    //$(newCell).attr("id", data[0])
    console.log(document.getElementById(data[0]))
    //newCell.appendChild(document.createTextNode("<br>"));
}

function del_table(num){
    var tbl = document.getElementById("data_table");
    tbl.deleteRow(num+2);
}

/*
function create_table(size, new_size,data){
    var tbl = document.getElementById("data_table");
    var len = new_size - size;
    if(len > 0){
	for(i=0; i<len; i++){
	    var newRow = tbl.insertRow();
	    for (j = 0; j < tbl.rows[0].cells.length; j++) {
		var newCell = newRow.insertCell();
		newCell.innerHTML = data[j][i];
	    }
	}
    }else if(len < 0){
	for(i=0; i>len; i--){
	    tbl.deleteRow(tbl.rows.length-1);
	}
    }else{}
};
*/

/*
try{
    var camera = document.getElementById("camstream");
    camera.innerHTML = '<img style="-webkit-user-select: none;" src="http://192.168.101.153:10000/stream?topic=/cv_camera_node/image_raw" width="292" height="130">';
    //origin --> w292,h219;
}catch(e){
}
*/
