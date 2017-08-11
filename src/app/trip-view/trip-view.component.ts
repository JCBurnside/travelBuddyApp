import { ActivatedRoute } from "@angular/router";
import { FirebaseListObservable } from "angularfire2/database";

import Trip from "../models/trip";
import { TripsService } from "../services/trips.service";
import { FirebaseService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css']
})
export class TripViewComponent implements OnInit {

  constructor(private router: Router, private route:ActivatedRoute, public ts: TripsService, public as:FirebaseService) { }
  private id;

  ngOnInit() {
  }

}
