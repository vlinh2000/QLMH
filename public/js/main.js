/*hide after submit form*/ 
    $(document).ready(function(){
        $(".close").click(function(){
          $("#allForm").hide();
        });
      });


/* Get value selected */
function getValueOption(idSelect){
var select  = $(idSelect).children();
for(var i =0;i<select.length;i++){
    if(select[i].selected){
        return select[i].innerText;
        break;
    }
}
return "";
}

/* POST FORM USING AJAX JQUERY*/
function resetAddSubject(){
    $("#createForm").children(".3input").remove();
}

$("#createForm").submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var nhom = $("#nhomInput");
    var hocky = $("#hockyInput");
    var nam= $("#namInput");
    var url = form.attr('action');
   var arrValue = [{"name":"nhom","value":getValueOption('#nhom')[5]},{"name":"hocky","value": getValueOption('#hocky')[7]},{"name":"nam","value":getValueOption('#nam').substring(9,18)}]
   var htmlInput = arrValue.map((x)=>'<input class="hide 3input" name="'+x.name+'" type="text" value="'+x.value+'" />').join("");
   const loading = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
   form.append(htmlInput);  
   $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function(data) {
       $("#status").text(data.message);
       $("#btnAdd").children().remove();
       resetAddSubject();
       loadData('http://localhost:3000/api/quanlymon');
        }
      });
      $("#status").text("");
       $("#btnAdd").append(loading);
});
  
/*click to show form create*/

// $(document).ready(function(){
//     $('#newSubject').click(function(){
//         $("#allForm").show();
//     })
//})
/*get all data when body loaded */
 window.onload = loadData('http://localhost:3000/api/quanlymon');
function loadData(url){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState===XMLHttpRequest.DONE){
           var data=  JSON.parse(xhr.responseText);
           data = data.map((x)=>'<tr class="dataLoaded"><td>'+x.TENMON+'</td><td>'+x.HOTENGV+'</td><td>'+x.NHOM+'</td><td>'+x.TERM+'</td><td>'+x.NAMHOC+'</td><td id="viewNote" class="'+x.TENMON+'" onclick="showData(this);">view</td></tr>');
           const htmlCode = data.join("");
          $('.dataLoaded').remove();
           $('#tableData').append(htmlCode);
           $("#loadingData").hide();
        }
    }
    $("#loadingData").show();
    xhr.open('GET',url);
    xhr.send();
}

function removeAllButtonActive(){
    let removeAll = new Promise(function(Resolve,Reject) {
        $(document).ready(function(){
            var allButton = $('button')
           for(var i =0;i<allButton.length;i++){
             allButton[i].className = allButton[i].className.replace('btn-secondary','btn-primary');
           }
           Resolve("Thành công");
         })
        });
        return removeAll;
}

function activeButton(id){
    $(id)[0].className= $(id)[0].className.replace('btn-primary','btn-secondary');
}


/*Active button afer click*/
$(document).ready(function(){
    $('#newSubject').click(function(){
        removeAllButtonActive().then(function(){
            activeButton('#newSubject');
            $("#allForm").show();
            $("#black-bg").show();
        })
       
    })
})


/*Not active button*/
$(document).ready(function(){
    $(".close").click(function(){
       removeAllButtonActive().then(()=>{
        activeButton("#showAll");
        $("#black-bg").hide();
        $("#viewNotes").hide();
        $("#addNote").hide();
       })
    })
})
$(document).ready(function(){
    $(".closeAddNote").click(function(){
       removeAllButtonActive().then(()=>{
        activeButton("#showAll");
        $("#black-bg").hide();
        $("#addNote").hide();
       })
    })
})




/* get subject */
function getData(url){
    let myPromise = new Promise(function(myResolve, myReject) {
        var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState===XMLHttpRequest.DONE){
           myResolve(xhr.responseText);
    }}
    xhr.open('GET',url);
    xhr.send();
});
        // const data = .then((x)=>x);
        return myPromise;
}


/* */
var nowSubject = '';
function showData(td){
    $("#viewNotes").show();
    nowSubject= td.className;
    var url = 'http://localhost:3000/api/note/'+nowSubject;
    getData(url).then((data)=>{
    data = JSON.parse(data);
    var left = data.filter((x,index)=>index%2==0);
    var right = data.filter((x,index)=>index%2!=0);
    left = left.map((x)=>'<div class="note"id="'+x.IDNOTE+'"><i class="zmdi zmdi-close-circle-o zmdi-hc-2x" onclick="deleteNote('+x.IDNOTE+');" ></i><h5>'+x.TIEUDE+'</h5> <p>'+x.NOIDUNG+'</p><a href="'+x.LINK+'">'+x.LINK+'</a><span>'+x.TIMENOTE+'</span>')
    right = right.map((x)=>'<div class="note"><i class="zmdi zmdi-close-circle-o zmdi-hc-2x" onclick="deleteNote('+x.IDNOTE+');"></i><h5>'+x.TIEUDE+'</h5> <p>'+x.NOIDUNG+'</p><a href="'+x.LINK+'">'+x.LINK+'</a><span>'+x.TIMENOTE+'</span></div>')
     $("#left").append(left);
     $("#right").append(right);
     $(".name").html(nowSubject);
     })
    }

/*click "Tất cả môn" button */
$(document).ready(function(){
    $("#showAll").click(function(){
        removeAllButtonActive().then(function(){
            activeButton("#showAll");
            loadData('http://localhost:3000/api/quanlymon');
        });
    })
})


/*NOTE */
$("#add").click(()=>{
    activeButton("#add");
    $("#black-bg").show();
    $("#addNote").show();
})


$("#addForm").submit(function(e) {
    var form = $(this);
    e.preventDefault(); // avoid to execute the actual submit of the form.
    var url = 'http://localhost:3000/api/note/'+nowSubject;
   const loading = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' 
    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function(data) {
       $("#statusNote").text(data.message);
       $("#btnAddNote").children().remove();
        }
      });
      $("#btnAddNote").children().remove();
      $("#btnAddNote").append(loading);
       
});


function deleteNote(note){
var url = 'http://localhost:3000/api/note/'+note;
$.ajax({
    type: "DELETE",
    url: url,
    success: function(data){
        console.log(data);
        var noteDiv = '#'+note;
         $(noteDiv).remove();
         $("#statusNoteDelete").text(data.message);
         $("#statusNoteDelete").show();
    }
})

}

