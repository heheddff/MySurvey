<template>
    <table class="table" v-if="options.length === 2">
      <tr class="text-center vertical-center-modal">
      <td width="10%">{{options[0].content}}({{options[0].score}})</td>
      <td>
        <Slider v-model="topic.selectContent[0]"
                :min="options[0].score | strToNum"
                :max="options[1].score | strToNum"
                :disabled="isPreview"></Slider>
      </td>
      <td width="10%">{{options[1].content}}({{options[1].score}})</td>
      </tr>
    </table>
</template>

<script>
  export default {
    props: ['topic', 'type', 'isPreview'],
    computed: {
      options () {
        const data = this.topic.options.map(item => ({
          o_id: item['o_id'],
          content: item.content.split('_')[0],
          score: item.content.split('_')[1],
          isAddition: item.isAddition
        }))
        data.sort(function (p1, p2) {
          return p1.score - p2.score
        })
        return data
      }
    },
    filters: {
      strToNum (value) {
        return value * 1
      }
    }
  }
</script>

<style>
  .table{
    width: 100%;
    color:red;
  }
  .table th, .table td {
  text-align: center;
  vertical-align: middle!important;
  padding: 5px;
  }
</style>
