import agent from "app/api/agent";
import { User, UserFormValues } from "app/models/user";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { history } from "index";

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
            store.commonStore.setToken(user.token);
            runInAction(()=>this.user=user);
            console.log(user);
        }
        catch (error){
            throw error;
        }
    }
    logout = ()=>{
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
    }
}