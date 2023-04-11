/*
 * 本题不需在此作答，请勿修改代码
 */
const ListTemplate = `
<div class="wrapper">
  <article class="project-card">
    <slot />
  </article>
</div>
`;
Vue.component("List", {
  name: "List",
  template: ListTemplate,
  props: {},
  data: {},
  watch: {},
  mounted() {},
  methods: {},
});
