interface Register{
    username:string,
    email:string,
    password:string,
    img?:string,
    country:string,
    phone?:string,
    desc?:string,
    isSeller?:boolean
}

interface Login{
    email:string,
    username:string,
    password:string
}