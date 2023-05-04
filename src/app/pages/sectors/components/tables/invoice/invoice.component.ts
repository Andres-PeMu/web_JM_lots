import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceService, getInvoice } from 'src/app/services/Http/invoice.service';
import { getSalesChargesCostomersSchema } from 'src/app/services/Http/sales-charges-customers.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';

interface InputDateInvice {
  urbanization: string;
  city: string;
  date: string;
  identification: number;
  client: string;
  phone: number;
  concept: string;
  lotNumber: number;
  value: number;
  numberReceipt: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})

export class InvoiceComponent implements OnInit {

  @ViewChild('content', { static: false }) content: ElementRef | undefined;
  @Input() idCustomer: number = 0;
  @Input() idvencocli: number = 0;
  @Input() concep: string = '';

  customerName: string = '';
  generatePdf: boolean = false;
  inputDateInvice: InputDateInvice | undefined;

  constructor(
    private _serviceInvoise: InvoiceService,
    private DataSector: DataSectorsService
  ) { }

  ngOnInit(): void {
    this._serviceInvoise.create({
      sectorId: parseInt(this.DataSector.id),
      customerId: this.idCustomer,
      concept: this.concep,
      idVencocli: this.idvencocli,
    }).subscribe(res => {
      console.log('res: entre', res)
    });
    this._serviceInvoise.getOneVencocli(this.idvencocli)
      .subscribe((dataInvoise: getInvoice[]): void => {
        console.log('dataInvoise', dataInvoise)
        this.inputDateInvice = {
          urbanization: dataInvoise[0].NAME,
          city: 'El Bordo',
          date: new Date().toLocaleDateString().toString(),
          identification: dataInvoise[0].IDENTIFICACION,
          client: `${dataInvoise[0].NOMBRE} ${dataInvoise[0].APELLIDO}`,
          phone: dataInvoise[0].TELEFONO,
          concept: this.concep,
          lotNumber: dataInvoise[0].NUMERO_LOTE,
          value: dataInvoise[0].VALOR_COBRO,
          numberReceipt: dataInvoise[0].NUMERO_FACTURA,
        };
      });
      console.log('this.idvencocli', this.idvencocli)
  }

  generatePDF() {
    this.generatePdf = true;
    const doc = new jsPDF.jsPDF();
    const content = this.content?.nativeElement;
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 105; // La mitad del ancho de página A4 en mm
      const pageHeight = 297; // Alto de página A4 en mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      position -= (imgHeight + 10);

      doc.save('pdf_generado_desde_angular.pdf');
      this.generatePdf = false;
    });
  }
}
