/*
 * 骨架屏组件
 */
const SkeletonTemplate = `<div class="skeleton-wrapper">
    <div class="skeleton-content">
      <item :paragraph="paragraph" :active="active"></item>
    </div>
  </div>
`;
Vue.component("Skeleton", {
  name: "Skeleton",
  template: SkeletonTemplate,
  props: {
    active: {
      default: false,
    },
    paragraph: {},
  },
  data() {},
  watch: {},
  mounted() {},
  methods: {},
});
