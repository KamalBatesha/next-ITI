import {users} from "./usersData"
export async function GET(){
    return new Response(JSON.stringify(users))
}

export async function POST(request){
    const {name, email, city,suite,street} = await request.json()
    const user = {
        id: users[users.length - 1].id + 1,
        name,
        email,
        address: {
            street,
            suite,
            city,
        }
    }
    users.push(user)
    return new Response(JSON.stringify(user))
}

export async function PUT(request){
    const {name, email, city,suite,street,id} = await request.json()
    const userIndex = users.findIndex(user => user.id == id)
    if(userIndex == -1){
        return new Response(JSON.stringify({error: "User not found"}), {status: 404})
    }
    const UpdatedUser = {
        id: id,
        name:name||users[userIndex].name,
        email:email||users[userIndex].email,
        address: {
            street:street||users[userIndex].address.street,
            suite:suite||users[userIndex].address.suite,
            city:city||users[userIndex].address.city,
        }
    }
    users[userIndex] = UpdatedUser
    return new Response(JSON.stringify(UpdatedUser))
}

export async function DELETE(request){
    const {id} = await request.json()
    const userIndex = users.findIndex(user => user.id == id)
    if(userIndex == -1){
        return new Response(JSON.stringify({error: "User not found"}), {status: 404})
    }
    users.splice(userIndex, 1)
    return new Response(JSON.stringify({message: "User deleted successfully"}))
}