function blurElement(element, size) {
  var filterVal = 'blur(' + size + 'px)';
  $(element).css({
      'filter':filterVal,
      'webkitFilter':filterVal,
      'mozFilter':filterVal,
      'oFilter':filterVal,
      'msFilter':filterVal,
      'transition':'all 3s ease-out',
      '-webkit-transition':'all 3s ease-out',
      '-moz-transition':'all 3s ease-out',
      '-o-transition':'all 3s ease-out'
  });
}

function saveValue(e){
  var id = e.id;
  var val = e.value;
  localStorage.setItem(id,val);
}




$( document ).ready(function() {
  $('.login-form').hide();
  $('.login-words').hide();
  


  $(".welcome_words").animate({opacity: 1});



  var total_cal = 0;
  var intake_list = [];
  var nutrion = 0 ;
  $('#intake-submit').click(function(){
    var q = document.getElementById("intakeInputBox").value;
    var ds = document.getElementById("ds").value;
    if ((ds !== "Standard Reference") & (ds !== "Branded Food Products")){
      ds = "";
    }

    document.getElementById("intakeInputBox").value = getSavedValue("intakeInputBox");

    function getSavedValue (v){
      if (localStorage.getItem(v) === null) {
        return "";
      }
        return localStorage.getItem(v);
    }
    


    console.log(ds);
    $.ajax({
      url:"https://api.nal.usda.gov/ndb/search/?api_key=V9HNK7n5Os363SabjLiwkcSa3m3HWP73M8rX4f2V&format=JSON&q="+q + "&ds="+ds +"&sort=r",
      success:function(result){
        var ndbno = result.list.item[0].ndbno;
        var count = Object.keys(result.list.item).length;
        
        for (i=0;i<count;i++){
          console.log(result.list.item[i].name);
        }





        $.ajax({
          url:"https://api.nal.usda.gov/ndb/V2/reports?api_key=V9HNK7n5Os363SabjLiwkcSa3m3HWP73M8rX4f2V&type=f&format=json&ndbno="+ndbno,
          success:function(result){
            // nutrion = result.foods[0].food.nutrients[0].value;

            for (i=0;i<result.foods[0].food.nutrients.length;i++){
              if (result.foods[0].food.nutrients[i].nutrient_id == "208"){
                nutrion = result.foods[0].food.nutrients[i].value;
              }
            }




            var i = parseInt(nutrion);
            total_cal = total_cal + i;
            // console.log(result.foods[0].food.nutrients[0].value);
            $("#dailyResult").append(q+"  calories: " + nutrion + "<br>");
            $("#dailyTotal").html("Total calories you take today is: " + total_cal);
          }
        })
      }
      
    })














    




  })






















  $(".welcome_words").click(function(){
    $(".welcome_words").hide();
    $('.login-form').show();
    $('.login-words').show();
    blurElement(".welcome-bg",10);
  })




  const changeText = function (el, text, color) {
    el.text(text).css('color', color);
  };
  
  
  $('.input-password').keyup(function(){
    
    let len = this.value.length;
    const pbText = $('.signup-form .progress-bar_text');

    if (len === 0) {
      $(this).css('border-color', '#2F96EF');
      changeText(pbText, '           ', '#aaa');
    } else if (len > 0 && len <= 4) {
      $(this).css('border-color', '#FF4B47');
      changeText(pbText, 'Too weak', '#FF4B47');
    } else if (len > 4 && len <= 8) {
      $(this).css('border-color', '#F9AE35');
      changeText(pbText, 'Could be stronger', '#F9AE35');
    } else {
      $(this).css('border-color', '#2DAF7D');
      changeText(pbText, 'Strong password', '#2DAF7D');
    } 
  });
});

