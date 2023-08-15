export interface IregisterData {
   
    
   
    id:number;
    email : string;
    userName :string;
    number : string | number;
    password : string;
    confirmPass: string;
    role : string;
}

export interface Ilogin {
    email : string ;
    password : string;
}



 export interface IformValue {
   
    id : number ;
    title : string ; 
    desc : string  | number; 
    startDate : number ;
    endDate : number ;
    hour : number ;
    subTask : IsubTask[]
 }

 export interface IsubTask {
   
    id : number ;
    title : string ; 
    subdesc : string  | number; 
    startDate : number ;
    endDate : number ;
    hour : number ;
}


export const USER_TYPE = Object.freeze({
  ADMIN: "admin",                     
  ANALYST: "analyst",
  USER: "user",
});


export interface InewsData {
    id : number ;
    newsTitle : string ;
    newsDate : number ; 
    isActive : boolean ;  
    position: {
        x: number,
        y: number
      }
}

