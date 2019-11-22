<template>
  <div style="width: 256px">
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['2']"
      mode="inline"
      :theme="theme"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path">
          <!-- <a-icon v-if="!item.meta.icon" :type="item.path"/> -->

          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  data() {
    const menuData = this.getMenuDate(this.$router.options.routes);
    return {
      collapsed: false,
      menuData
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuDate(routes) {
      const menuData = [];
      routes.forEach(item => {
        if (item.showInMenu) {
          const newItem = { ...item };
          delete newItem.children;

          if (item.name && item.children) {
            newItem.children = this.getMenuDate(item.children);
          }

          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.chidren
        ) {
          menuData.push(...this.getMenuDate(item.children));
        }
      });
      return menuData;
    }
  }
};
</script>
