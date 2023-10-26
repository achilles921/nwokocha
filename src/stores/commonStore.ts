import { makeAutoObservable, reaction } from "mobx";


export default class CommonStore {
    error: any | null = null;
    modalContent: string | null = null;
    modalMetaContent: string | undefined | null = null;
    modalVisible: boolean = false;
    token: string | null = window.localStorage.getItem("jwt");
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if(token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    closeModal = () => {
        this.modalVisible = false;
        this.modalContent = null;
        this.modalMetaContent = null;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

    setServerError = (error: any) => {
        this.error = error;
        
    }
}