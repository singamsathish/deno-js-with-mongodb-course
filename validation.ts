export default {
    async validate(ctx:any){
        let errors = [];
        let status ;
        const { value } = await ctx.request.body();
        if (!value) {
            ctx.response.status = 400; // bad request
            ctx.response.body = { error: "Please provide the required data" };
            return;
        }

        const fields = ['email','password','name'];
        for (let index = 0; index < fields.length; index++) {
            if (!value[fields[index]]) {
                status = 422; // unprocessable entity
                errors.push( { [fields[index]]: `${fields[index]} field is required` })
            }
        }

        if(status){
            ctx.response.body = {errors}
            return false;
        }


        return value;
    }
}