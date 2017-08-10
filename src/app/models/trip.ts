export default class Trip{
    constructor(
        public Owner:String,
        public Name:String,
        public StartLocation:String="",
        public Destinations:String[]=new Array<string>(),
        public Price:number=0.0,
        public ModeOfTransit:String="air",
        public StartDate?:Date,
        public EndDate?:Date,
        public Description:String="",
        public $key?:String,
        public Travellers:String[]=new Array<string>(),
        public Intrests:String[]=new Array<string>()){}
}