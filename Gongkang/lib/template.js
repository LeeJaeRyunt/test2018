var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(title, submit){
    return `    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <title>충남대학교 빈강의실 정보 웹앱</title>
        <meta charset="utf-8">

        <!--<meta charset="utf-8">-->
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <!--<title>Creative - Start Bootstrap Theme</title>-->

        <!-- Bootstrap core CSS -->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom fonts for this template -->
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>

        <!-- Plugin CSS -->
        <link href="vendor/magnific-popup/magnific-popup.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="css/creative.min.css" rel="stylesheet">
      
    </head>


    <body id="page-top">

        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">공강러</a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">


              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="/index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="/timetable_serch_course">빈강의실검색/timetable</a>
              </li>
              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="/c">강의실 검색</a>
              </li>
              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="/contact_us.html">Contact</a>
              </li>


              </ul>
            </div>
          </div>
        </nav>

    <!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
    <section id="contact" class="bg-dark">
        
        <p>SEARCH_ LECTURE TIMETABLE ></p> 
        ${submit}
            

    </section>


    <!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->


    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    </body>
    </html>
    `;
  },list_buildings_courses:function(buildings){
    var buildingoption = '';
    var i = 0;

      while(i < buildings.length){
        //디비에 있는 building_name들을 while문을 이용하여 select의 option으로 넣는 문장!!
        buildingoption += `<option>${buildings[i].building_name}</option>` 
        i++;
      }

      return `

      <select name="list_buildings" id="select1" onchange="itemChange()" class="form-control-lg-test">
        ${buildingoption}
      </select>

      <select id="select2" name="list_courses" class="form-control-lg-test">
      </select>

      <style>
          .form-control-lg-test
          {height:calc(2.875rem + 0.5px); 
            padding:.5rem 1rem; 
            font-size:1.25rem; 
            line-height:1.0; 
            border-radius:.3rem
          }      
      </style>

      <script>

        function itemChange(){
          
          ${this.each_Building_courses_arrary()};

          var selectItem = document.getElementById("select1").value;
          
          var changeItem;

          ${this.changeItem_match()};
          
          $('#select2').empty();

          for(var count = 0; count < changeItem.length; count++){
                          var option = "<option>"+changeItem[count]+"</option>";
                          $('#select2').append(option);
                      }
          }

        </script>        
      `

  },selected_list_buildings_courses:function(buildings, posted_list_buildings, posted_list_courses){

    var buildingoption = '';
    var i = 0;

      while(i < buildings.length){
        //selected를 위한 if문!!!!
        var selected = '';
        if(buildings[i].building_name === posted_list_buildings) {
          selected = ' selected';
        }
        //디비에 있는 building_name들을 while문을 이용하여 select의 option으로 넣는 문장!!
        buildingoption += `<option ${selected}>${buildings[i].building_name}</option>` 
        i++;
      }

      return `
      <select name="list_buildings" id="select333" onchange="itemChange()" class="form-control-lg-test">
        ${buildingoption}
      </select>

      <select id="select444" name="list_courses" class="form-control-lg-test">
          <option>${posted_list_courses}</option>
      </select>

       <style>
        .form-control-lg-test
        {height:calc(2.875rem + 0.5px); 
          padding:.5rem 1rem; 
          font-size:1.25rem; 
          line-height:1.0; 
          border-radius:.3rem
        }      
       </style>

      <script>
        
        function itemChange(){
          
          ${this.each_Building_courses_arrary()};

          var selectItem = document.getElementById("select333").value;
          
          var changeItem;

          ${this.changeItem_match()};

          $('#select444').empty();

          for(var count = 0; count < changeItem.length; count++){
            var option = "<option>"+changeItem[count]+"</option>";
            $('#select444').append(option);
          }
        }

        </script>

      
      `

  },each_Building_courses_arrary:function(){
    //각 건물의 강의실 갯수만큼!!!!!!
    var tag = ``;
    tag += `
    var kong1 = [];
    var kong2 = [];
    var kong5 = ["404","405","410","411","412","413","414","415","416"];
    `;

    return tag;
    
  },changeItem_match:function(){
    //건물 갯수만큼!!!!!!
    var tag = ``;
    tag += `
    if(selectItem == "공1"){
      changeItem = kong1;
    }
    else if(selectItem == "공2"){
      changeItem = kong2;
    }
    else if(selectItem == "공5"){
      changeItem = kong5;
    }
  `;

    return tag;
    
  },authorTable:function(result){

    var tag = '<table';

    if(result == ''){
      tag += ' style="width:100%"> <tr align="center"><td width="10%">교시</td><td width="15%">월</td><td width="15%">화</td><td width="15%">수</td><td width="15%">목</td><td width="15%">금</td></tr>';
    }
    else{
      tag += ' style="width:100%"> <tr align="center"><td width="10%">교시</td><td width="15%">월</td><td width="15%">화</td><td width="15%">수</td><td width="15%">목</td><td width="15%">금</td></tr>';
      var i = 0;
      while(i < result.length){
          tag += `
              <tr>
                  <td width="10%">${result[i].교시}</td>
                  <td width="15%">${result[i].월}</td>
                  <td width="15%">${result[i].화}</td>
                  <td width="15%">${result[i].수}</td>
                  <td width="15%">${result[i].목}</td>
                  <td width="15%">${result[i].금}</td>
              </tr>
              `
          i++;
      }
    }
   
    tag += '</table>';
    return tag;

  }





  ,HTML_22:function(list, submit){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
        <meta charset="utf-8">
        <title>충남대학교 빈강의실 정보 웹앱</title>
        <meta name="description" content="A schedule management with jQuery.">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
        <link rel="stylesheet" href="dist/jquery.schedule.css">
        <link rel="stylesheet" href="dist/jquery.schedule-demo.css">
        <!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
    
    
        <!-- <meta charset="utf-8"> -->
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> -->
        <meta name="description" content="">
        <meta name="author" content="">
    
        <!-- <title>Creative - Start Bootstrap Theme</title> -->
    
        <!-- Bootstrap core CSS -->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    
        <!-- Custom fonts for this template -->
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    
        <!-- Plugin CSS -->
        <link href="vendor/magnific-popup/magnific-popup.css" rel="stylesheet">
    
        <!-- Custom styles for this template -->
        <link href="css/creative.min.css" rel="stylesheet">
      
    </head>
    <body id="page-top">
    
        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">공강러</a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
    
    
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="/index.html">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="/timetable_serch_course">빈강의실검색/timetable</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="/c">강의실 검색</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="/contact_us.html">Contact</a>
                </li>
    
    
              </ul>
            </div>
          </div>
        </nav>
    
    <!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->      

      <div class="bg-dark">
          <br></br>
          <br></br>
          <p>SEARCH_ EMPTY lecture room ></p>
          ${submit}
          ${list} 
          <br></br>
      </div>
      ${this.timetable_html_22()}

    </body>
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li>${sanitizeHtml(topics[i].title)} ${sanitizeHtml(topics[i].start_time)} ~ ${sanitizeHtml(topics[i].end_time)}의 빈강의실목록> ${sanitizeHtml(topics[i].description)} <a href="/page${topics[i].id}">  메모</a>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },list_buildings_courses_22:function(buildings){
    var buildingoption = '';
    var i = 0;

      while(i < buildings.length){
        //디비에 있는 building_name들을 while문을 이용하여 select의 option으로 넣는 문장!!
        buildingoption += `<option>${buildings[i].building_name}</option>` 
        i++;
      }

      return `

      <select name="list_buildings" id="select1" onchange="itemChange()">
        ${buildingoption}
      </select>

     

      <script>

        function itemChange(){
          ${this.each_Building_courses_arrary_22()};

          var selectItem = document.getElementById("select1").value;
          
          var changeItem;

          ${this.changeItem_match_22()};

      </script>
      `

  },selected_list_buildings_courses_22:function(buildings, posted_list_buildings, posted_list_courses){

    var buildingoption = '';
    var i = 0;

      while(i < buildings.length){
        //selected를 위한 if문!!!!
        var selected = '';
        if(buildings[i].building_name === posted_list_buildings) {
          selected = ' selected';
        }
        //디비에 있는 building_name들을 while문을 이용하여 select의 option으로 넣는 문장!!
        buildingoption += `<option ${selected}>${buildings[i].building_name}</option>` 
        i++;
      }

      return `
      <select name="list_buildings" id="select333" onchange="itemChange()">
        ${buildingoption}
      </select>

     

    
      <script>
        
        function itemChange(){
          
          ${this.each_Building_courses_arrary_22()};

          var selectItem = document.getElementById("select333").value;
          
          var changeItem;

          ${this.changeItem_match_22()};

          $('#select444').empty();

          for(var count = 0; count < changeItem.length; count++){
            var option = "<option>"+changeItem[count]+"</option>";
            $('#select444').append(option);
          }
        }

        </script>

      
      `

  },each_Building_courses_arrary_22:function(){
    //각 건물의 강의실 갯수만큼!!!!!!
    var tag = ``;
    tag += `
    var kong1 = [];
    var kong2 = [];
    var kong5 = ["404","405","410","411","412","413","414","415","416"];
    `;

    return tag;
    
  },changeItem_match_22:function(){
    //건물 갯수만큼!!!!!!
    var tag = ``;
    tag += `
    if(selectItem == "공1"){
      changeItem = kong1;
    }
    else if(selectItem == "공2"){
      changeItem = kong2;
    }
    else if(selectItem == "공5"){
      changeItem = kong5;
    }
  `;

    return tag;
    
  },list_days_time_22:function(){
    var dayoption = '';

    return `
    <select name="list_days" id="" onchange="">
      <option>월</option>
      <option>화</option>
      <option>수</option>
      <option>목</option>
      <option>금</option>
    </select>

    <select name="list_start_time" id="" onchange="">
      <option value=1>
              "0
        (08:00)"</option>
        <option value=2>  "0.5
        (08:30)"</option>
        <option value=3>"1
        (09:00)"</option>
        <option value=4>"1.5
        (09:30)"</option>
        <option value=5>"2
        (10:00)"</option>
        <option value=6>"2.5
        (10:30)"</option>
        <option value=7>"3
        (11:00)"</option>
        <option value=8>"3.5
        (11:30)"</option>
        <option value=9>"4
        (12:00)"</option>
        <option value=10>"4.5
        (12:30)"</option>
        <option value=11>"5
        (13:00)"</option>
        <option value=12>"5.5
        (13:30)"</option>
        <option value=13>"6
        (14:00)"</option>
        <option value=14>"6.5
        (14:30)"</option>
        <option value=15>"7
        (15:00)"</option>
        <option value=16>"7.5
        (15:30)"</option>
        <option value=17>"8
        (16:00)"</option>
        <option value=18>"8.5
        (16:30)"</option>
        <option value=19>"9
        (17:00)"</option>
        <option value=20>"9.5
        (17:30)"</option>
        <option value=21>"10
        (18:00)"</option>
        <option value=22>"10.5
        (18:30)"</option>
        <option value=23>"11
        (19:00)"</option>
        <option value=24>"11.5
        (19:30)"</option>
        <option value=25>"12
        (20:00)"</option>
        <option value=26>"12.5
        (20:30)"</option>
        <option value=27>"13
        (21:00)"</option>
        <option value=28>"13.5
        (21:30)"</option>
        <option value=29>"14
        (22:00)"</option>
        <option value=30>"14.5
        (22:30)"</option>
        <option value=31>"15
        (23:00)"</option>
        <option value=32>"15.5
        (23:30)"</option>

      
    </select>

    <select name="list_end_time" id="" onchange="">
    <option value=1>
              "0
        (08:00)"</option>
        <option value=2>  "0.5
        (08:30)"</option>
        <option value=3>"1
        (09:00)"</option>
        <option value=4>"1.5
        (09:30)"</option>
        <option value=5>"2
        (10:00)"</option>
        <option value=6>"2.5
        (10:30)"</option>
        <option value=7>"3
        (11:00)"</option>
        <option value=8>"3.5
        (11:30)"</option>
        <option value=9>"4
        (12:00)"</option>
        <option value=10>"4.5
        (12:30)"</option>
        <option value=11>"5
        (13:00)"</option>
        <option value=12>"5.5
        (13:30)"</option>
        <option value=13>"6
        (14:00)"</option>
        <option value=14>"6.5
        (14:30)"</option>
        <option value=15>"7
        (15:00)"</option>
        <option value=16>"7.5
        (15:30)"</option>
        <option value=17>"8
        (16:00)"</option>
        <option value=18>"8.5
        (16:30)"</option>
        <option value=19>"9
        (17:00)"</option>
        <option value=20>"9.5
        (17:30)"</option>
        <option value=21>"10
        (18:00)"</option>
        <option value=22>"10.5
        (18:30)"</option>
        <option value=23>"11
        (19:00)"</option>
        <option value=24>"11.5
        (19:30)"</option>
        <option value=25>"12
        (20:00)"</option>
        <option value=26>"12.5
        (20:30)"</option>
        <option value=27>"13
        (21:00)"</option>
        <option value=28>"13.5
        (21:30)"</option>
        <option value=29>"14
        (22:00)"</option>
        <option value=30>"14.5
        (22:30)"</option>
        <option value=31>"15
        (23:00)"</option>
        <option value=32>"15.5
        (23:30)"</option>
        
    </select>

    `
  },revert_days_time_22:function(time_id){
    var time = '';
    console.log(time_id);
    if(time_id == 1){time = "08:00"}
      else if(time_id == 2){time = "08:30"}
    else if(time_id == 3){time = "09:00"}
    else if(time_id == 4){time ="09:30"}
    else if(time_id == 5){time = "10:00"}
    else if(time_id == 6){time = "10:30"}
    else if(time_id == 7){time = "11:00"}
    else if(time_id == 8){time = "11:30"}
    else if(time_id == 9){time = "12:00"}
      else if(time_id == 10){time = "12:30"}
    else if(time_id == 11){time = "13:00"}
    else if(time_id == 12){time = "13:30"}
    else if(time_id == 13){time ="14:00"}
    else if(time_id == 14){time = "14:30"}
    else if(time_id == 15){time = "15:00"}
    else if(time_id == 16){time = "15:30"}
    else if(time_id == 17){time = "16:00"}
    else if(time_id == 18){time = "16:30"}
    else if(time_id == 19){time = "17:00"}
      else if(time_id == 20){time = "17:30"}
    else if(time_id == 21){time = "18:00"}
    else if(time_id == 22){time = "18:30"}
    else if(time_id == 23){time = "19:00"}
    else if(time_id == 24){time = "19:30"}
    else if(time_id == 25){time = "20:00"}
    else if(time_id == 26){time = "20:30"}
    else if(time_id == 27){time = "21:00"}
    else if(time_id == 28){time = "21:30"}
    else if(time_id == 29){time = "22:00"}
      else if(time_id == 30){time = "22:30"}
    else if(time_id == 31){time = "23:00"}
    else if(time_id == 32){time = "23:30"}
    




    return `
      ${time}
    `
  }
  ,timetable_html_22:function(){
  
    return `
    
    <section id="contact" class="bg-dark">
            <p>TIMETABLE</p>
            <div id="schedule4" class="jqs-demo mb-3 bg-dark" ></div>
            
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="dist/jquery.schedule.js"></script>
    <script>
      $(function () {
    
    $('#schedule4').jqs({
      periodColors: [
        ['rgba(0, 0, 0, 0.5)', '#000', '#fff'],
        ['rgba(200, 0, 0, 0.5)', '#f00', '#000'],
        ['rgba(0, 200, 0, 0.5)', '#0f0', '#000'],
        ['rgba(0, 0, 200, 0.5)', '#00f', '#000'],
        ['rgba(0, 123, 200, 0.5)', '#00f', '#000']
      ],
      periodTitle: 'No title',
      periodBackgroundColor: 'rgba(0, 0, 0, 0.5)',
      periodBorderColor: '#000',
      periodTextColor: '#fff',
      periodRemoveButton: 'Remove please !',
      periodTitlePlaceholder: 'A custom title'
    });
    
    
    
    $('#reset').click(function () {
      $('#schedule3').jqs('reset');
      $('#result').val('');
    });
    });
    </script>
    
    
    </section>
    
    
    <!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
    
    
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    
    `
  },list_timetable_serch_course_process:function(result){
    var course_name_list = '';
    var i = 0;

      while(i < result.length){
        //디비에 있는 building_name들을 while문을 이용하여 select의 option으로 넣는 문장!!
        course_name_list += `${result[i].course_name}`;
        i++;
      }

      return `${course_name_list}`;
      
      

  }
  
  
  
  
  
  
  ,HTML_33:function(list, submit){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
        <meta charset="utf-8">
        <title>충남대학교 빈강의실 정보 웹앱</title>
        <meta name="description" content="A schedule management with jQuery.">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
        <link rel="stylesheet" href="../dist/jquery.schedule.css">
        <link rel="stylesheet" href="../dist/jquery.schedule-demo.css">
        <!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
    
    
        <!-- <meta charset="utf-8"> -->
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> -->
        <meta name="description" content="">
        <meta name="author" content="">
    
        <!-- <title>Creative - Start Bootstrap Theme</title> -->
    
        <!-- Bootstrap core CSS -->
        <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    
        <!-- Custom fonts for this template -->
        <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    
        <!-- Plugin CSS -->
        <link href="../vendor/magnific-popup/magnific-popup.css" rel="stylesheet">
    
        <!-- Custom styles for this template -->
        <link href="../css/creative.min.css" rel="stylesheet">
      
    </head>
    
    
    <body id="page-top">
    
        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">공강러</a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
    
    
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="/index.html">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="/timetable_serch_course">빈강의실검색/timetable</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="/c">강의실 검색</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="/contact_us.html">Contact</a>
                </li>
    
    
              </ul>
            </div>
          </div>
        </nav>
    
    <!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
    
    
      
      <div class="bg-dark">
          <br></br>
          <br></br>
          ${submit}
          ${list} </br>
          </br>
          </br>
          </br>
          </br>
      </div>
    
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    </body>
    </html>
    `;
  },authorTable_22:function(result){

    var tag = '<table';

    if(result == ''){
      tag += ' style="width:100%"> <tr align="center"><td width="10%">교시</td><td width="15%">월</td><td width="15%">화</td><td width="15%">수</td><td width="15%">목</td><td width="15%">금</td></tr>';
    }
    else{
      tag += ' style="width:100%"> <tr align="center"><td width="10%">교시</td><td width="15%">월</td><td width="15%">화</td><td width="15%">수</td><td width="15%">목</td><td width="15%">금</td></tr>';
      var i = 0;
      while(i < result.length){
          tag += `
              <tr>
                  <td width="10%">${result[i].교시}</td>
                  <td width="15%">${result[i].월}</td>
                  <td width="15%">${result[i].화}</td>
                  <td width="15%">${result[i].수}</td>
                  <td width="15%">${result[i].목}</td>
                  <td width="15%">${result[i].금}</td>
              </tr>
              `
          i++;
      }
    }
   
    tag += '</table>';
    return tag;

  }


}








