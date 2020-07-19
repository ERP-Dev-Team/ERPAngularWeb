

export interface Lable{
    name: String,
    path: String,
    addPath: String,
}


export const LABELS:Lable[] = [
  { path: '/viewProject',name: ' Projects', addPath:'/addProject'},
  { path: '/viewCamp',  name: ' Camps',addPath:'/addCamp' },
  { path: '/viewRole', name: ' Roles' ,addPath:'/addRole'},
  { path: '/viewDesignation', name: ' Designations',addPath:'/addDesignation' },
  { path: '/viewItem', name: ' Items',addPath:'/addItem' },
  { path: '/viewUnit', name: ' Units' ,addPath:'/addUnit'},
  { path: '/viewProject', name: ' Suppliers',addPath:'/add' },
  { path: '/viewUser',  name: 'Users',addPath:'/add' },
  { path: '/viewProject',  name: 'Vehicles',addPath:'/add' },
  { path: '/viewProject', name: 'Vehicle Types',addPath:'/add' },
  { path: '/viewCaved', name: 'CAVED',addPath:'/add' },
  ]
  