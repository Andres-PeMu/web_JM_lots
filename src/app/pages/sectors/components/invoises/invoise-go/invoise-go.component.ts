import { Component, ElementRef, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DataLotsService } from 'src/app/services/date/data-lots.service';

@Component({
  selector: 'app-invoise-go',
  templateUrl: './invoise-go.component.html',
  styleUrls: ['./invoise-go.component.scss']
})
export class InvoiseGoComponent {

  @ViewChild('content', { static: false }) content: ElementRef | undefined;

  allBills: boolean = false;

  constructor(
    public datalot: DataLotsService,
  ) { }

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
