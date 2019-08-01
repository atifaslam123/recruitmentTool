import { BrowserModule } from '@angular/platform-browser';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { NgModule } from '@angular/core';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AppComponent } from './app.component';
import { CountdownModule } from 'ngx-countdown';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SdUiModule } from '@sdworx/sd-components';
import { RouterModule, Route } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NavbarComponent } from './navbar/navbar.component';
import { ApplicantpageComponent } from './applicantpage/applicantpage.component';
import { QuestionpageComponent } from './questionpage/questionpage.component';
import { UserspageComponent } from './userspage/userspage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnswerpageComponent } from './answerpage/answerpage.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { Component, TemplateRef } from '@angular/core';
import { TestService } from './services/performtest.service';
import { ExcelService } from './services/excel.service';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FileUploadModule } from 'ng2-file-upload';
import { AddApplicantpageComponent } from './add-applicantpage/add-applicantpage.component';
import { EditApplicantpageComponent } from './edit-applicantpage/edit-applicantpage.component';

import { MatDialogModule, MatInputModule } from "@angular/material";
import { QuestionprofileComponent } from './questionprofile/questionprofile.component';
import { AddQuestionpageComponent } from './add-questionpage/add-questionpage.component';
import { ScheduletestComponent } from './scheduletest/scheduletest.component';
import { EditQuestionpageComponent } from './edit-questionpage/edit-questionpage.component';
import { AddUserpageComponent } from './add-userpage/add-userpage.component';
import { EditnotesComponent } from './editnotes/editnotes.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { EditUserpageComponent } from './edit-userpage/edit-userpage.component';
import { PhasesApplicantpageComponent } from './phases-applicantpage/phases-applicantpage.component';
import { TestprofilepageComponent } from './testprofilepage/testprofilepage.component';
import { TestprofileComponent } from './testprofile/testprofile.component';
import { AuthGuard } from './services/auth.guard';
import { EditTestprofileComponent } from './edit-testprofile/edit-testprofile.component';
import { AddTestprofileComponent } from './add-testprofile/add-testprofile.component';
import { ApplicantprofileComponent } from './applicantprofile/applicantprofile.component';

import { AuthuserprofileComponent } from './authuserprofile/authuserprofile.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { ApplicantloginComponent } from './applicantlogin/applicantlogin.component';
import { ApplicantinfoComponent } from './applicantinfo/applicantinfo.component';
import { TestpageComponent } from './testpage/testpage.component';
import { TestcompleteComponent } from './testcomplete/testcomplete.component';
import { TestabortedComponent } from './testaborted/testaborted.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SdcardfooterComponent } from './sdcardfooter/sdcardfooter.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { EditAnswerpageComponent } from './edit-answerpage/edit-answerpage.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { LoadingScreenInterceptor } from './services/loading.interceptor';
import { InfoComponent } from './info/info.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';



const ROUTES = [
  {
    path: 'authUser',
    component: AuthuserprofileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'applicants',
    component: ApplicantpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'questions',
    component: QuestionpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UserspageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addUsers',
    component: AddUserpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'applicantProfile/:applicantID',
    component: ApplicantprofileComponent 
  },
  {
    path: 'phases/:applicantID',
    component: PhasesApplicantpageComponent
  },
  {
    path: 'userprofile/:userID',
    component: UserprofileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editUsers',
    component: EditUserpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editApplicants',
    component: EditApplicantpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addApplicants',
    component: AddApplicantpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'questionProfile/:questionID',
    component: QuestionprofileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addQuestion',
    component: AddQuestionpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: UserloginComponent
  },
  {
    path: 'forgot',
    component: ForgotpasswordComponent
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent
  },
  {
    path: 'editPassword',
    component: EditPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editQuestions',
    component: EditQuestionpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'testProfiles',
    component: TestprofilepageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'testProfile/:testProfileID',
    component: TestprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addTestProfile',
    component: AddTestprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editTestProfile',
    component: EditTestprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'information',
    component: InfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'applicantLogin',
    component: ApplicantloginComponent
  },
  {
    path: 'info',
    component: ApplicantinfoComponent
  },
  {
    path: 'test',
    component: TestpageComponent
  },
  {
    path: 'complete',
    component: TestcompleteComponent
  },
  {
    path: 'abort',
    component: TestabortedComponent
  },
  {
    path: 'editAnswers',
    component: EditAnswerpageComponent,
    canActivate: [AuthGuard],
  },



];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    
    ApplicantpageComponent,
    QuestionpageComponent,
    UserspageComponent,
    ApplicantprofileComponent,
    AnswerpageComponent,
    AddApplicantpageComponent,
    EditApplicantpageComponent,
    QuestionprofileComponent,
    AddQuestionpageComponent,
    ScheduletestComponent,
    UserloginComponent,
    AddUserpageComponent,
    TestpageComponent,
    ApplicantloginComponent,
    ApplicantinfoComponent,
    TopbarComponent,
    SdcardfooterComponent,
    TestcompleteComponent,
    TestabortedComponent,

    EditQuestionpageComponent,
    UserprofileComponent,
    EditQuestionpageComponent,
    AddUserpageComponent,
    EditnotesComponent,
    EditUserpageComponent,
    PhasesApplicantpageComponent,

    TestprofilepageComponent,
    TestprofileComponent,
    EditTestprofileComponent,
    AddTestprofileComponent,
  
    AuthuserprofileComponent,
  
    EditPasswordComponent,
  
    ForgotpasswordComponent,
    EditAnswerpageComponent,
    LoadingScreenComponent,
    InfoComponent,
    ResetpasswordComponent


  ],
  imports: [
    BrowserModule,
    NgxPasswordToggleModule,
    FormsModule,
    NgbModule, SdUiModule.forRoot(), LoadingBarModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    DragDropModule,
    FileUploadModule,
    CountdownModule

  ],
  exports: [RouterModule, ],
  providers: [CookieService, AuthGuard, TestService, ExcelService,     
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingScreenInterceptor,
    multi: true
  } 
],
  bootstrap: [AppComponent],
  entryComponents: [ScheduletestComponent, EditnotesComponent, EditTestprofileComponent]

})
export class AppModule { }
