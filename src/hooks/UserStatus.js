
  const checkMod = (user) => {
    var mod = user.roles.includes("ROLE_MODERATOR");
    var admin = user.roles.includes("ROLE_ADMIN");
    var superadmin = user.roles.includes("ROLE_SUPERADMIN");

    if (mod || admin || superadmin) {
      return true;
    } else {
      return false;
    }
  };

  const checkAdmin = (user) => {
    var admin = user.roles.includes("ROLE_ADMIN");
    var superadmin = user.roles.includes("ROLE_SUPERADMIN");

    //console.log(admin, superadmin);

    if (admin || superadmin) {
      return true;
    } else {
      return false;
    }
  };

  const checkSuperAdmin = (user) => {
    var superadmin = user.roles.includes("ROLE_SUPERADMIN");

    if (superadmin) {
      return true;
    } else {
      return false;
    }
  };

const UserStatus = {
  checkMod,
  checkAdmin,
  checkSuperAdmin,
};

export default UserStatus;