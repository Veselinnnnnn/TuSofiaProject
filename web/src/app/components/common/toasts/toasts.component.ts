import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  host: {'class': 'toasts-container position-fixed top-0 end-0 mt-5 p-3 pt-5', 'style': 'z-index: 1200'}
})

export class ToastsComponent implements OnInit{
  
  constructor(
    public toastsService: ToastsService
  ) {}
  
  ngOnInit(): void {

  }

  isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }
}
