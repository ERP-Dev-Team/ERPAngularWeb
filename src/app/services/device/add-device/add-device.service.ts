import { Injectable } from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AddDeviceService extends Mutation {

  document = gql `mutation addDevice(
    $make:String, $model:String, $cellNumber:String, $IMEI: String!, $userAssigned:ID)
    {
      createDevice(deviceInput:
        {make:$make, model:$model, cellNumber:$cellNumber, IMEI:$IMEI, userAssigned:$userAssigned})
          {
            _id,
            make,		
            model,
            cellNumber,
            IMEI,
            userAssigned{firstName}
          }
    }`
}
