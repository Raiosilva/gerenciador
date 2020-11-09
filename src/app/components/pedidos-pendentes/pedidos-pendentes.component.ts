import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IPedidosPendentes } from '../../interfaces/IPedidosPendentes';

@Component({
  selector: 'app-pedidos-pendentes',
  templateUrl: './pedidos-pendentes.component.html',
  styleUrls: ['./pedidos-pendentes.component.scss']
})
export class PedidosPendentesComponent implements OnInit {
  columns: string[] = ['Nome', 'Date', 'Category', 'SubCategory'];
  dataSource: MatTableDataSource<IPedidosPendentes>;

  constructor() { }

  ngOnInit(): void {
  }

}
