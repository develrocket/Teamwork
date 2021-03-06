import BaseModel from "@/models/base-model";

import { useMainStore } from "@/stores/main";

export default class Breakfast extends BaseModel {
  static contentType = {
    app: "breakfasts",
    model: "breakfast",
  };

  static verboseName = "Desayuno";
  static verboseNamePlural = "Desayunos";

  static serviceBasename = "breakfasts:breakfast";

  static localStorageNamespace = "breakfast";

  static getDefaults = function () {
    const mainStore = useMainStore();
    return {
      id: null,
      user: mainStore.currentUser.id,
      bread: null,
      base: null,
      ingredient1: null,
      ingredient2: null,
      drink: null,
    };
  };
}
