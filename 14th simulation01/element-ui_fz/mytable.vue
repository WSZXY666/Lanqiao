<template>
  <div class="main">
    <el-table
        ref="singleTable"
        highlight-current-row
        :data="tableData"
        stripe
        border
        style="width: 100%"
    >
      <el-table-column label="单选" width="80">
        <!-- TODO：完善单选按钮组件，实现需求（DOM 结构不能修改） -->
        <!-- 插槽（slot）是一种用于分发组件内容的机制。它允许组件的使用者在组件内部插入自己的内容，从而实现组件的复用和灵活性。-->
        <!-- 指定了一个名为 s 的作用域（scope），用于访问当前表格行的数据。-->
        <template slot-scope="s">
          <!-- 绑定了一个 v-model 属性，将其值绑定到了 currentRow 变量上。-->
          <!-- :label 属性绑定了当前行的数据 s.row。-->
          <!-- @change 事件绑定了一个 change 方法，用于在选中行改变时触发相应的事件。-->
          <el-radio v-model="currentRow" :label="s.row" @change='change'>&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          📅<span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <div class="tools">
      <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentRow: null,
    };
  },

  methods: {
    /*
    用于设置当前选中行。它调用了 Element UI 表格组件的 setCurrentRow 方法，并将选中行数据作为参数传递给它。
    同时，它还调用了 change 方法，用于在选中行改变时触发相应的事件。
     */
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row); // 设置当前选中行，高亮显示
      this.change(row);
    },
    /*
    用于在选中行改变时触发相应的事件。它将选中行的数据作为参数 e，将其赋值给 currentRow 变量，以便其他组件可以获取到选中行的数据。
     */
    change(e) {
      this.currentRow = e;
    }
  }
};
</script>
<style scoped>
.main {
  width: 60%;
  margin: 0 auto;
}

.tools {
  margin-top: 20px;
  text-align: center;
}
</style>
