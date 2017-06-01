import { Component, OnInit } from '@angular/core';
import { Aliens } from '../../models/aliens';
import { AliensService } from'../../services/aliens.service';

import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService, ReportService]
})
export class ReportComponent implements OnInit {

  aliens: Aliens[] = [];
  report: Report;

  constructor(private aliensService: AliensService,private reportService: ReportService) { }

  ngOnInit() {
        this.aliensService.getData()
            .subscribe((aliens) => {
              this.aliens = aliens;
        });
  }

// postReport() {
  
//   this.reportService
//       .postData(report)
//       .subscribe((newReport));

//   }
 }
