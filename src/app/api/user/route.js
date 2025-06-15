import { dbConnection } from "@/app/_lib/dbConnection"
import {users} from "./usersData"
// import { UserModel } from "@/app/_lib/models/userModel"
import { addUserValadation, editUserValadation } from "./userValadation"
import { UserModel } from "@/app/_lib/models/userModel"

dbConnection()
export async function GET(){
    let allusers= await UserModel.find({})
    return new Response(JSON.stringify({data:allusers}),{status:200})
}

export async function POST(request){
    try{
        const user = await request.json()
    console.log(user);
    
    const valadation=addUserValadation.safeParse(user)
    if(!valadation.success){
        return new Response(JSON.stringify({error:valadation.error}),{status:400})
    }
    const newUser = await UserModel.create({
        name:user.name,
        email:user.email,
        address:{
            city:user.city,
            street:user.street,
            suite:user.suite
        }
    })
    console.log(newUser);
    
    return new Response(JSON.stringify({data:newUser}),{status:201})
    }catch(err){
        return new Response(JSON.stringify({error:err}),{status:500})
    }
}

export async function PUT(request){
    try{
        const {name, email, city,suite,street,id} = await request.json()
        const valadation=editUserValadation.safeParse({name, email, city,suite,street,id})
    if(!valadation.success){
        return new Response(JSON.stringify({error:valadation.error}),{status:400})
    }
    const user = UserModel.findById(id)
    if(!user){
        return new Response(JSON.stringify({error: "User not found"}), {status: 404})
    }
    const UpdatedUser = await UserModel.findByIdAndUpdate(id,{name,email,city,suite,street},{new:true})
    return new Response(JSON.stringify({data:UpdatedUser}),{status:200})
    }catch(err){
        return new Response(JSON.stringify({error:err}),{status:500})
    }
    
}

export async function DELETE(request){
    try{
        const {id} = await request.json()
        const user = UserModel.findById(id)
        if(!user){
            return new Response(JSON.stringify({error: "User not found"}), {status: 404})
        }
        const deletedUser = await UserModel.findByIdAndDelete(id)
        return new Response(JSON.stringify({data:deletedUser}),{status:200})
    }catch(err){
        return new Response(JSON.stringify({error:err}),{status:500})
    }
}