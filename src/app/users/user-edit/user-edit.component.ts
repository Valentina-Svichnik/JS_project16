import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Muser } from 'src/app/shared/models/muser.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MusersService } from 'src/app/shared/services/musers.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  id: number;
  user: Muser;
  userForm: FormGroup;

  constructor(
    private activatedRouter: ActivatedRoute,
    private musersService: MusersService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe((param) => {
      this.id = param.id;
    });
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      bday: new FormControl(null, [Validators.required]),
      departament: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    });
    this.getData();
  }

  async getData() {
    if (this.id !== null && this.id !== undefined) {
      try {
        let user = this.musersService.getOneById(this.id);
        this.user = await user;
      } catch (err) {
        console.error(err);
      }
      this.userForm.patchValue({                                  //заносим значения полей в форму для редактирвоания
        name: this.user.name,
        surname: this.user.surname,
        patronymic: this.user.patronymic,
        phone: this.user.phone,
        bday: this.user.bday,
        departament: this.user.departament,
        email: this.user.email,
      });
    }
  }

  async onSave() {
    if (this.id !== null && this.id !== undefined) {
      try {
        await this.musersService.putOneById(this.id, this.userForm.value);
      } catch (err) {
        console.error(err);
      }
      this.router.navigate(['/users']);
    } else {
      try {
        let res = await this.musersService.postOne(this.userForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
      this.router.navigate(['/users']);
    }
  }

  async onDelete() {
    try {
      await this.musersService.deleteOneById(this.id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/users']);
  }
}
