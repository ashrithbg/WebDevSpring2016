module.exports =function(app,formModel){
    app.get("/api/assignment/user/:userId/form",getFormsByUser);
    app.get("/api/assignment/form/:formId",getFormById);
    app.delete("/api/assignment/form/:formId",deleteForm);
    app.post("/api/assignment/user/:userId/form",createForm);
    app.put("/api/assignment/form/:formId",updateForm);

    function getFormsByUser(req,res){
        console.log("formId",req.params.userId);

        formModel.findAllFormsForUser(req.params.userId).then(
            function(forms) {
                res.json(forms);
            }, function(err){
                res.status(400).send(err);
            });

    }

    function getFormById(req,res){
        formModel.findFormById(req.params.formId).then( function(form) {
            res.json(form);
        }, function(err){
            res.status(400).send(err);
        });

    }
    function deleteForm(req,res){
        formModel.deleteFormById(req.params.formId).then(
            function(forms){
                res.json(forms);

        }, function(err){
                res.status(400).send(err);
            });
    }

    function createForm(req,res){
        formModel.createFormForUser(req.params.userId,req.body).then(
            function(forms){
                console.log("forms",JSON.stringify(forms));
                res.json(forms);
            },
            function(err){
                res.status(400).send(err);
            }
        );
    }

    function updateForm(req,res){
        formModel.updateFormById(req.params.formId,req.body).then(
            function(forms){
                res.json(forms);
            },
            function(err){
                res.status(400).send(err);
            }
        );
    }

};