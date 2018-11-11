var express = require('express'); //express모듈호출
var router = express.Router(); //express의 Router라는 함수 호출해서 라우터객체불러온는것
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
//.->topic.js가 위치하고 있는 routes의밑에있는lib//..->topic.js가 위치하고 있는 routes의부모디렉토리에있는lib
var template = require('../lib/template.js'); 

////////////////////////////////////////////////////////////
var http = require('http');
var url = require('url');//url모듈!!
var qs = require('querystring');
var path = require('path');
var mysql = require('mysql');//mysql의 이름으로 mysql모듈을 가져옴!!

//가져온 mysql모듈에 접속을 하고, 
//이를 자주 사용하기위해 db라는 변수에 넣어놈
var db = mysql.createConnection({ 
  host     : 'localhost',
  user     : 'root',
  password : 'mysql4665',
  database : 'test'
}); 
//실제 접속!!
db.connect();
////////////////////////////////////////////////////////////


router.get('/c', function(request, response){
    db.query('SELECT * FROM building',function (error, buildings) {
      db.query('SELECT * FROM course',function (error, courses){

        var title = 'Welcome';
        
        var html = template.HTML(title,
          `
            <form action="/create_process" method="post">
              ${template.list_buildings_courses(buildings)}
              <input type="submit" value="검색">
            </form>
          `
        );
      
        response.send(html);
      })          
    });
  });
  
  router.post('/create_process', function(request, response){

    var post = request.body;

    db.query('SELECT * FROM building',function (error, buildings) {
    db.query('SELECT * FROM course',function (error2, courses){
    db.query(`select * from (           select * from 공5_404 
                              union all select * from 공5_405
                              union all select * from 공5_410
                              union all select * from 공5_411
                              union all select * from 공5_412
                              union all select * from 공5_413
                              union all select * from 공5_414
                              union all select * from 공5_415
                              union all select * from 공5_416
                            )
                        as U where U.building_name=? and U.course_name=?;`,[post.list_buildings,post.list_courses]
              ,function(error3, result){
                if(error3){
                  throw error3;
                }
                var title = 'Welcome';
                var html = template.HTML(title,
                  `
                    <form action="/submit_process" method="post">
                      ${template.selected_list_buildings_courses(buildings, post.list_buildings, post.list_courses)}
                    <input type="submit" value="검색">
    
                    ${template.authorTable(result)}
                        
                    </form>
    
                    <style>
                      table{ border-collapse: collapse; }
                      td{ border:1px solid black; }
                    </style>
                  ` );
    
                  response.send(html);
                })          
    });
    })
    
    
      
  });


  /////////////////////////////////////////////////////////////////////////////////////////
  //시간표연계_search_course_경로_지정부분

  router.get('/timetable_serch_course', function(request, response){


    db.query('SELECT * FROM building',function (error, buildings) {
          db.query('SELECT * FROM course',function (error, courses){
            db.query(`SELECT * FROM topic`, function(error,topics){
            var list = template.list(topics);
            
            var html = template.HTML_22(list,
              `
                <form action="/timetable_serch_course_process" method="post">
                  ${template.list_buildings_courses_22(buildings)}
                  ${template.list_days_time_22()}
                  <input type="submit" value="검색">
                </form>
              `
            );
            
            response.send(html);
          })
          })          
        });


  });
  
  router.post('/timetable_serch_course_process', function(request, response){
    var post = request.body;

    // console.log("타임테이블검색프로세스"+post);
    db.query('SELECT * FROM building',function (error, buildings) {
      db.query('SELECT * FROM course',function (error2, courses){
        db.query(`select * from (               select * from 공5_404 
                                      union all select * from 공5_405
                                      union all select * from 공5_410
                                      union all select * from 공5_411
                                      union all select * from 공5_412
                                      union all select * from 공5_413
                                      union all select * from 공5_414
                                      union all select * from 공5_415
                                      union all select * from 공5_416
                                    )
            as U where U.building_name=? and U.`+post.list_days+`="" and U.id>=? and U.id<=?;`
        ,[post.list_buildings,post.list_start_time,post.list_end_time]
        ,function(error3, result){
          console.log(result.length);

          var course_name_list = "";
          var i = 0;
            while(i < result.length){
              //디비에 있는 building_name들을 while문을 이용하여 select의 option으로 넣는 문장!!
              course_name_list += result[i].course_name;
              i++;
            }
          console.log(course_name_list);
          // var course_name_list = template.list_timetable_serch_course_process(result);
            
            var start_time = template.revert_days_time_22(post.list_start_time);
            var end_time = template.revert_days_time_22(post.list_end_time);
            // console.log(post.list_start_time);
            

          db.query(`INSERT INTO topic (title, start_time, end_time, description) VALUES(? , ?, ?, `+course_name_list+`)`
            ,[post.list_buildings+"_"+post.list_days+"_", start_time, end_time],
            function(error, result2){
          db.query(`SELECT * FROM topic`, function(error,topics){
          
                    var list = template.list(topics);
                    var html = template.HTML_22(list,
                      `
                        <form action="/timetable_serch_course_process" method="post">
                          ${template.list_buildings_courses_22(buildings)}
                          ${template.list_days_time_22()}
                          <input type="submit" value="검색">
                        </form>

                        <style>
                            table{ border-collapse: collapse; }
                            td{ border:1px solid black; }
                        </style>
                      `
                    );
                    response.send(html); 
        })
        })
        
        })          
      }); 
    })
     
  });
  

  


  

  /////////////////////////////////////////////////////////////////////////////////////////

  

  router.get('/update/:pageId', function(request, response){
    var filteredId = path.parse(request.params.pageId).base;
  
    db.query('SELECT * FROM building',function (error, buildings) {
      db.query('SELECT * FROM course',function (error2, courses){
                
          db.query(`SELECT * FROM topic`, function(error,topics){
          db.query(`SELECT * FROM topic WHERE topic.id=?`,[filteredId], function(error2, topic){
                   
                   if(error2){
                     throw error2;
                   }

                  //  console.log("업데이트"+topic);

                    var title = topic[0].title;
                    var start_time = topic[0].start_time;
                    var end_time = topic[0].end_time;
                    var description = topic[0].description;
 
                    var list = template.list(topics);
                    var html = template.HTML_33(list+``,
                      `
                        <form action="/timetable_serch_course_process" method="post">
                          ${template.list_buildings_courses_22(buildings)}
                          ${template.list_days_time_22()}
                          <input type="submit" value="검색">
                        </form>
 
                        <h2>${sanitizeHtml(title)} ${sanitizeHtml(start_time)} ~ ${sanitizeHtml(end_time)}의 빈강의실 목록></h2>
                        ${sanitizeHtml(description)}<br></br>

                        <form action="/update_process" method="post">
                            <input type="hidden" name="id" value="${topic[0].id}">
                            <p>
                              <textarea name="memo" placeholder="memo">${sanitizeHtml(topic[0].memo)}</textarea>
                            </p>
                          
                            <p>
                              <input type="submit">
                            </p>
                        </form>
 
                        
                        <form action="delete_process" method="post">
                          <a href="/update/${filteredId}">update</a>
                          <input type="hidden" name="id" value="${filteredId}">
                          <input type="submit" value="delete">
                          <br></br>
                        </form>
 
                        <style>
                            table{ border-collapse: collapse; }
                            td{ border:1px solid black; }
                        </style>
                      `
                    );
                    response.send(html); 
 
       })
        })
      }); 
    })
  });
  
  router.post('/update_process', function(request, response){
    var post = request.body;
    var id = post.id;
    var title = post.title;
    var memo = post.memo;

    db.query('UPDATE topic SET memo=? WHERE id=?'
          , [post.memo, post.id]
          , function(error, result){

            response.redirect(`/page${id}`);
      })

  });
  
  router.post('/delete_process', function(request, response){
    var post = request.body;
    var id = post.id;
    var filteredId = path.parse(id).base;

    db.query('DELETE FROM topic WHERE id = ?', [filteredId], function(error, result){
      if(error){
        throw error;
      }
      response.redirect('/timetable_serch_course');
    });
  });
  
  router.get('/page:pageId', function(request, response, next) { 
    var filteredId = path.parse(request.params.pageId).base;

    db.query('SELECT * FROM building',function (error, buildings) {
     db.query('SELECT * FROM course',function (error2, courses){
         
         db.query(`SELECT * FROM topic`, function(error3,topics){
         db.query(`SELECT * FROM topic WHERE topic.id=?`,[filteredId],function(error4, topic){
           if(error4){
             throw error4;
           }
                  // console.log("페이지아이디"+topic);

                   var title = topic[0].title;
                   var start_time = topic[0].start_time;
                   var end_time = topic[0].end_time;
                   var description = topic[0].description;;
                   var memo = topic[0].memo;

                   var list = template.list(topics);
                   var html = template.HTML_22(list,
                     `
                       <form action="/timetable_serch_course_process" method="post">
                         ${template.list_buildings_courses_22(buildings)}
                         ${template.list_days_time_22()}
                         <input type="submit" value="검색">
                       </form>

                       <h2>${title}${start_time} ~ ${end_time}의 빈강의실 목록></h2>
                       <p>${description}</p>
                       memo : ${memo}<br></br>

                       
                       <form action="delete_process" method="post">
                          <a href="/update/${filteredId}">update</a>

                          <input type="hidden" name="id" value="${filteredId}">
                          <input type="submit" value="delete">
                          <br></br>
                       </form>

                       <style>
                           table{ border-collapse: collapse; }
                           td{ border:1px solid black; }
                       </style>
                     `
                   );
                   response.send(html); 

      })
       })
       
       
              
     }); 
   })
 });
  module.exports = router; //이 topic.js를 사용하기 위해서는 누구를 export시킬지 적어줘야함!!!