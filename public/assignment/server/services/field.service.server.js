module.exports =function(app,formModel){
    app.get("/api/assignment/form/:formId/fields",getFieldsByForm);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFieldByForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteField);
    app.post("/api/assignment/form/:formId/field",createField);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);


    function getFieldsByForm(req,res){

        formModel.findAllFieldsByForm(req.params.formId)
            .then(function(fields){
                console.log(JSON.stringify(fields));
                res.json(fields);
            },function(err){
                res.status(400).send(err);
        });

    }

    function getFieldByForm(req,res){
        formModel.findFieldByForm(req.params.formId,req.params.fieldId).then(function(field){
            res.json(field);
        },function(err){
            res.status(400).send(err);
        });

    }
    function deleteField(req,res){
        formModel.deleteFieldById(req.params.formId,req.params.fieldId).then(function(fields){
            res.json(fields);
        },function(err){
            res.status(400).send(err);
        });
    }

    function createField(req,res){
        formModel.createField(req.params.formId,req.body).then(function(fields){
            res.json(fields);
        },function(err){
            res.status(400).send(err);
        });
    }

    function updateField(req,res){
        formModel.updateFieldById(req.params.formId,req.params.fieldId,req.body).then(function(fields){
            res.json(fields);
        },function(err){
            res.status(400).send(err);
        });
    }




};