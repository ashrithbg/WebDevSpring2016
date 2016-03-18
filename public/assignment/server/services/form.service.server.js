module.exports =function(app,formModel,userModel){
    app.get("/api/assignment/user/:userId/form",getFormsByUser);
    app.get("/api/assignment/form/:formId",getFormById);
    app.delete("/api/assignment/form/:formId",deleteForm);
    app.post("/api/assignment/user/:userId/form",createForm);
    app.put("/api/assignment/form/:formId",updateForm);


    function getFormsByUser(req,res){

        res.json(formModel.findAllFormsForUser(req.params.userId));

    }

    function getFormById(req,res){
        res.json(formModel.findFormById(req.params.formId));

    }
    function deleteForm(req,res){
        res.json(formModel.deleteForm(req.params.formId));
    }

    function createForm(req,res){
        res.json(formModel.createFormForUser(req.body));
    }

    function updateForm(req,res){
        res.json(formModel.updateFormById(req.params.formId));
    }




}