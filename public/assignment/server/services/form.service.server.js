module.exports =function(app,formModel){
    app.get("/api/assignment/user/:userId/form",getFormsByUser);
    app.get("/api/assignment/form/:formId",getFormById);
    app.delete("/api/assignment/form/:formId",deleteForm);
    app.post("/api/assignment/user/:userId/form",createForm);
    app.put("/api/assignment/form/:formId",updateForm);


    function getFormsByUser(req,res){
        console.log("formId",req.params.userId);
        res.json(formModel.findAllFormsForUser(req.params.userId));

    }

    function getFormById(req,res){
        res.json(formModel.findFormById(req.params.formId));

    }
    function deleteForm(req,res){
        res.json(formModel.deleteFormById(req.params.formId));
    }

    function createForm(req,res){
        res.json(formModel.createFormForUser(req.params.userId,req.body));
    }

    function updateForm(req,res){
        res.json(formModel.updateFormById(req.params.formId,req.body));
    }




}