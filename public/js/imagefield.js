var MyImageField = function(config) {
    jsGrid.Field.call(this, config);
};

MyImageField.prototype = new jsGrid.Field({
 
    align: "center",              // redefine general property 'align'
 
    myCustomProperty: "foo",      // custom property
 

    itemTemplate: function(val, item) {
        return $("<img>").attr("src", "../"+item.Picture).css({ height: 50, width: 50 }).on("click", function() {
            $("#imagePreview").attr("src", "../"+ item.Picture);
            $("#dialog").dialog().dialog("open");
        });
    },
 
    insertTemplate: function() {
        var insertControl = this.insertControl = $("<input>").prop("type", "file");
        return insertControl;
    },
 
    editTemplate: function(val,item) {
        var editControl = this.editControl = $("<input>").prop("type", "file").prop("defaultValue", val);
        return editControl;        
    },
 
    insertValue: function() {
        if(this.insertControl[0].files[0] === undefined){
            return "";
        }else{
            alert(this.insertControl[0].files[0]);
            console.log('hello',this.insertControl[0].value);
            return this.insertControl[0].files[0].name;
        }
    },
 
    editValue: function() {    
        if(this.editControl[0].files[0] === undefined){
            return this.editControl[0].defaultValue;
        }else{
             
            alert(this.insertControl[0].files[0]);
            return this.editControl[0].files[0].name; 
        }
    }
    
});
 
jsGrid.fields.image = MyImageField;
