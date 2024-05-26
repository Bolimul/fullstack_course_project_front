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

const logout = async(refreshToken: string) => {
    try{
        const res = await LoginRegistrationApi.logout(refreshToken)
        if(res.status == 200)
            return true
        else
            return false
    }catch(err){
        console.log(err)
    }
}

const googleSignin = async(googleIdToken: string|null) => {
    try{
        const res = await LoginRegistrationApi.googleSignin(googleIdToken)
        console.log(res.data)
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

export default {
    login,
    registration,
    logout,
    googleSignin
}