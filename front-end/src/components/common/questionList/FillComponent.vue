<template>
  <div>
    <div v-if="type == 6 && topic.rows.length > 0">
      <table cellpadding="5" cellspacing="0" style="width: 100%;">
          <tbody>
            <tr  v-for="(row,index) in topic.rows" :key="index">
              <td class="text-center">{{row.content}}</td>
              <td>
                <input type="textarea" placeholder="请输入..."
                        v-model="topic.selectContent[index]"
                        :autosize="{minRows: 2,maxRows: 5}"
                        :disabled="isPreview" />
              </td>
            </tr>
      </tbody>
      </table>
    </div>
    <div v-if="type == 4">
      <Input v-model="topic.selectContent[0]" class="item" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
             placeholder="请输入..." :disabled="isPreview"></Input>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['topic', 'type', 'isPreview']
  }
</script>

<style>
  .item {
    width: 250px;
    margin: 5px;
  }
</style>
