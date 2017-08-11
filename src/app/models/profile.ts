export default class Profile{
    constructor(
        public ownerID:string,
        public username:string,
        public FirstName:String,
        public LastName:String,
        public Gender:String='female',
        public $key?:string){}
}
