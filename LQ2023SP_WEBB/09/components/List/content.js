/*
 * 本题不需在此作答，请勿修改代码
 */
const ListContentTemplate = `
<div>
    <header class="project-card__header">
        <time>2022-12-24 11:32:21</time>
        <button>
            <svg width="100pt" height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g>
                <path d="m27.801 50c0 5.6875-4.6133 10.301-10.301 10.301s-10.301-4.6133-10.301-10.301 4.6133-10.301 10.301-10.301 10.301 4.6133 10.301 10.301"></path>
                <path d="m60.301 50c0 5.6875-4.6133 10.301-10.301 10.301s-10.301-4.6133-10.301-10.301 4.6133-10.301 10.301-10.301 10.301 4.6133 10.301 10.301"></path>
                <path d="m92.801 50c0 5.6875-4.6133 10.301-10.301 10.301s-10.301-4.6133-10.301-10.301 4.6133-10.301 10.301-10.301 10.301 4.6133 10.301 10.301"></path>
                </g>
            </svg>
            </button>
    </header>
    <div style="display: flex;">
        <div>
        <div class="project-card__body">
            <h3>如何找出未引用的图片</h3>
            <p>文章编辑器中插入图片时便会保存一份图片文件，但在文章中可能最终并未引用。给出一些图片文件与md文章，要求使用node编写程序找出文章中未使用到的图片，最终删除图片。</p>
        </div>
        <footer class="project-card__footer">
            <div class="users-list">
            <div class="user"></div>
            <div class="user"></div>
            <div class="user"></div>
            <div class="user"></div>
            </div>
            <p class="remaining">等12人觉得很赞</p>
        </footer>
        </div>
        <div class="project-card__cover">
        <div class="cover"></div>
        </div>
    </div>
</div>
`;
Vue.component("ListContent", {
  name: "ListContent",
  template: ListContentTemplate,
  props: {},
  data() {},
  watch: {},
  mounted() {},
  methods: {},
});
