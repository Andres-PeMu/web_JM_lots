import { Component, OnInit } from '@angular/core';
import { OpeExpensesService, getOe } from 'src/app/services/Http/ope-expenses.service';
import { SectorsService, getSectors } from 'src/app/services/Http/sectors.service';

interface LineData {
  data: number[],
  label: string,
}

@Component({
  selector: 'app-canvas-grafig-line',
  templateUrl: './canvas-grafig-line.component.html',
  styleUrls: ['./canvas-grafig-line.component.scss']
})
export class CanvasGrafigLineComponent implements OnInit {

  allSectors: getSectors[] = []
  allOe: getOe[] = []

  pieChartLabels: string[] = ['SECTORES'];
  pieChartData: LineData[] = [];
  pieChartOptions = {
    responsive: true,
  };

  constructor(
    private sectorsService: SectorsService,
    private opeExpensesService: OpeExpensesService,
  ) { }

  ngOnInit(): void {
    this.sectorsService.getAll().subscribe(dataSector => {
      this.allSectors = dataSector;
      this.actualizarGrafica();
    });

    this.opeExpensesService.getAll().subscribe(dataOe => {
      this.allOe = dataOe;
      this.actualizarGrafica();
    });
  }

  actualizarGrafica() {

    const totalesPorSector: { [key: number]: number } = {};

    this.allOe.forEach((gasto) => {
      console.log('totalesPorSector', totalesPorSector)
      if (totalesPorSector[gasto.ID_SECTOR]) {
        totalesPorSector[gasto.ID_SECTOR] += gasto.VALOR_TOTAL;
      } else {
        totalesPorSector[gasto.ID_SECTOR] = gasto.VALOR_TOTAL;
      }
    });

    this.allSectors.forEach((sector) => {
      console.log(this.pieChartLabels, this.pieChartData)
      if (totalesPorSector[sector.ID_SECTOR]) {
        this.pieChartData.push({
          data: [totalesPorSector[sector.ID_SECTOR]],
          label: sector.NAME
        });
      }
    });
  }
}
