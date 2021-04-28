import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GrammarComponent } from "./components/grammar/grammar.component";
import { ReportsComponent } from "./components/reports/reports.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/editor",
    pathMatch: "full",
  },
  {
    path: "editor",
    component: GrammarComponent,
  },
  {
    path: "reportes",
    component: ReportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
