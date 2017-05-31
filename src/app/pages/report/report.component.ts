import { Component, OnInit } from '@angular/core';
import { Aliens } from '../../models/aliens';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ReportService]
})
export class ReportComponent implements OnInit {

private ALIENS_URL = 
  'https://red-wdp-api.herokuapp.com/api/mars/aliens'

  aliens: Aliens[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
        this.reportService
        .getData()
        .subscribe((data) => {
          this.aliens = data.aliens;
        });
  }

}
