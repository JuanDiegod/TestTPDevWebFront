import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Empresa } from '../modelos/empresa';
import { EmpresaService } from './../servicios/empresa.service'

interface IDocumentos {
  name?: string;
  value?: string;
}

@Component({
  selector: 'empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  @Input() emp: Empresa;

  formEmpresa;

  documentos: IDocumentos[] = [{name:"Cedula", value: "CC"},{name:"Tarjeta de Identidad", value:"TI"},{name:"NIT", value:"NI"},{name:"Pasaporte", value:"PA"}];

  constructor(private formBuilder: FormBuilder, private webController: EmpresaService){    
    this.emp = new Empresa("",0,"","","","","","",0,0);
    this.formEmpresa = formBuilder.group({
      tipoDocumento: ['', Validators.required],
      numDocumento: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      razonSocial: [''],
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      correo: ['', [Validators.required, Validators.email]],
      autCelular: [0],
      autCorreo: [0],
    });
  }

  ngOnInit() {
    this.formEmpresa.controls['tipoDocumento'].setValue(this.emp.tipoDocumento);
    this.formEmpresa.controls['numDocumento'].setValue(this.emp.numeroDocumento);
    this.formEmpresa.controls['razonSocial'].setValue(this.emp.razonSocial);
    this.formEmpresa.controls['primerNombre'].setValue(this.emp.primerNombre);
    this.formEmpresa.controls['segundoNombre'].setValue(this.emp.segundoNombre);
    this.formEmpresa.controls['primerApellido'].setValue(this.emp.primerApellido);
    this.formEmpresa.controls['segundoApellido'].setValue(this.emp.segundoApellido);
    this.formEmpresa.controls['correo'].setValue(this.emp.correo);
    this.formEmpresa.controls['autCelular'].setValue(this.emp.autCelular);
    this.formEmpresa.controls['autCorreo'].setValue(this.emp.autCorreo);

    this.formEmpresa.get('tipoDocumento')!.valueChanges
      .subscribe(value => {
        if(value == "NI") {
          this.formEmpresa.controls["razonSocial"].setValidators(Validators.required);
          this.formEmpresa.controls["razonSocial"].updateValueAndValidity();
          this.formEmpresa.controls["primerNombre"].clearValidators();
          this.formEmpresa.controls["primerNombre"].updateValueAndValidity();
          this.formEmpresa.controls["segundoNombre"].clearValidators();
          this.formEmpresa.controls["segundoNombre"].updateValueAndValidity();
          this.formEmpresa.controls["primerApellido"].clearValidators();
          this.formEmpresa.controls["primerApellido"].updateValueAndValidity();
          this.formEmpresa.controls["segundoApellido"].clearValidators();
          this.formEmpresa.controls["segundoApellido"].updateValueAndValidity();
        } else {
          this.formEmpresa.controls["razonSocial"].clearValidators();
          this.formEmpresa.controls["razonSocial"].updateValueAndValidity();
          this.formEmpresa.controls["primerNombre"].setValidators(Validators.required);
          this.formEmpresa.controls["primerNombre"].updateValueAndValidity();
          this.formEmpresa.controls["segundoNombre"].setValidators(Validators.required);
          this.formEmpresa.controls["segundoNombre"].updateValueAndValidity();
          this.formEmpresa.controls["primerApellido"].setValidators(Validators.required);
          this.formEmpresa.controls["primerApellido"].updateValueAndValidity();
          this.formEmpresa.controls["segundoApellido"].setValidators(Validators.required);
          this.formEmpresa.controls["segundoApellido"].updateValueAndValidity();
        }
      }
    );
  }

  onClick() {
    if(this.formEmpresa.valid){
      let empresa = new Empresa(
        this.formEmpresa.get('tipoDocumento')!.value,
        this.formEmpresa.get('numDocumento')!.value,
        this.formEmpresa.get('razonSocial')!.value,
        this.formEmpresa.get('primerNombre')!.value,
        this.formEmpresa.get('segundoNombre')!.value,
        this.formEmpresa.get('primerApellido')!.value,
        this.formEmpresa.get('segundoApellido')!.value,
        this.formEmpresa.get('correo')!.value,
        this.formEmpresa.get('autCelular')!.value == true ? 1 : 0,
        this.formEmpresa.get('autCorreo')!.value == true ? 1 : 0
      );
    
      this.webController.updateEmpresa(empresa).subscribe({
          next: data => {
              alert(data.message)
          },
          error: error => {
              console.error('There was an error!', error);
          }
      });
      this.formEmpresa.reset();
    } else {
      alert('Please fill all the fields required')
    }
  }
}
