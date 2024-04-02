const {z}=require("zod")

/* {title:string
    description:string
   }

    {id:string}
*/

const createtodo=z.object({
    title:z.string(),
    description:z.string()
})

const completetodo=z.object({
    id:z.string()
})

module.exports={
    createtodo:createtodo,
    completetodo:completetodo
}