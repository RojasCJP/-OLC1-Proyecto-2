import { Component, OnInit } from "@angular/core";
import { GrammarService } from "src/app/services/grammar.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit {
  constructor(private grammarServices: GrammarService) {}

  errores: any[] = [];
  symbolos: any[] = [];

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem("reportes") != "reportes") {
      this.grammarServices.errors().subscribe(
        (res) => (this.errores = res),
        (err) => console.log(err)
      );
      this.grammarServices.symbols().subscribe(
        (res) => (this.symbolos = res),
        (err) => console.log(err)
      );
      localStorage.setItem("reportes", "reportes");
    }
  }
}
