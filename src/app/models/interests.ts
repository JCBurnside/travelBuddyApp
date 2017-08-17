export class Interests {
  constructor(
    public Beaches: Boolean = false,
    public Camping: Boolean = false,
    public Culture: Boolean = false,
    public Clubbing: Boolean = false,
    public Food: Boolean = false,
    public Health: Boolean = false,
    public History: Boolean = false,
    public Hiking: Boolean = false,
    public Movies: Boolean = false,
    public Music: Boolean = false,
    public Nature: Boolean = false,
    public Photography: Boolean = false,
    public Politics: Boolean = false,
    public Reading: Boolean = false,
    public Religion: Boolean = false,
    public RoadTrips: Boolean = false,
    public Sports: Boolean = false,
    public WaterSports: Boolean = false,
    public Wine: Boolean = false,
    public Yoga: Boolean = false
  ) { }
  static convertToInterest({ Beaches, Camping, Culture, Clubbing, Food, Health, History, Hiking, Movies, Music, Nature, Photography, Politics, Religion, Reading, RoadTrips, Sports, WaterSports, Wine, Yoga }): Interests {
    return new this(Beaches, Camping, Culture, Clubbing, Food, Health, History, Hiking, Movies, Music, Nature, Photography, Politics, Reading, Religion, RoadTrips, Sports, WaterSports, Wine, Yoga);
  }
  toStringArray(): string[] {
    let out: string[] = [];
    if (this.Beaches) {
      out.push('Beaches');
    }
    if (this.Camping) {
      out.push('Camping');
    }
    if (this.Clubbing) {
      out.push('Dance | Raves');
    }
    if (this.Culture) {
      out.push('Culture');
    }
    if (this.Food) {
      out.push('Food | Culture');
    }
    if (this.Health) {
      out.push('Health | Fitness');
    }
    if (this.History) {
      out.push('History');
    }
    if (this.Hiking) {
      out.push('Hiking');
    }
    if (this.Movies) {
      out.push('Movies');
    }
    if (this.Music) {
      out.push('Music');
    }
    if (this.Nature) {
      out.push('Nature');
    }
    if (this.Photography) {
      out.push('Photography');
    }
    if (this.Politics) {
      out.push('Politics');
    }
    if (this.Reading) {
      out.push('Reading');
    }
    if (this.Religion) {
      out.push('Religion');
    }
    if (this.RoadTrips) {
      out.push('Road Trips');
    }
    if (this.Sports) {
      out.push('Sports');
    }
    if (this.WaterSports) {
      out.push('Water Sports');
    }
    if (this.Wine) {
      out.push('Wine Connoisseur');
    }
    if (this.Yoga) {
      out.push('Yoga');
    }
    if (out.length == 0) {
      out.push('They are very Boring');
    }
    return out;
  }
}
