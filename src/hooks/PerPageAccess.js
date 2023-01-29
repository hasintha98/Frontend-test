const productionsPageAccess = {
  new: ["moderator", "admin", "superadmin"],

  edit: ["moderator", "admin", "superadmin"],

  delete: ["admin", "superadmin"],

  multipleDelete: ["admin", "superadmin"],
};



const plyWoodPageAccess = {
  new: ["moderator", "admin", "superadmin"],

  update: ["moderator", "admin", "superadmin"],

  edit: ["moderator", "admin", "superadmin"],

  delete: ["admin", "superadmin"],

  multipleDelete: ["admin", "superadmin"],
};


const rawMatPageAccess = {
  new: ["moderator", "admin", "superadmin"],

  update: ["moderator", "admin", "superadmin"],

  edit: ["moderator", "admin", "superadmin"],

  delete: ["admin", "superadmin"],

  multipleDelete: ["admin", "superadmin"],
};


const salesPageAccess = {
  view: ["moderator", "admin", "superadmin"],

  new: ["moderator", "admin", "superadmin"],

  update: ["moderator", "admin", "superadmin"],

  edit: ["moderator", "admin", "superadmin"],

  delete: ["admin", "superadmin"],

  multipleDelete: ["admin", "superadmin"],
};



const customerPageAccess = {
  newSale: ["moderator", "admin", "superadmin"],

  new: ["moderator", "admin", "superadmin"],

  edit: ["moderator", "admin", "superadmin"],

  delete: ["admin", "superadmin"],
};




const PerPageAccess = {
  productionsPageAccess,
  plyWoodPageAccess,
  rawMatPageAccess,
  salesPageAccess,
  customerPageAccess,
};

export default PerPageAccess;
