$(function () {
    $("#upload").bind("click", function () {
        
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var table = $("<table id='tbl' style='float: left;'/>");
                    var rows = e.target.result.split("\n");
                    for (var i = 0; i < rows.length; i++) {
                        var row = $("<tr />");
                        var cells = rows[i].split(",");
                        for (var j = 0; j < cells.length; j++) {
                            var cell = $("<td />");
                            cell.html(cells[j]);
                            row.append(cell);
                        }
                        
                        table.append(row);
                    }
                     
                    var table2 = $("<table id='tbl2'style='float: rigth;'/>");
                    var rows = e.target.result.split("\n");
                    for (var i = 0; i < rows.length; i++) {
                        var row = $("<tr />");
                        var cells = rows[i].split(",");
                        for (var j = 0; j < cells.length; j++) {
                            var cell = $("<td />");
                            cell.html(cells[j]);
                            row.append(cell);
                        }
                        
                        table2.append(row);
                       
                    }
                    
                   
                    $("#dvCSV").html('');
                    $("#dvCSV").append(table);

                    $("#dvCSV2").html('');
                    $("#dvCSV2").append(table2);
                     
                    $('#tbl tr').find('td:eq(0),th:eq(0),td:eq(3),th:eq(3),td:eq(11),th:eq(11),td:eq(12),th:eq(12)').remove();
                    $('#tbl2 tr').find('td:eq(0),th:eq(0),td:eq(1),th:eq(1),td:eq(4),th:eq(4),td:eq(5),th:eq(5),td:eq(6),th:eq(6),td:eq(7),th:eq(7),td:eq(8),th:eq(8),td:eq(9),th:eq(9),td:eq(10),th:eq(10)').remove();

                    var table0 = $('#tbl').tableToJSON(); // Convert the table into a javascript object
                    var table1 = $('#tbl2').tableToJSON();
                    
                    var lsdata2=JSON.stringify(table1).replace(/,{}/g, '').replace(/\\/g, '"').replace(/メールアドレス/g, 'email').replace(/状態/g, 'isdisabled').replace(/担当者名/g, 'username');//for data2
                    
                    var lsdata=JSON.stringify(table0).replace(/,{}/g, '').replace(/\\/g, '"').replace(/会社名/g, 'company').replace(/担当者名/g, 'contactstaffname').replace(/部署/g, 'division').replace(/電話番号/g, 'tel').replace(/内線/g, 'extensionnumber').replace(/携帯番号/g, 'mobilenumber').replace(/顧客ランク/g, 'customerrankId').replace(/担当営業/g, 'productcustomId');//for data 


                    
                    $("#data").val(JSON.stringify(table0).replace(/,{}/g, '').replace(/\\/g, '"').replace(/会社名/g, 'company').replace(/担当者名/g, 'contactstaffname').replace(/部署/g, 'division').replace(/電話番号/g, 'tel').replace(/内線/g, 'extensionnumber').replace(/携帯番号/g, 'mobilenumber').replace(/顧客ランク/g, 'customerrankId').replace(/担当営業/g, 'productcustomId'));

                    $("#data2").val(JSON.stringify(table1).replace(/,{}/g, '').replace(/\\/g, '"').replace(/メールアドレス/g, 'email').replace(/状態/g, 'isdisabled').replace(/担当者名/g, 'username'));
                    
                    // .replace(/メールアドレス/g, 'email').replace(/状態/g, 'isdisabled').replace(/担当者名/g, 'username'));

                    $("#main").hide();
                    
                    $('#run').click(function() {

                        
                        var textarea=$('#data'); 
                        // textarea.val(textarea.val().replace(/[[]/g,"").replace(/}]/g,","));
                        });
                        $( "#run" ).trigger( "click" );
                        setTimeout(function(){ alert("Hello");
                        postacct();    
                    }
                        
                        , 3000);
                   function postacct(){
                    // $("#posta").click(function () {
                        
                       
                     
                       
                        var obj1 = lsdata2;
                        // $('textarea#data2').val();
                        var data1 = JSON.parse(JSON.stringify(obj1));
                           
                   
                    
                        $.ajax({
                            url: "http://salestoollb.urchin.company/api/accounts?access="+localStorage.getItem('Login'),
                            type: "POST",
                            data: data1,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function(data1){
                            
                            var json1 = JSON.stringify(data1);
                            $("#data2").val(json1);
                            var i;
                            
                            localStorage.setItem('arr',lsdata);

                            
                            var lv=lsdata;

                           

                            var dd1=[];
                            var dd0=[];

                            $.each(data1, function (i, obj) {
                                dj2={}

                                var ddata1={
                                accountId:obj.id
                                 }

                                 
                                dj2=ddata1;

                                dd0.push(dj2);

                               
                            });
                              
                            $.each(JSON.parse(lv), function (i, obj0) {    
                                var dj1={}

                                 var dlv={
                                          company:obj0.company,
                                          contactstaffname:obj0.contactstaffname,
                                          division:obj0.division,
                                          tel:obj0.tel,
                                          extensionnumber:obj0.extensionnumber,
                                          fax:obj0.FAX,
                                          mobilenumber:obj0.mobilenumber,
                                          productcustomId:obj0.productcustomId,
                                         }
                                 dj1=dlv;

                                 dd1.push(dj1);
                                         
                                 
                                 })

                                //  if(dd1.id==dd0.id){
                                     var c=[]
                                    //  JSON.stringify(dd1);
                                    //  JSON.stringify(dd0);                                
                                     c['dd1']=dd1;
                                     c['dd0']=dd0;
                                   var d = $.extend( true, dd1, dd0 );
                                    
                                   
                                    var fd=[JSON.stringify(d)]
                                    console.log(fd);
                                    $("#data").val(fd);
                                    localStorage.setItem('custd',fd);
                                    sendc();
                                //  }

                                 
                        
                            },
                            error: function(xhr, status, error) {
                                var err = JSON.parse(xhr.responseText);
                                alert(err.error.details[0].message);
                              }
                        });
                       
                       
                    // })
                }
                    // $("#postc").click(function () {
                        // var obj = $('textarea#data').val();
                        function sendc(){
                        var data = localStorage.getItem('custd');
                        // $("#data").val();
                        $.ajax({
                            url: "http://salestoollb.urchin.company/api/customers?access_token="+localStorage.getItem('Login'),
                            type: "POST",
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data, textStatus, jqXHR) {
                                var json = JSON.stringify(data);
                                $("#data").val(json);
                                console.log(data);
                                alert('Data Successfully Sent!');
                                
                            }
                        });
                    // })
                }
                  
                }
                reader.readAsText($("#fileUpload")[0].files[0]);
                
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    });
});