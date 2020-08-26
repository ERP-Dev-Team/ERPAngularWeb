import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ViewDeviceService extends Query {

  document = gql`query{
    devices{_id,
      make,
      model,
      OS,
      upTime,
      cellNumber,
      IMEI,
      userAssigned{firstName},
      lastUsedUser{firstName},
      createdAt,
      updatedAt,
      batteryPercentage,
      networkStrength,
      networkName,
      lastKnownLatitude,
      lastKnownLongitude
    }
  }`
}
