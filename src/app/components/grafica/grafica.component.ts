import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';




@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  public grafica: string = null;

  // para LineBarts
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Ventas' }

  ];

  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April'];

  // para BarCharts




  public barChartLabels: Label[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Preguntas' },
  ];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  constructor(private http: HttpClient,
              public wsService: WebsocketService) { }

  ngOnInit() {

    this.getData();
    this.escucharSocket();


  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  getData() {
    return this.http.get('http://localhost:5000/grafica')
    .subscribe((resp: any) => {
      console.log('getdata', resp);
      console.log({ data: resp.valores, label: resp.label });
      this.lineChartData = [{ data: resp.valores, label: resp.label }];
    });

  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica')
    .subscribe((data: any) => {
      console.log('socket', data);
      if ( this.grafica === 'linechart') {
        this.lineChartData = [{ data: data.valores, label: data.label }];
      } else {
        this.barChartData =  [{ data: data.valores, label: data.label }];
      }


    });
  }


  activarLineChart(valor: any) {



      console.log(valor.target.value);
      this.grafica = valor.target.value;



    if (!this.grafica) {
      document.getElementById('barchart').style.display = 'none';
      document.getElementById('linechart').style.display = 'block';
    } else if (this.grafica === 'linechart') {
      document.getElementById('barchart').style.display = 'none';
      document.getElementById('linechart').style.display = 'block';
    } else {
      document.getElementById('barchart').style.display = 'block';
      document.getElementById('linechart').style.display = 'none';
    }


  }




}
