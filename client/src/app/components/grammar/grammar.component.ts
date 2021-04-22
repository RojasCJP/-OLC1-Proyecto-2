import { Component, OnInit } from "@angular/core";
import { Codigo } from "../../models/codigo";
import { GrammarService } from "../../services/grammar.service";

@Component({
  selector: "app-grammar",
  templateUrl: "./grammar.component.html",
  styleUrls: ["./grammar.component.css"],
})
export class GrammarComponent implements OnInit {
  codigo: string = "";
  codigoJson: Codigo = { codigo: "" };
  consola: string = "";
  constructor(private grammarService: GrammarService) {}

  ngOnInit(): void {}

  compile(): void {
    this.codigoJson.codigo = this.codigo;
    this.grammarService.compile(this.codigoJson).subscribe(
      (res) => {
        console.log(res);
        this.consola = res.codigo;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
