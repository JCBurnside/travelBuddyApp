export default class Profile{
    constructor(
        public ownerID:string,
        public Name:String,
        public Gender:String='female',
        public Interests:String[]=[],
        public Headline?:String,
        public HomeTown?:String,
        public Occupation?:String,
        public ImgURL?:String,
        public $key?:string){}
}
