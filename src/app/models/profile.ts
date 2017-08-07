export default class Profile{
    constructor(
        public ownerID:string,
        public username:string,
        public trips:String[]=new Array<string>()){}
}