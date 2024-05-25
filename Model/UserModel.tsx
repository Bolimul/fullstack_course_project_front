import UserApi from "../api/UserApi"
import FormData from 'form-data';

export type User = {
    name: string,
    age: string,
    email: string,
    imgUrl: string
}


const getUserById = async(id: string, refreshToken: string) => {
    try{
        console.log('User id: ' + id)
        const user: any = await UserApi.getUser(id, refreshToken)
    if(user)
        {
            return user
        }
    }catch(err){
        console.log(err)
    }
    
}

const updateUser = async (user: User, refreshToken: string, userID: string) => {
    console.log("addStudent")
    const data = {id: userID.toString(), name: user.name, age: user.age, email: user.email, imgUrl: user.imgUrl}
    try {
        const res = await UserApi.updateUser(data, refreshToken) 
        if(!res){
            console.log("adding student failed")
        }
        else{
            console.log("adding student was successful")
            return res.refreshToken
        }
    } catch (error) {
        console.log(error)
    }
    
}

const uploadImage = async(imageURI: String) => {
        var body = new FormData();
        body.append('file', {name: "name",type: 'image/jpeg',"uri": imageURI});
        try{
            const res = await UserApi.uploadImage(body)
            if(!res.ok){
                console.log("save failed " + res.problem)
            }else{
                if(res.data){
                    const d:any = res.data
                    return d.url
                }
            }
        }catch(err){
            console.log("save failed " + err)
        }
        return ""
}

export default {getUserById, uploadImage, updateUser}