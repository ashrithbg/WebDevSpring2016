module.exports =function(app,formModel){
    app.get("/api/assignment/form/:formId/fields",getFieldsByForm);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFieldByForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteField);
    app.post("/api/assignment/form/:formId/field",createField);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);


    function getFieldsByForm(req,res){

        res.json(formModel.findAllFieldsByForm(req.params.formId));

    }

    function getFieldByForm(req,res){
        res.json(formModel.findFieldByForm(req.params.formId,req.params.fieldId));

    }
    function deleteField(req,res){
        res.json(formModel.deleteFieldById(req.params.formId,req.params.fieldId));
    }

    function createField(req,res){
        res.json(formModel.createField(req.body,req.params.formId));
    }

    function updateField(req,res){
        res.json(formModel.updateFieldById(req.params.formId,req.params.fieldId,req.body));
    }




}