import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history", // Use browser history
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./components/ListConsultantsComponent")
    },
    {
      path: "/consultants",
      name: "Consultants",
      component: () => import("./components/ListConsultantsComponent")
    },
    {
      path: "/consultants/:id",
      name: "Consultant Details",
      component: () => import("./components/ConsultantComponent")
    },
    {
      path: "/skills",
      name: "Skills",
      component: () => import("./components/ListSkillsComponent")
    },
    {
      path: "/skills/:id",
      name: "Skill Details",
      component: () => import("./components/SkillComponent")
    }
  ]
});

export default router;