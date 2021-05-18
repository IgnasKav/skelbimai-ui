import agent from "app/api/agent";
import { User, UserFormValues } from "app/models/user";
import { makeAutoObservable } from "mobx";

export default class UserStore{
    user: User | null = null;
    constructor(){
        makeAutoObservable(this)
    }
    get isLoggedIn(){
        return !!this.user;
    }
    login = async (creds:UserFormValues)=>{
        try{
            const user = await agent.Account.login(creds);
            console.log(user);
        }
        catch (error){
            throw error;
        }
    }
}