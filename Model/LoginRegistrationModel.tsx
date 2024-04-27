import LoginRegistrationApi from "../api/LoginRegistrationApi";

const login = async(email: string, password: string) => {
    try{
        const res = await LoginRegistrationApi.login(email, password)
        if(!res.ok){
            return false
        }
        else{
            const data: any = res.data
            return data
        }
    }catch(err){
        console.log(err)
    }
}

const registration = async(user: any) => {
    try{
        const res = await LoginRegistrationApi.registration(user)
        if(!res.ok){
            return false
        }
        else{
            return await login(user.email, user.password)
        }
    }catch(err){
        console.log(err)
    }
}

export default {
    login,
    registration
}