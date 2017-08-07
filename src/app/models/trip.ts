export default class Trip{
    constructor(
        public Owner:String,
        public Name:String,
        public StartLocation:String="",
        public Destinations:String[]=new Array<string>(),
        public Price:number=0.0,
        public StartDate:Date=new Date(),
        public EndDate:Date=new Date(),
        public Travellers:String[]=new Array<string>(),
        public Intrests:String[]=new Array<string>()){}
}