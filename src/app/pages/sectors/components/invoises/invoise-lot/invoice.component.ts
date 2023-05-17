import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceService, getInvoice } from 'src/app/services/Http/invoice.service';
import { DataSectorsService } from 'src/app/services/date/data-sectors.service';
import { DataInvoiseService } from 'src/app/services/date/data-invoise.service';
import { DataLotsService } from 'src/app/services/date/data-lots.service';
import { SalesChargesCustomersService, getSalesChargesCostomersSchema } from 'src/app/services/Http/sales-charges-customers.service';

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

  allBills: boolean = true;
  inputDateInvice: InputDateInvice | undefined;
  dataSales: getSalesChargesCostomersSchema[] | undefined;
  totalSales: number = 0;
  totalInvoicesForCollection: getInvoice[] = [];

  constructor(
    private _serviceInvoise: InvoiceService,
    private dataSector: DataSectorsService,
    private dataInvoise: DataInvoiseService,
    public datalot: DataLotsService,
    private _salesChargesCustomersService: SalesChargesCustomersService
  ) { }

  ngOnInit(): void {
    this.allBills = this.dataInvoise.fullOrPartialInvoice;
    const idlot = parseInt(this.datalot.id);
    this.dataInvoise.periodicElementAll.forEach(inviose => {
      this._serviceInvoise.create({
        sectorId: idlot,
        customerId: inviose.idCustomer!,
        concept: this.dataInvoise.concepto,
        idVencocli: inviose.idVencocli!,
      }).subscribe((res) => { });
    })
    this._salesChargesCustomersService.getOneLots(idlot).subscribe(dataLots => {
      dataLots.forEach(data => {
        this.totalSales += data.VALOR_COBRO;
      });
      dataLots.forEach(data => {
        this._serviceInvoise.getOneVencocli(data.ID_VENCOCLI)
          .subscribe(invoise => {
            this.totalInvoicesForCollection?.push(...invoise)
            this.setInputData();
          })
      });
      this.dataSales = dataLots;
    })
    this._serviceInvoise.create({
      sectorId: parseInt(this.dataSector.id),
      customerId: this.dataInvoise.periodicElement.idCustomer!,
      concept: this.dataInvoise.concepto,
      idVencocli: this.dataInvoise.periodicElement.idVencocli!,
    }).subscribe((res) => { });
    this.setInputData();
  }

  private setInputData(): void {
    const idVencocli = this.allBills ? this.dataInvoise.periodicElement.idVencocli! : this.totalInvoicesForCollection[0].ID_VENCOCLI!;
    this._serviceInvoise.getOneVencocli(idVencocli).subscribe((dataInvoise: getInvoice[]): void => {
      this.inputDateInvice = {
        urbanization: dataInvoise[0].NAME,
        city: 'El Bordo',
        date: new Date().toLocaleDateString().toString(),
        identification: dataInvoise[0].IDENTIFICACION,
        client: `${dataInvoise[0].NOMBRE} ${dataInvoise[0].APELLIDO}`,
        phone: dataInvoise[0].TELEFONO,
        concept: this.dataInvoise.concepto,
        lotNumber: dataInvoise[0].NUMERO_LOTE,
        value: dataInvoise[0].VALOR_COBRO,
        numberReceipt: dataInvoise[0].NUMERO_FACTURA,
      };
    });
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
