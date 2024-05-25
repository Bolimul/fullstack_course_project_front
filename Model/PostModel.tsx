import PostApi from "../api/PostApi";
import StudentApi from "../api/UserApi"
import FormData from 'form-data';
import UserModel from "./UserModel";

export type Post = {
    creator_id: string,
    post_title: string,
    post_text: string,
    imgUrl: string,
    id: string,
    creator_imgUrl: string
}


const getAllPosts = async (refreshToken: string) => {
    console.log("getAllPosts")
    let data = Array<Post>()
    let refrToken = ''
    try {
        const posts: any = await PostApi.getAllPosts(refreshToken)
        refrToken = posts.refreshToken
        if(posts.Posts){
            for (let index = 0; index < posts.Posts.length; index++) {
                const currentUser: any = await UserModel.getUserById(posts.Posts[index].creator_id, refrToken)
                refrToken = currentUser.refreshToken
                const pst: Post = {
                    creator_id: posts.Posts[index].creator_id,
                    post_title: posts.Posts[index].post_title,
                    post_text: posts.Posts[index].post_text,
                    imgUrl: posts.Posts[index].imgUrl,
                    id: posts.Posts[index]._id,
                    creator_imgUrl: currentUser.currentUser.imgUrl
                }
                data.push(pst)
            }
        }
        console.log(data)
        return {Posts: data, refreshToken: refrToken}
    } catch (error) {
        console.log("Fail reading posts from server: " + error)
    }
    return data
}

const getAllPostsOfSpecificUser = async(refreshToken: string, userID: string) => {
    console.log("getAllPosts")
    let data = Array<Post>()
    let refrToken = ''
    const currentUser: any = await UserModel.getUserById(userID, refrToken)
    refrToken = currentUser.refreshToken
    const imgUrl = currentUser.currentUser.imgUrl
    try {
        const posts: any = await PostApi.getAllPosts(refreshToken)
        if(posts.Posts){
            for (let index = 0; index < posts.Posts.length; index++) {
                
                const pst: Post = {
                    creator_id: posts.Posts[index].creator_id,
                    post_title: posts.Posts[index].post_title,
                    post_text: posts.Posts[index].post_text,
                    imgUrl: posts.Posts[index].imgUrl,
                    id: posts.Posts[index]._id,
                    creator_imgUrl: imgUrl
                }
                if(pst.creator_id == userID)
                    data.push(pst)
            }
        }
        console.log(data)
        return {Posts: data, refreshToken: refrToken}
    } catch (error) {
        console.log("Fail reading posts from server: " + error)
    }
    return data
}

const getPost = async(id: string, refreshToken: string) => {
    const defPost: Post = {
        creator_id: '0',
        post_title: '0',
        post_text: '0',
        imgUrl: '0',
        id: '0',
        creator_imgUrl: '0'}
    try {
        const post: any = await PostApi.getSpecificPost(refreshToken, id)
        let refrToken = ''
        const currentUser: any = await UserModel.getUserById(post.result.creator_id, refrToken)
        refrToken = currentUser.refreshToken
        const imgUrl = currentUser.currentUser.imgUrl
        console.log(post)
        if(post.result){
            const pst: Post = {
                creator_id: post.result.creator_id,
                post_title: post.result.post_title,
                post_text: post.result.post_text,
                imgUrl: post.result.imgUrl,
                id: post.result._id,
                creator_imgUrl: imgUrl
            }
            console.log(pst)
            return {dispPost: pst, refreshToken: post.refreshToken}
        }
        return defPost
    }catch(err){
        console.log("Fail reading post from server: " + err)
    }
    return defPost
}

const addPost = async (post: Post, refreshToken: string) => {
    console.log("addPost")
    const data = {creator_id: post.creator_id, post_title: post.post_title, imgUrl: post.imgUrl, post_text: post.post_text}
    try {
        const res = await PostApi.addPost(data, refreshToken) 
        console.log("The res is " + res)
        if(res == false){
            return false
        }
        else{
            return res
        }
    } catch (error) {
        console.log(error)
    }
    
}

const deletePost = async(postID: string, refreshToken: string) => {
    console.log("deletePost")
    try {
        const res = await PostApi.deletePost(postID, refreshToken) 
        console.log(res)
        if(!res){
            return false
        }
        else{
            return res
        }
    } catch (error) {
        console.log(error)
    }
}

const updatePost = async(post: any, refreshToken: string, id: string) => {
    console.log("updatePost")
    try {
        const res = (await PostApi.updatePost(post, refreshToken, id))
        console.log(res?.refreshToken)
        if(!res){
            return false
        }
        else{
            return res
        }
    } catch (error) {
        console.log(error)
    }
}

const uploadImage = async(imageURI: String) => {
        var body = new FormData();
        body.append('file', {name: "name",type: 'image/jpeg',"uri": imageURI});
        try{
            const res = await StudentApi.uploadImage(body)
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

export default {getAllPosts, uploadImage, getPost, addPost, deletePost, updatePost, getAllPostsOfSpecificUser}