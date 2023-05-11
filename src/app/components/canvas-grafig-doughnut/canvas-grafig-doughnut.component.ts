import { Component, OnInit } from '@angular/core';
import { LotsService, getLots } from 'src/app/services/Http/lots.service';
import { SectorsService, getSectors } from 'src/app/services/Http/sectors.service';

interface getSectorsAndlotsSold extends getSectors {
  lotsSold?: number,
}

@Component({
  selector: 'app-canvas-grafig-doughnut',
  templateUrl: './canvas-grafig-doughnut.component.html',
  styleUrls: ['./canvas-grafig-doughnut.component.scss']
})
export class CanvasGrafigDoughnutComponent implements OnInit {


  allSectors: getSectorsAndlotsSold[] = []
  allLots: getLots[] = [];

  constructor(
    private sectorsService: SectorsService,
    private lotsService: LotsService
  ) { }

  ngOnInit(): void {
    this.sectorsService.getAll().subscribe(data => {
      this.allSectors = data;
    });
    this.lotsService.getAll().subscribe(data => {
      this.allLots = data;
      this.allSectors = this.allSectors.map(dataSector => {
        const lotsSold = this.allLots.filter(dataLots => dataSector.ID_SECTOR === dataLots.ID_SECTOR).length;
        return { ...dataSector, lotsSold };
      });
    });
  }

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLegend = true;

}
