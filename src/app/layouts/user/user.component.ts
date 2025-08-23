import { Component } from '@angular/core';
import { NavuserComponent } from "../../components/navuser/navuser.component";
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavuserComponent, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
