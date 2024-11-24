import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NgIf } from '@angular/common';
import { MemberService } from '../services/member.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    public loginService:LoginService,
    private memberService: MemberService,
    private router: Router
  ){}

  ngOnInit(){
    this.getMember();
  }

  memberId = this.loginService.userLoggedIn()? this.loginService.userLogged(): '';
  fullname = "";

  getMember() {
    this.memberService.getMemberById(this.memberId).subscribe(
      (result: any) => {
        console.log(result);
        this.fullname= `${result.data.personalInformation.firstName} ${result.data.personalInformation.lastName}`
      },
      (error: any) => {
        console.error("Error al cargar los comentarios", error)
      }
    )
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/home']);
  }
}
