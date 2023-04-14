
import AuthorizationGroups from "./AuthorizationGroups";

// const AuthorizationGroups = constants.AuthorizationGroups.default;
const roles = {

  orgs: {
    create: AuthorizationGroups.Admin,
    get: AuthorizationGroups.Employee,
    list: AuthorizationGroups.Manager,
    remove: AuthorizationGroups.Admin,
    update: AuthorizationGroups.Manager,
  },
  users: {
    create: AuthorizationGroups.Manager,
    get: AuthorizationGroups.Employee,
    list: AuthorizationGroups.Manager,
    remove: AuthorizationGroups.Manager,
    update: AuthorizationGroups.Manager,
  },
};

const getHttpMethod = (method, id = null) => {
  switch (method) {
    case 'GET':
      if (id) {
        return 'get';
      }

      return 'list';
    case 'PUT':
      return 'update';
    case 'DELETE':
      return 'remove';
    case 'POST':
      return 'create';
  }
};

const checkRoleAccess = async (methodArn, sub) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [arn, stage, httpMethod, endpoint, id] = methodArn.split('/').filter(str => str);
  const method = getHttpMethod(httpMethod, id);
  // const user = await getUserService(sub);
  //
  // if (!user.isActive && !(endpoint === 'users' && id === user.id)) {
  //   throw new Error('Unauthorized');
  // }
  // const { role } = user;
  // if (endpoint !== 'migrate-orgs' && !roles[endpoint][method].includes(role)) {
  //   throw new Error('Access denied.');
  // }
};

// exports.checkRoleAccess = checkRoleAccess;

export default checkRoleAccess;
