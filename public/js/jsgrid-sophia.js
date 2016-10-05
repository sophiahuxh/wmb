$(function() {

    var fieldsvalue = $("#fields")[0].value;
    var fields = $.parseJSON(fieldsvalue);

    var table_accesses_string = $("#table_accesses")[0].value;
    var table_accesses = $.parseJSON(table_accesses_string);

    // console.log('is_insert value is: ', table_accesses.is_insert);

    var inqurytable = $("#inqurytable")[0].value;

    // console.log('inqurytable value is: ', inqurytable);

    // load strategy
    var origFinishInsert = jsGrid.loadStrategies.DirectLoadingStrategy.prototype.finishInsert;
    jsGrid.loadStrategies.DirectLoadingStrategy.prototype.finishInsert = function(insertedItem) {
        if(this._grid.insertFailed) { // define insertFailed on done of delete ajax request in insertFailed of controller
            return;
        }
        origFinishInsert.apply(this, arguments);
    }

    // console.log('fields from index locals.data.fields is: ', $("#fields")) ;
    // console.log('fields from index locals.data.fields is: ', $.parseJSON(fields)) ;
    // var   sophiafields=[
    //         { name: "Ship_date", type: "date", width: 150, filtering: true },
    //         { name: "Courier", type: "text", width: 50, filtering: true },
    //         { name: "Tracking_id", type: "text", width: 200 },
    //         { name: "Supplier", type: "text"},
    //         { name: "Product_id", type: "text"},
    //         { name: "Product_desc", type: "textarea", width: 150 },
    //         // { name: "Picture", type: "image", width: 150 },
    //         { type: "control" }
    //     ];

            // $.ajax({
            //     type: "GET",
            //     url: "/fields"
            // })
            //   .done(function( data ) {
            //     if ( console && console.log ) {
            //       // console.log( "Sample of data:", data.slice( 0, 100 ) );
            //     }
            //     sophiafields=data;
            //     console.log('sophiafields are: ', sophiafields);
                
    var grid = $("#jsGrid").jsGrid({
        height: "90%",
        width: "100%",
        // align: "center",

        filtering: true,
        inserting: table_accesses.is_insert,
        editing: table_accesses.is_edit,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 50,
        pageButtonCount: 15,
        deleteConfirm: "Do you really want to delete ? ",

        // rowClass: function(item, itemIndex){
        //     result = (item.我司对外型号 < 5 ) ? 'my-cell-custom-cls':''
        //     console.log(item.我司对外型号);
        //     console.log('result is ', result);
        //     return (item.我司对外型号 < 5 ) ? 'my-cell-custom-cls':'';
        // },

        // cellRenderer: function(value, item){

        //         console.log('value is: ', value);
        //     if(value == 1){
        //         console.log('value is: ', value);
        //         return $("<tr>").addClass("my-row-custom-cls");
        //     }
        // },

        rowClick: function(args) {
            showDetailsDialog(args.item);
            // console.log('rowClick item ',args.item )
            // $("#name").val('sophia test name value');
            // dlgDetails.dialog("open");
        },

        // onItemUpdating: function(args) {
        //     var previousItem = args.previousItem;
        // },  

        controller: {
            loadData: function(filter) {
                // alert('filter is '+ filter);
                return $.ajax({
                    type: "GET",
                    url: "/ship?table_name="+inqurytable + "&columns=" + fieldsvalue,
                    data: filter
                });
            },
            insertItem: function(item) {
                var d = $.Deferred();
                // alert('insertItem is: ' + item);
                // return $.ajax({
                //     type: "POST",
                //     url: "/ship",
                //     data: item
                // });
                $.ajax({
                    type: "POST",
                    url: "/ship?table_name="+inqurytable,
                    data: item
                })
                .fail(function(e) {
                    alert( "There is an error to insert data: " + e.responseText);
                    // console.log('error is: ', e);
                    grid.insertFailed = true;
                    d.resolve();
                })
                .done(function(data){

                    // console.log('data is: ', data);
                    d.resolve();
                });

                 return d.promise();
                
            },
            updateItem: function(item) {

                return $.ajax({
                    type: "PUT",
                    url: "/ship?table_name="+inqurytable,
                    data: item
                });

            },


            deleteItem: function(item) {

                return $.ajax({
                    type: "DELETE",
                    url: "/ship?table_name="+inqurytable,
                    data: item
                });

            }
        },

        fields: fields
        
    }).data("JSGrid");

    var dlgDetails = $("#dlgDetails").dialog({
        modal: true,
        autoOpen: false,
        position: { 
            my: "center",
            at: "center",
            of: $("#jsGrid")
        }
    });

    var showDetailsDialog = function(item) {
        // console.log('here in showDetailsDialog');
            if(inqurytable == '新总表'){
                // console.log('items is :', item.我司对外型号);
                $.ajax({
                    type: "GET",
                    url: "/detail?id="+item.我司对外型号 + "&table_name=新标签" 
                })
                .done(function(data){
                    // return data;
                    // console.log('return data is: ', data);
                    // console.log('return data is: ', data.Description);
                    // console.log('return data is: ', data["P/N"]);
                    // $("#name").val(item.我司对外型号);
                    // $("#age").val(client.Age);
                    // $("#address").val(client.Address);
                    // $("#country").val(client.Country);
                    // $("#married").prop("checked", client.Married);
                $("#P_N").html(data["P/N"]);
                $("#name").html(data["产品名称"]);
                $("#Description").html(data.Description);
                $("#VF").html(data["VF(v)"]);
                $("#Tc_λd").html(data["Tc(K)/λd(nm)"]);
                $("#Φv_IV").html(data["Φv (lm)/IV(mcd)"]);
                $("#Quantity").html(data.Quantity);

                $("#dlgDetails").dialog("open");
                });

                
            }
    };
    
});


