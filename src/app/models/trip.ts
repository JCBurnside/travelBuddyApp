export default class Trip{
    constructor(
        public Owner:string,
        public Name:string,
        public StartLocation:string="",
        public Destinations?:string,
        public Price:number=0.0,
        public ModeOfTransit?:string,
        public StartDate?:Date,
        public EndDate?:Date,
        public ImageURL:string='http://placehold.it/250x250',
        public Description:string="",
        public $key?:string,
        public Travellers:string[]=[],
        public Intrests:string[]=[]){}
}