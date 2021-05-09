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
  archivoEntrada: File;
  constructor(private grammarService: GrammarService) {}

  ngOnInit(): void {
    localStorage.setItem("reportes", "no reportes");
  }

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

  abrirReportes() {
    this.grammarService.astTree().subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    window.open("/reportes", "_blank");
    localStorage.setItem("reportes", "no reportes");
  }

  nuevaPestana() {
    window.open("/editor", "_blank");
  }

  openFile(event: Event) {
    const elemento = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = elemento.files;
    if (fileList) {
      console.log("archivo cargado exitosamente");
      this.archivoEntrada = fileList.item(0);
      let reader: FileReader = new FileReader();
      console.log(this.archivoEntrada);
      reader.onloadend = (entry) => {
        this.codigo = reader.result?.toString();
      };
      reader.readAsText(this.archivoEntrada);
    }
  }
}
