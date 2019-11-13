<template>
<div>
<form class="form-horizontal">
  <div class="form-group">
    <label for="selectType" class="col-sm-2 control-label">类&nbsp;&nbsp;&nbsp;&nbsp;型</label>
    <div class="col-sm-10">
      <div class="form-inline form-group">
        <select id="selectType" v-model="type" class="dropdown form-control item" @change="changeOptions">
          <option v-for="(type,index) in types" :key="index" :value="type.id">{{type.typer}}</option>
        </select>
      </div>
    </div>
  </div>
  <!--题目-->
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">题&nbsp;&nbsp;&nbsp;&nbsp;目</label>
    <div class="col-sm-10">
      <div class="form-inline form-group">
        <input type="text" class="form-control item" id="inputEmail3" placeholder="请输入题目" v-model="question">
      </div>
    </div>
  </div>
  <!--选项-->
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">选项</label>
    <div class="col-sm-10">
      <div class="form-inline form-group" v-for="(option,index) in options" :key="index" >
        <input type="text" class="form-control item" id="inputPassword3" placeholder="请输入选项"
               :value="option.content"
               v-model="option.content">
        <input type="text" class="form-control item" placeholder="请输入分值"
               :value="option.score"
               v-model="option.score"
         />
        <button type="button" class="btn btn-default" @click="delOption(index)">删除选项</button>
      </div>
    </div>
  </div>
  <!--插槽-->
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label"></label>
    <slot></slot>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label"></label>
    <!--按钮-->
    <button type="button" class="btn btn-success btn-sm" @click="addOption()">增加选项</button>
    <button type="button" class="btn btn-primary btn-sm" @click="submitRadio">完成提交</button>
  </div>
</form>
</div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        {
          content: '',
          isAddition: false,
          score: ''
        },
        {
          content: '',
          isAddition: false,
          score: ''
        },
        {
          content: '',
          isAddition: false,
          score: ''
        }
      ],
      add_form: {},
      question: '',
      description: '',
      type: this.$route.params.type,
      isRequired: true,
      selectContent: [],
      additional: '',
      types: [
        {
          id: 11,
          typer: '量表题',
          label: '量表题'
        },
        {
          id: 12,
          typer: '评分单选',
          label: '评分单选'
        }
      ]
    }
  },
  methods: {
    changeOptions () {
      if (this.type === 4) {
        this.options.splice(0)
      } else {
        const tempoptions = [
          {
            content: '',
            isAddition: false,
            score: ''
          },
          {
            content: '',
            isAddition: false,
            score: ''
          },
          {
            content: '',
            isAddition: false,
            score: ''
          }
        ]
        this.options = tempoptions
      }
    },
    addOption () {
      const tempdata = {
        content: '',
        isAddition: false,
        score: ''
      }
      this.options.push(tempdata)
    },
    delOption (index) {
      this.options.splice(index, 1)
    },
    submitRadio () {
      this.add_form.question = this.question
      this.add_form.options = this.options.map(item => ({
        content: item.content + '_' + item.score,
        isAddition: item.isAddition
      }))
      this.add_form.description = this.description
      this.add_form.type = this.type
      this.add_form.isRequired = this.isRequired
      this.add_form.additioal = this.additional
      this.add_form.selectContent = this.selectContent
      const data = Object.assign({}, this.add_form)
      this.$store.dispatch('addQuestion', data)
      const optionsTemp = [
        {
          content: '',
          isAddition: false,
          score: ''
        },
        {
          content: '',
          isAddition: false,
          score: ''
        },
        {
          content: '',
          isAddition: false,
          score: ''
        }
      ]
      this.add_form = {}
      this.options = optionsTemp
    }
  },
  watch: {
    $route: function (value) {
      this.type = value.params.type * 1
    }
  }
}
</script>

<style>
  .item {
    width: 200px;
    margin: 5px;
  }
</style>
