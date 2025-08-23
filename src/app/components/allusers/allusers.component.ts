import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Iallusers } from '../../core/interfaces/iallusers';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-allusers',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
],
  templateUrl: './allusers.component.html',
  styleUrl: './allusers.component.css'
})
export class AllusersComponent  implements OnInit {


  private readonly _AdminService = inject(AdminService) ;
  AllUsers:WritableSignal<Iallusers[]> = signal([]) ;
  isLoading :WritableSignal<boolean> = signal(false) ;
  AllUsersList: any[] = []; // هياخد الداتا من السيرفس




  ngOnInit(): void {
    this._AdminService.GetAllUsers().subscribe({
      next:(res)=>{


        if (res.success === true) {

          this.AllUsers.set(res.data.users)

        }

      }
    })
  }




   viewUser(userId: string | number) {
    this._AdminService.GetUserById(userId).subscribe({
      next: (res) => {


        Swal.fire({
          title: `Name: ${res.data.firstName} ${res.data.lastName}`,
          html: `
            <p><b>Email:</b> ${res.data.email}</p>
            <p><b>Role:</b> ${res.data.role}</p>
            <p><b>Active:</b> ${res.data.isActive ? 'Yes' : 'No'}</p>
            <p><b>Created:</b> ${new Date(res.data.createdAt).toLocaleString()}</p>
            <p><b>Updated:</b> ${new Date(res.data.updatedAt).toLocaleString()}</p>
          `,
          icon: 'info',
          confirmButtonText: 'Close'
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error?.message || 'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }






  deleteUser(userId: string | number | null) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This user will be deleted permanently!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'No, cancel',
  }).then((result) => {
    if (result.isConfirmed && userId != null) {
      this._AdminService.DeleteUser(userId).subscribe({
        next: (res) => {
          Swal.fire('Deleted!', 'User has been removed.', 'success');

          // حذف اليوزر من الليستة مباشرة
          this.AllUsers.update(users => users.filter(user => user.id !== userId));
        },
        error: (err) => {
          // console.error(err);
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      });
    }
  });
}















































  }







































