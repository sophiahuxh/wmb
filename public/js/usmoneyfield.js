var USMoneyField = function USMoneyField(config) {
    jsGrid.NumberField.call(this, config);
}

USMoneyField.prototype = new jsGrid.NumberField({

    sorter: function(value1, value2) {

        // console.log("value1 & value2 are : ", value1, value2);

        if( value1 === undefined || value1 === ''){
            value1=Infinity;
        }

        if( value2 === undefined || value2 === ''){
            value2=Infinity;
        }

        return value1 - value2;

    },

    itemTemplate: function(value) {

        if(value===undefined || value===''){
            return null;
        }else{

            var result = parseFloat(value).toFixed(2);
            var result = "US$" + result;
            return result;
        }
    },

    _createTextBox: function() {
        return $("<input>").attr({type:"number", step:"any"})
            .prop("readonly", !!this.readOnly);
    },

    filterValue: function() {
        if(!this.filterControl.val()){
            return null;
        }else{
            return parseFloat(this.filterControl.val() || 0);
        }
    },

    insertValue: function() {
        if(!this.insertControl.val()){
            return null;
        }else{
            return parseFloat(this.insertControl.val() || 0);
        }
    },

    editValue: function() {
        if(!this.editControl.val()){
            return null;
        }else{
            return parseFloat(this.editControl.val() || 0);
        }
    }

});

jsGrid.fields.usmoney = USMoneyField;
