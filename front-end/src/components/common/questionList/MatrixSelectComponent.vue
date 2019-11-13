<template>
  <div class="table-responsive">
      <table class="text-center" cellpadding="5" cellspacing="0" style="width: 100%;" >
        <thead>
          <tr>
            <th></th>
            <td v-for="(option,opIndex) in topic.columns" :key="opIndex">{{option.content}}</td>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(row,rindex) in topic.rows" :key="rindex">
            <td width="12%" class="text-left">{{row.content}}</td>
            <td v-for="(column,cindex) in topic.columns" :key="cindex">
              <select  class="dropdown form-control"
                  :name="`${row.r_id}_${column.c_id}`"
                  :id="getIndex()"
                  @change="changeOption()"
                  >
                <option value="">请选择</option>
                <option v-for="(option, opIndex) in topic.options"
                  :disabled="isPreview"
                  :value="`${row.r_id}_${column.c_id}_${option.o_id}`"
                  class="option-item" :key="option.o_id">{{option.content}}</option>
              </select>
            </td>
          </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
  let selectIndex = 0
  export default {
    props: ['topic', 'type', 'isPreview'],
    methods: {
      changeOption () {
        const value = event.target.value
        const index = event.target.id
        if (value) {
          this.topic.selectContent[index] = value
        } else {
          console.log('null')
        }
      },
      getIndex () {
        return selectIndex++
      }
    }
  }
</script>

<style>
  .question-item {
    padding: 20px 0;
    min-width: 300px;
  }
  .item {
    width: 100px;
    margin: 5px;
  }
</style>
