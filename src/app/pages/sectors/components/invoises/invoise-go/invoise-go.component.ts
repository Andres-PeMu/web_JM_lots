import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DataLotsService } from 'src/app/services/date/data-lots.service';
import { InvoiceGopService, getInvoiceGo } from 'src/app/services/Http/invoice-gop.service';
import { DataInvoiseService } from 'src/app/services/date/data-invoise.service';
import { OpwService, getPaymentsAndWorkerAndOe } from 'src/app/services/Http/opw.service';

@Component({
  selector: 'app-invoise-go',
  templateUrl: './invoise-go.component.html',
  styleUrls: ['./invoise-go.component.scss']
})

export class InvoiseGoComponent implements OnInit {

  @ViewChild('content', { static: false }) content: ElementRef | undefined;

  allBills: boolean = false;
  totalPayment: number = 0;
  invoises: getInvoiceGo[] =[]
  periodicElementGop: getPaymentsAndWorkerAndOe[] | undefined = []
  periodicElementGopArray: getPaymentsAndWorkerAndOe[] | undefined = []
  dataInvoises: getInvoiceGo = {
    ID_FACTURA_PAGO: 0,
    NUMERO_FACTURA: 0,
    FECHA_GUARDADA: '',
    ID_SECTOR: 0,
    ID_TRAJADOR: 0,
    CONCEPTO: '',
    ID_GOP: 0,
    NAME: 0,
    NUMERO_LOTE: 0,
    ID_TRABAJADORES: 0,
    IDENTIFICACION: 0,
    NOMBRE: '',
    APELLIDO: '',
    CORREO: '',
    TELEFONO: '',
    ID_GASTO_O: 0,
    ID_PAGO: 0,
    ID_TRABAJADOR: 0
  }

  constructor(
    public datalot: DataLotsService,
    public dataInvoise: DataInvoiseService,
    public dataSector: DataLotsService,
    private serviseGop: OpwService,
    private invoiceGopService: InvoiceGopService,
  ) { }

  ngOnInit(): void {
    this.allBills = this.dataInvoise.fullOrPartialInvoice;
    this.invoiceGopService.getAll().subscribe(res => {
      this.invoises = res;
      console.log('invoises', this.invoises)
    });
    const idOE = this.dataInvoise.getPaymentsAndWorkerAndOe[0].ID_GASTOS_OPERACIONES;
    const idSector = parseInt(this.dataSector.id);
    this.serviseGop.getOneOe(idOE).subscribe(datas => {
      datas.forEach(createInviose =>{
        this.invoiceGopService.create({
          sectorId: idSector,
          workerId: createInviose.ID_TRABAJOR,
          concept: createInviose.TIPO_GASTO,
          idGop: idOE,
        })
      })
      this.periodicElementGopArray = datas;
      console.log('periodicElementGopArray', this.periodicElementGopArray)
      datas.forEach(data => {
        if(data.ID_GOP === this.dataInvoise.periodicElementGop.idGop!){
          this.periodicElementGop?.push(data);
          console.log('this.periodicElementGop', this.periodicElementGop)
        }
        this.totalPayment += data.VALOR_PAGO;
        console.log('this.totalPayment', this.totalPayment)
      })
    })
  }

  generatePDF() {
    const doc = new jsPDF.jsPDF();
    const content = this.content?.nativeElement;
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 205;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      position -= (imgHeight + 10);

      doc.save('pdf_generado_desde_angular.pdf');
    });
  }

}
