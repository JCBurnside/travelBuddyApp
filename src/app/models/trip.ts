export default class Trip{
    constructor(
        public Owner:string,
        public Name:string,
        public StartLocation:string="",
        public Destinations:string[]=new Array<string>(),
        public Price:number=0.0,
        public ModeOfTransit:string="air",
        public StartDate?:Date,
        public EndDate?:Date,
        public ImageURL:string="../img/placeholder.png",
        public Description:string="",
        public $key?:string,
        public Travellers:string[]=new Array<string>(),
        public Intrests:string[]=new Array<string>()){}
}