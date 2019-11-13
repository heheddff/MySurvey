<template>
  <div>
    <table class="table">
      <tr v-for="(option,index) in topic.options" :key="index">
        <td width="10%">{{option.content}}</td>
        <td>
          <Slider show-input v-model="option.score" @on-input="on_input" :disabled="isPreview"></Slider>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: left;">
          <span>
            提示：总比重必须为：
          </span>
          <b>{{initWeight}}</b>
          <span>
            已分配比重：{{sumWeight}}
          </span>
          <span v-if="sumWeight > initWeight">(请修改)</span>
          </td></tr>
    </table>
  </div>
</template>

<script>
  export default {
    props: ['topic', 'type', 'isPreview'],
    data () {
      return {
        sumWeight: 0
      }
    },
    computed: {
      initWeight () {
        return this.topic.rows[0].content * 1
      }
    },
    methods: {
      on_input () {
        let sum = 0
        for (var i = 0; i < this.topic.options.length; i++) {
          const score = parseInt(this.topic.options[i].score)
          if (!isNaN(score)) {
            sum += score
            this.topic.selectContent[i] = this.topic.options[i].o_id + '_' + score
          } else {
            this.topic.selectContent[i] = this.topic.options[i].o_id + '_' + 0
            sum += 0
          }
        }
        this.sumWeight = sum
      }
    }
  }
</script>

<style>
  .table{
    width: 100%;
  }
  .table th, .table td {
  text-align: center;
  vertical-align: middle!important;
  padding: 5px;
  }
</style>
