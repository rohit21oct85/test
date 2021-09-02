const db = require('../config/db');
const User = require('../model/user')(db);
const Role = require('../model/role')(db);
const ProjectRoute = require('../model/projectRoute')(db);
const RouteRole = require('../model/routeRole')(db);
const UserRole = require('../model/userRole')(db);
const { replaceAll } = require('../utils/common');

async function seedRole () {
  const roles = [ 'User', 'Admin', 'SYSTEM_USER' ];
  for (let i = 0; i < roles.length; i++) {
    let result = await Role.findOne({
      name: roles[i],
      isActive: true,
      isDeleted: false 
    });
    if (!result) {
      await Role.create({
        name: roles[i],
        code: roles[i].toUpperCase(),
        weight: 1
      });
    }
  };
  console.info('Role model seeded 🍺');
}
async function seedProjectRoutes (routes) {
  if (routes && routes.length) {
    for (let i = 0; i < routes.length; i++) {
      const routeMethods = routes[i].methods;
      for (let j = 0; j < routeMethods.length; j++) {
        const routeObj = {
          uri: routes[i].path.toLowerCase(),
          method: routeMethods[j],
          route_name: `${replaceAll((routes[i].path).toLowerCase().substring(1), '/', '_')}`,
          isActive: true, 
          isDeleted: false
        };
        let result = await ProjectRoute.findOne(routeObj);
        if (!result) {
          await ProjectRoute.create(routeObj);
        }
      }
    }
    console.info('ProjectRoute model seeded 🍺');
  }
}
async function seedRouteRole () {
  const routeRoles = [ 
    {
      route: '/admin/user/create',
      role: 'User',
      method: 'POST' 
    },
    {
      route: '/admin/user/create',
      role: 'Admin',
      method: 'POST' 
    },
    {
      route: '/admin/user/create',
      role: 'SYSTEM_USER',
      method: 'POST' 
    },
    {
      route: '/admin/user/list',
      role: 'User',
      method: 'POST' 
    },
    {
      route: '/admin/user/list',
      role: 'Admin',
      method: 'POST' 
    },
    {
      route: '/admin/user/list',
      role: 'SYSTEM_USER',
      method: 'POST' 
    },
    {
      route: '/admin/user/aggregate',
      role: 'User',
      method: 'POST' 
    },
    {
      route: '/admin/user/aggregate',
      role: 'Admin',
      method: 'POST' 
    },
    {
      route: '/admin/user/aggregate',
      role: 'SYSTEM_USER',
      method: 'POST' 
    },
    {
      route: '/admin/user/:id',
      role: 'User',
      method: 'GET' 
    },
    {
      route: '/admin/user/:id',
      role: 'Admin',
      method: 'GET' 
    },
    {
      route: '/admin/user/:id',
      role: 'SYSTEM_USER',
      method: 'GET' 
    },
    {
      route: '/admin/user/count',
      role: 'User',
      method: 'POST' 
    },
    {
      route: '/admin/user/count',
      role: 'Admin',
      method: 'POST' 
    },
    {
      route: '/admin/user/count',
      role: 'SYSTEM_USER',
      method: 'POST' 
    },
    {
      route: '/admin/user/update/:id',
      role: 'User',
      method: 'PUT' 
    },
    {
      route: '/admin/user/update/:id',
      role: 'Admin',
      method: 'PUT' 
    },
    {
      route: '/admin/user/update/:id',
      role: 'SYSTEM_USER',
      method: 'PUT' 
    },
    {
      route: '/admin/user/partial-update/:id',
      role: 'User',
      method: 'PUT'
    },
    {
      route: '/admin/user/partial-update/:id',
      role: 'Admin',
      method: 'PUT'
    },
    {
      route: '/admin/user/partial-update/:id',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/admin/user/softdelete/:id',
      role: 'User',
      method: 'PUT' 
    },
    {
      route: '/admin/user/softdelete/:id',
      role: 'Admin',
      method: 'PUT' 
    },
    {
      route: '/admin/user/softdelete/:id',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/admin/user/softdeletemany',
      role: 'User',
      method: 'PUT' 
    },
    {
      route: '/admin/user/softdeletemany',
      role: 'Admin',
      method: 'PUT' 
    },
    {
      route: '/admin/user/softdeletemany',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/admin/user/delete/:id',
      role: 'SYSTEM_USER',
      method: 'DELETE'
    },
    {
      route: '/admin/user/deletemany',
      role: 'SYSTEM_USER',
      method: 'DELETE'
    },
    {
      route: '/admin/user/addbulk',
      role: 'SYSTEM_USER',
      method: 'POST' 
    },
    {
      route: '/admin/user/updatebulk',
      role: 'SYSTEM_USER',
      method: 'PUT' 
    },
    {
      route: '/client/api/v1/user/create',
      role: 'User',
      method: 'POST' 
    },
    {
      route: '/client/api/v1/user/create',
      role: 'Admin',
      method: 'POST' 
    },
    {
      route: '/client/api/v1/user/create',
      role: 'SYSTEM_USER',
      method: 'POST'
    },
    {
      route: '/client/api/v1/user/list',
      role: 'User',
      method: 'POST' 
    },
    {
      route: '/client/api/v1/user/list',
      role: 'Admin',
      method: 'POST' 
    },
    {
      route: '/client/api/v1/user/list',
      role: 'SYSTEM_USER',
      method: 'POST'
    },
    {
      route: '/client/api/v1/user/aggregate',
      role: 'User',
      method: 'POST'
    },
    {
      route: '/client/api/v1/user/aggregate',
      role: 'Admin',
      method: 'POST'
    },
    {
      route: '/client/api/v1/user/aggregate',
      role: 'SYSTEM_USER',
      method: 'POST'
    },
    {
      route: '/client/api/v1/user/:id',
      role: 'User',
      method: 'GET' 
    },
    {
      route: '/client/api/v1/user/:id',
      role: 'Admin',
      method: 'GET' 
    },
    {
      route: '/client/api/v1/user/:id',
      role: 'SYSTEM_USER',
      method: 'GET'
    },
    {
      route: '/client/api/v1/user/count',
      role: 'User',
      method: 'POST' 
    },
    {
      route: '/client/api/v1/user/count',
      role: 'Admin',
      method: 'POST' 
    },
    {
      route: '/client/api/v1/user/count',
      role: 'SYSTEM_USER',
      method: 'POST'
    },
    {
      route: '/client/api/v1/user/update/:id',
      role: 'User',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/update/:id',
      role: 'Admin',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/update/:id',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/partial-update/:id',
      role: 'User',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/partial-update/:id',
      role: 'Admin',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/partial-update/:id',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/softdelete/:id',
      role: 'User',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/softdelete/:id',
      role: 'Admin',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/softdelete/:id',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/softdeletemany',
      role: 'User',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/softdeletemany',
      role: 'Admin',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/softdeletemany',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/client/api/v1/user/delete/:id',
      role: 'SYSTEM_USER',
      method: 'DELETE'
    },
    {
      route: '/client/api/v1/user/deletemany',
      role: 'SYSTEM_USER',
      method: 'DELETE'
    },
    {
      route: '/client/api/v1/user/addbulk',
      role: 'SYSTEM_USER',
      method: 'POST'
    },
    {
      route: '/client/api/v1/user/updatebulk',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/create',
      role: 'User',
      method: 'POST' 
    },
    {
      route: '/desktop/api/v1/user/create',
      role: 'Admin',
      method: 'POST' 
    },
    {
      route: '/desktop/api/v1/user/create',
      role: 'SYSTEM_USER',
      method: 'POST'
    },
    {
      route: '/desktop/api/v1/user/list',
      role: 'User',
      method: 'POST' 
    },
    {
      route: '/desktop/api/v1/user/list',
      role: 'Admin',
      method: 'POST' 
    },
    {
      route: '/desktop/api/v1/user/list',
      role: 'SYSTEM_USER',
      method: 'POST'
    },
    {
      route: '/desktop/api/v1/user/aggregate',
      role: 'User',
      method: 'POST'
    },
    {
      route: '/desktop/api/v1/user/aggregate',
      role: 'Admin',
      method: 'POST'
    },
    {
      route: '/desktop/api/v1/user/aggregate',
      role: 'SYSTEM_USER',
      method: 'POST'
    },
    {
      route: '/desktop/api/v1/user/:id',
      role: 'User',
      method: 'GET' 
    },
    {
      route: '/desktop/api/v1/user/:id',
      role: 'Admin',
      method: 'GET' 
    },
    {
      route: '/desktop/api/v1/user/:id',
      role: 'SYSTEM_USER',
      method: 'GET'
    },
    {
      route: '/desktop/api/v1/user/count',
      role: 'User',
      method: 'POST' 
    },
    {
      route: '/desktop/api/v1/user/count',
      role: 'Admin',
      method: 'POST' 
    },
    {
      route: '/desktop/api/v1/user/count',
      role: 'SYSTEM_USER',
      method: 'POST'
    },
    {
      route: '/desktop/api/v1/user/update/:id',
      role: 'User',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/update/:id',
      role: 'Admin',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/update/:id',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/partial-update/:id',
      role: 'User',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/partial-update/:id',
      role: 'Admin',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/partial-update/:id',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/softdelete/:id',
      role: 'User',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/softdelete/:id',
      role: 'Admin',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/softdelete/:id',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/softdeletemany',
      role: 'User',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/softdeletemany',
      role: 'Admin',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/softdeletemany',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },
    {
      route: '/desktop/api/v1/user/delete/:id',
      role: 'SYSTEM_USER',
      method: 'DELETE'
    },
    {
      route: '/desktop/api/v1/user/deletemany',
      role: 'SYSTEM_USER',
      method: 'DELETE'
    },
    {
      route: '/desktop/api/v1/user/addbulk',
      role: 'SYSTEM_USER',
      method: 'POST'
    },
    {
      route: '/desktop/api/v1/user/updatebulk',
      role: 'SYSTEM_USER',
      method: 'PUT'
    },

  ];
  if (routeRoles && routeRoles.length) {
    for (let i = 0; i < routeRoles.length; i++) {
      let route = await ProjectRoute.findOne({
        uri: routeRoles[i].route.toLowerCase(),
        method: routeRoles[i].method,
        isActive: true,
        isDeleted: false 
      }, { id: 1 });
      let role = await Role.findOne({
        code: (routeRoles[i].role).toUpperCase(),
        isActive: true,
        isDeleted: false 
      }, { id: 1 });
      if (route && route.id && role && role.id) {
        let routeRoleObj = await RouteRole.findOne({
          roleId: role.id,
          routeId: route.id,
          isActive: true, 
          isDeleted: false
        });
        if (!routeRoleObj) {
          await RouteRole.create({
            roleId: role.id,
            routeId: route.id
          });
        }
      }
    };
    console.info('RouteRole model seeded 🍺');
  }
}
async function seedUserRole (){
  let admin = await User.findOne({
    'username':'Charlotte Ruecker',
    'isActive':true,
    'isDeleted':false
  });
  let adminRole = await Role.findOne({ code: 'SYSTEM_USER' }, { id: 1 });
  if (admin && admin.isPasswordMatch('LsJWbJQB9VrNx3O') && adminRole){
    let count = await UserRole.countDocuments({
      userId: admin.id,
      roleId: adminRole.id,
      isActive: true, 
      isDeleted: false
    });
    if (count == 0) {
      await UserRole.create({
        userId: admin.id,
        roleId: adminRole.id 
      });
      console.info('admin seeded 🍺');
    }   
  }
  let user = await User.findOne({
    'username':'Dr. Brian Lowe',
    'isActive':true,
    'isDeleted':false
  });
  let userRole = await Role.findOne({ code: 'SYSTEM_USER' }, { id: 1 });
  if (user && user.isPasswordMatch('ArKQJsalAHDahnA') && userRole){
    let count = await UserRole.countDocuments({
      userId: user.id,
      roleId: userRole.id,
      isActive: true, 
      isDeleted: false
    });
    if (count == 0) {
      await UserRole.create({
        userId: user.id,
        roleId: userRole.id 
      });
      console.info('user seeded 🍺');
    }   
  }
}
async function seedUser () {
  let admin = await User.findOne({
    'username':'Charlotte Ruecker',
    'isActive':true,
    'isDeleted':false
  });
  if (!admin || !admin.isPasswordMatch('LsJWbJQB9VrNx3O') ) {
    let admin = new User({
      'password':'LsJWbJQB9VrNx3O',
      'username':'Charlotte Ruecker',
      'role':1
    });
    await User.create(admin);
  }
  let user = await User.findOne({
    'username':'Dr. Brian Lowe',
    'isActive':true,
    'isDeleted':false
  });
  if (!user || !user.isPasswordMatch('ArKQJsalAHDahnA') ) {
    let user = new User({
      'password':'ArKQJsalAHDahnA',
      'username':'Dr. Brian Lowe',
      'role':2
    });
    await User.create(user);
  }
  console.info('Users seeded🍺');
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
}     

module.exports = seedData;