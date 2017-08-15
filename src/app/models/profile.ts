import { Interests } from "./interests";
export default class Profile{
    constructor(
        public ownerID    : string,
        public Name       : String,
        public Interest   : Interests=new Interests(),
        public Gender     : String='female',
        public Headline?  : String,
        public Occupation?: String,
        public ImgURL    : string='',
        public Hometown?  : String,
        public $key?      : string
    ){}
}
