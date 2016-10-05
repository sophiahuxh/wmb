var MyDateField = function(config) {
    jsGrid.Field.call(this, config);
};

// var date=moment('1985年1月9号','YYYY/M/D').locale("zh-cn").format('LL');
// console.log("date is: ", date);
 
MyDateField.prototype = new jsGrid.Field({
 
    // css: "date-field",            // redefine general property 'css'
    align: "center",              // redefine general property 'align'
 
    // myCustomProperty: "foo",      // custom property
 
    sorter: function(date1, date2) {

        return moment(date1,'YYYY/M/D') - moment(date2,'YYYY/M/D');

    },
 
    itemTemplate: function(value) {

        if(value===undefined || value===''){
            return null;
        }else{

            return moment(value,'YYYY/M/D').locale("zh-cn").format('LL');
        }
        
    },
 
    filterTemplate: function() {
        var grid = this._grid;

        // var now = new Date();
        // this._filtPicker = $("<input>").datepicker({defaultDate: new Date()});
        this._filtPicker = $("<input>").datepicker();
        
        this._filtPicker.on("keypress", function(e) {
                    if(e.which === 13) {
                        grid.search();
                        e.preventDefault();
                    }
                });
                
        return $("<div>").append(this._filtPicker);
    },

    insertTemplate: function() {

        return this._insertPicker = $("<input>").datepicker({ dateFormat: "yy-m-d", defaultDate: new Date()});
    },
 
    editTemplate: function(value) {
        
        var edit_date = moment(value,'YYYY/M/D');

        if(value==undefined || value==''){
            return this._editPicker = $("<input>").datepicker({ dateFormat: "yy-m-d", defaultDate: new Date()});
        }else{
            return this._editPicker = $("<input>").datepicker({ dateFormat: "yy-m-d"}).datepicker("setDate", new Date(edit_date));
        }
        
    },
 
    insertValue: function() {
        // console.log('this in insertValue is:', this);
        if(this._insertPicker.datepicker("getDate")==undefined){
            return null;
        }else{
            return moment(this._insertPicker.datepicker("getDate")).locale("zh-cn").format('LL');
        }
    },
 
    editValue: function() {
        // console.log('this in editValue is:', this);
        if(this._editPicker.datepicker("getDate")==undefined){
            return null;
        }else{
            return moment(this._editPicker.datepicker("getDate")).locale("zh-cn").format('LL');
        }
    },

    filterValue: function() {

        if(!this._filtPicker.datepicker("getDate")){ 
            return this._filtPicker.datepicker("getDate"); 
        }
        else{
            return moment(this._filtPicker.datepicker("getDate")).locale("zh-cn").format('LL');
        }
    }
});
 
jsGrid.fields.date = MyDateField;
