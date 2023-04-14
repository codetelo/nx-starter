import roles from './roles';

const Employee = [ roles.Manager, roles.Admin, roles.SuperAdmin];
const Manager = [roles.Manager, roles.Admin, roles.SuperAdmin];
const Admin = [roles.Admin, roles.SuperAdmin];
const SuperAdmin = [roles.SuperAdmin];
const defaultExport = {
  Employee,
  Manager,
  Admin,
  SuperAdmin,
};
export default defaultExport;
