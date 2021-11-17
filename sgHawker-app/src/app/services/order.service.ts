import { SessionService } from './session.service';
import { DeliveryHawkerCenter } from './../models/submodels/deliveryHawkerCenter';
/* eslint-disable no-underscore-dangle */
import { OrderStatusEnum } from './../models/enums/order-status-enum.enum';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderGroupItemStatusEnum } from '../models/enums/order-group-item-status-enum';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = '/api';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) { }

  createNewOrder(order: Order): Observable<Order> {
    return this.httpClient
      .post<Order>(
        this.baseUrl + '/customer/orderManagement/createNewOrder',
        order
      )
      .pipe(catchError(this.handleError));
  }

  createNewGuestHawkerOrder(order: Order): Observable<Order> {
    return this.httpClient
      .post<Order>(
        this.baseUrl + '/customer/orderManagement/createNewGuestHawkerOrder',
        order
      )
      .pipe(catchError(this.handleError));
  }

  createNewGuestCustomerOrder(order: Order): Observable<Order> {
    return this.httpClient
      .post<Order>(
        this.baseUrl + '/customer/orderManagement/createNewGuestCustomerOrder',
        order
      )
      .pipe(catchError(this.handleError));
  }

  findOrderByOrderId(orderId: string): Observable<Order> {
    return this.httpClient
      .get<Order>(
        this.baseUrl + '/hawker/orderManagement/findOrderByOrderId/' + orderId
      )
      .pipe(catchError(this.handleError));
  }

  findOrdersById(orders: Order[]): Observable<Order[]> {
    return this.httpClient
      .put<Order[]>(
        this.baseUrl + '/hawker/orderManagement/findOrdersById',
        orders
      )
      .pipe(catchError(this.handleError));
  }

  findOrdersByOrderId(orders: string[]): Observable<Order[]> {
    return this.httpClient
      .put<Order[]>(
        this.baseUrl + '/hawker/orderManagement/findOrdersByOrderId',
        orders
      )
      .pipe(catchError(this.handleError));
  }

  findCompletedOrdersByCustomerId(customerId: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(
        this.baseUrl +
        '/customer/orderManagement/findCompletedOrdersByCustomerId/' +
        customerId
      )
      .pipe(catchError(this.handleError));
  }

  findOngoingOrdersByCustomerId(customerId: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(
        this.baseUrl +
        '/customer/orderManagement/findOngoingOrdersByCustomerId/' +
        customerId
      )
      .pipe(catchError(this.handleError));
  }

  findCompletedOrdersByOutletId(outletId: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(
        this.baseUrl +
        '/hawker/orderManagement/findCompletedOrdersByOutletId/' +
        outletId
      )
      .pipe(catchError(this.handleError));
  }

  findAllInProgressOrdersByOutletId(outletId: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(
        this.baseUrl +
        `/hawker/orderManagement/findAllInProgressOrdersByOutletId/${outletId}`
      )
      .pipe(catchError(this.handleError));
  }

  findAllReceivedOrdersByOutletId(outletId: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(
        this.baseUrl +
        `/hawker/orderManagement/findAllReceivedOrdersByOutletId/${outletId}`
      )
      .pipe(catchError(this.handleError));
  }

  updateOrderStatus(
    order: Order,
    newStatus: OrderStatusEnum
  ): Observable<Order> {
    return this.httpClient
      .post<Order>(
        this.baseUrl + '/hawker/orderManagement/updateOrderStatus/' + newStatus,
        order
      )
      .pipe(catchError(this.handleError));
  }

  cancelOrder(order: Order): Observable<Order> {
    return this.httpClient
      .post<Order>(
        this.baseUrl + '/customer/orderManagement/cancelOrder',
        order
      )
      .pipe(catchError(this.handleError));
  }

  updateOrderDetails(order: Order): Observable<Order> {
    return this.httpClient
      .post<Order>(
        this.baseUrl + '/customer/orderManagement/updateOrderDetails',
        order
      )
      .pipe(catchError(this.handleError));
  }

  updateFoodItemStatus(
    order: Order,
    foodItemId: string,
    foodItemStatus: OrderGroupItemStatusEnum
  ) {
    return this.httpClient.put<Order>(
      this.baseUrl +
      '/hawker/orderManagement/updateFoodItemStatus/' +
      order._id +
      '/' +
      foodItemId,
      foodItemStatus
    );
  }

  updateOrderFoodItemStatusForMultipleOrders(
    orders: Order[],
    foodItemId: string,
    foodItemStatus: OrderGroupItemStatusEnum
  ) {
    return this.httpClient
      .put<Order[]>(
        this.baseUrl +
        '/hawker/orderManagement/updateOrderFoodItemStatusForMultipleOrders/' +
        foodItemId +
        '/' +
        foodItemStatus,
        orders
      )
      .pipe(catchError(this.handleError));
  }

  updateFoodBundleItemStatus(
    order: Order,
    foodBundleId: string,
    foodItemId: string,
    foodBundleItemStatus: OrderGroupItemStatusEnum
  ) {
    return this.httpClient
      .put<Order>(
        this.baseUrl +
        '/hawker/orderManagement/updateFoodBundleItemStatus/' +
        order._id +
        '/' +
        foodBundleId +
        '/' +
        foodItemId,
        foodBundleItemStatus
      )
      .pipe(catchError(this.handleError));
  }

  updateOrderBundleItemStatusForMultipleOrders(
    orders: Order[],
    foodBundleId: string,
    foodItemId: string,
    foodBundleItemStatus: OrderGroupItemStatusEnum
  ) {
    return this.httpClient
      .put<Order[]>(
        this.baseUrl +
        '/hawker/orderManagement/updateOrderBundleItemStatusForMultipleOrders/' +
        foodBundleId +
        '/' +
        foodItemId +
        '/' +
        foodBundleItemStatus,
        orders
      )
      .pipe(catchError(this.handleError));
  }

  cancelAllInProgressOrdersByOutletId(outletId: string): Observable<any> {
    return this.httpClient
      .get<any>(
        this.baseUrl +
        `/hawker/orderManagement/cancelAllInProgressOrdersByOutletId/${outletId}`
      )
      .pipe(catchError(this.handleError));
  }

  retrieveCompletedOrdersByOutletId(
    outletId: string,
    startDate: Date,
    endDate?: Date
  ): Observable<Order[]> {
    const extraParam = endDate ? '/' + endDate : '';
    return this.httpClient.get<Order[]>(
      this.baseUrl +
      '/hawker/orderManagement/retrieveCompletedOrdersByOutletId/' +
      outletId +
      '/' +
      startDate +
      extraParam
    );
  }

  /**
   * Delivery
   */

  findAllAssociatedOrders(customerId: string): Observable<Order[]>  {
    return this.httpClient
      .get<Order[]>(this.baseUrl + `/customer/delivery/findAllAssociatedOrdersByCustomerId/${customerId}`)
      .pipe(catchError(this.handleError));
  }

  findAllDeliveryOrders(): Observable<DeliveryHawkerCenter[]> {
    return this.httpClient
      .get<DeliveryHawkerCenter[]>(this.baseUrl + `/customer/delivery/findAllDeliveryOrders/${this.sessionService.getCurrentUser()._id}`)
      .pipe(catchError(this.handleError));
  }

  findAllDeliveryOrdersByHawkerCenter(hawkerCenterName: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(this.baseUrl + `/customer/delivery/findAllDeliveryOrdersByHawkerCenter/${this.sessionService.getCurrentUser()._id}?hawkerCenterName=${hawkerCenterName}`)
      .pipe(catchError(this.handleError));
  }

  findAllCompletedDeliveryOrdersByHawkerCenter(hawkerCenterName: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(this.baseUrl + `/customer/delivery/findAllCompletedDeliveryOrdersByHawkerCenter/${this.sessionService.getCurrentUser()._id}?hawkerCenterName=${hawkerCenterName}`)
      .pipe(catchError(this.handleError));
  }

  findOngoingDeliveryOrdersByDelivererId(delivererId: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(this.baseUrl + `/customer/delivery/findOngoingDeliveryOrdersByDelivererId/${delivererId}`)
      .pipe(catchError(this.handleError));
  }

  findCompletedDeliveryOrdersByDelivererId(delivererId: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(this.baseUrl + `/customer/delivery/findCompletedDeliveryOrdersByDelivererId/${delivererId}`)
      .pipe(catchError(this.handleError));
  }

  updateDelivererForOrder(orderId: string, delivererId: string,): Observable<Order> {
    let body;

    if (delivererId !== null) {
      body = {
        delivererId
      };
    }

    return this.httpClient
      .post<Order>(this.baseUrl + `/customer/delivery/updateDelivererForOrder/${orderId}`, body)
      .pipe(catchError(this.handleError));
  }

  updateDeliveryFeeForOrder(orderId: string, newDeliveryFee: number): Observable<Order> {
    const body = {
      newDeliveryFee
    };

    return this.httpClient
      .post<Order>(this.baseUrl + `/customer/delivery/updateDeliveryFeeForOrder/${orderId}`, body)
      .pipe(catchError(this.handleError));
  }

  changeDeliveryToTakeaway(order: Order): Observable<Order> {
    return this.httpClient
      .post<Order>(
        this.baseUrl + '/customer/delivery/changeDeliveryToTakeaway',
        order
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}
