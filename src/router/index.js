import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/404.vue";

Vue.use(VueRouter);

const routes = [
  // 用户
  {
    path: "/user",
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "../components/layouts/UserLayout.vue"
      ),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue")
      }
    ]
  },
  // 仪表盘
  {
    path: "/",
    showInMenu: true,
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "../components/layouts/BasicLayout.vue"
      ),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName:"dashboard" */ "../views/Dashboard/Analysis"
              )
          }
        ]
      },
      // from
      {
        path: "/from",
        name: "from",
        meta: { icon: "from", title: "表单" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/from/basic-from",
            name: "basicfrom",
            showChildrenInMenu: true,
            meta: { title: "基础表单" },
            component: () =>
              import(
                /* webpackChunkName:"from" */ "../views/Froms/BasicFrom.vue"
              )
          },
          {
            path: "/from/step-from",
            name: "stepfrom",
            meta: { title: "分布表单" },
            component: () =>
              import(
                /* webpackChunkName:"from" */ "../views/Froms/StepFrom/Index.vue"
              ),
            children: [
              {
                path: "/from/step-form",
                redirect: "/from/step-form/info"
              },
              {
                path: "/from/step-from/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName:"from" */ "../views/Froms/StepFrom/Step1.vue"
                  )
              },
              {
                path: "/from/step-from/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName:"from" */ "../views/Froms/StepFrom/Step2.vue"
                  )
              },
              {
                path: "/from/step-from/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName:"from" */ "../views/Froms/StepFrom/Step3.vue"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  // 404
  {
    path: "*",
    name: "404",
    component: NotFound
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, form, next) => {
  if (to.path !== form.path) {
    NProgress.start();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
