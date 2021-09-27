import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmpresaService } from '../servicios/empresa.service';
import { Empresa } from '../modelos/empresa';

@Component({
  selector: 'consulta-empresa',
  templateUrl: './consulta-empresa.component.html',
  styleUrls: ['./consulta-empresa.component.css']
})
export class ConsultaEmpresaComponent implements OnInit {

  formConsulta;
  empresa: Empresa;
  @Input() mostrarInfo: boolean;

  constructor(private formBuilder : FormBuilder, private webController : EmpresaService) {
    this.formConsulta = formBuilder.group({
      numDocumento: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
    })
    this.mostrarInfo = true;
    this.empresa = new Empresa("",0,"","","","","","",0,0);
   }

  ngOnInit(): void {
  }

  onClick(){
    if(this.formConsulta.valid){
      this.webController.getEmpresa(this.formConsulta.get('numDocumento')!.value).subscribe(data => {
        if(data.code == "0"){
          this.empresa = data.empresas[0];
          this.mostrarInfo = true;
          this.formConsulta.reset();
        } else {
          alert('Company not found');
        }
      });
    } else {
      alert('Please fill all the required fields');
    }
  }

}
