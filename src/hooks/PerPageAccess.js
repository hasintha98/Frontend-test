export let productionsPageAccess = {
  new: ["moderator", "admin", "superadmin"],

  edit: ["moderator", "admin", "superadmin"],

  delete: ["admin", "superadmin"],

  multipleDelete: ["admin", "superadmin"],
};



let plyWoodPageAccess = {
  new: ["moderator", "admin", "superadmin"],

  update: ["moderator", "admin", "superadmin"],

  edit: ["moderator", "admin", "superadmin"],

  delete: ["admin", "superadmin"],

  multipleDelete: ["admin", "superadmin"],
};


let rawMatPageAccess = {
  new: ["moderator", "admin", "superadmin"],

  update: ["moderator", "admin", "superadmin"],

  edit: ["moderator", "admin", "superadmin"],

  delete: ["admin", "superadmin"],

  multipleDelete: ["admin", "superadmin"],
};


let salesPageAccess = {
  view: ["moderator", "admin", "superadmin"],

  new: ["moderator", "admin", "superadmin"],

  update: ["moderator", "admin", "superadmin"],

  edit: ["moderator", "admin", "superadmin"],

  delete: ["admin", "superadmin"],

  multipleDelete: ["admin", "superadmin"],
};



let customerPageAccess = {
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
