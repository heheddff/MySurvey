<template>
  <!--矩阵单选及矩阵多选-->
  <div class="table-responsive div_table_radio_question">
      <table class="text-center" cellpadding="5" cellspacing="0" style="width: 100%;">
        <thead>
          <tr>
            <th></th>
            <td width="12%" v-for="(option,index) in topic.options" :key="index">{{option.content}}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,index) in topic.rows" :key="index">
            <td class="text-left">{{row.content}}</td>
            <td v-for="(option,index) in topic.options" :key="index">
              <input v-model="topic.selectContent" type="checkbox"
				:name="row.r_id"
				:value="`${row.r_id}_${option.o_id}`"
				:disabled="isPreview"
				 />
            </td>
          </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['topic', 'type', 'isPreview']
}
</script>

<style>
  .div_table_radio_question {
      clear: both;
      padding-top: 5px;
      padding-left: 24px;
      padding-bottom: 2px;
      border-bottom: 1px solid #EFEFEF;
      font-size: 15px;
      color: #333333;
      _padding-left: 27px;
  }
  thead {
      display: table-header-group;
      vertical-align: middle;
      border-color: inherit;
  }
  th {
      display: table-cell;
      vertical-align: inherit;
      font-weight: bold;
      text-align: -internal-center;
  }
  tbody {
      display: table-row-group;
      vertical-align: middle;
      border-color: inherit;
  }
  tr {
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
  }
  table[Attributes Style] {
      border-top-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 0px;
      border-left-width: 0px;
      -webkit-border-horizontal-spacing: 0px;
      -webkit-border-vertical-spacing: 0px;
  }
  table {
      display: table;
      border-collapse: separate;
      border-spacing: 2px;
      border-color: grey;
  }
</style>
