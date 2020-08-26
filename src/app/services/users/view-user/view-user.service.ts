import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ViewUserService extends Query {

  document = gql`query{
    users{
      _id,
      userName,
      password,
      firstName,
      lastName,
      email,
      phone1,
      phone2,
      phoneIMEI,
      address1,
      address2,
      city,
      state,
      country,
      zipcode,
      joiningPlace,
      joiningDate,
      dateOfBirth,
      qualification,
      salary,
      batta,
      salaryEffectiveDate,
      salaryOld,
      battaOld,
      loginAllowed,
      lastLogin,
      lastLoginDevice,
      refPerson,
      refPersonPhone,
      refPersonAddress,
      IMEIAllowed,
      bankAccountNumber,
      bankName,
      bankBranchCity,
      bankIIFSCCode,
      bankAccountHolderName,
      designation{
        _id,
        name
      },
      rolesAllowed{
        _id,
        name
      },
      modulesAllowed{
        _id,
        name,
      },
      campsAllowed{
        _id,
        name
      },
    }
  }`
}
