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
  <div class="form-group" v-if="type != 4">
    <label for="inputPassword3" class="col-sm-2 control-label">选&nbsp;&nbsp;&nbsp;&nbsp;项</label>
    <div class="col-sm-10">
      <div class="form-inline form-group" v-for="(option,index) in options" :key="index" >
        <input type="text" class="form-control item" id="inputPassword3" placeholder="请输入选项"
               :value="option.content"
               v-model="option.content">
        <button type="button" class="btn btn-default" @click="delOption(index)">删除选项</button>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label"></label>
    <slot></slot>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label"></label>
    <div class="col-sm-10">
    <!--按钮-->
    <button v-if="type != 4" type="button" class="btn btn-success btn-sm" @click="addOption()">增加选项</button>
    <button type="button" class="btn btn-primary btn-sm" @click="submitRadio">完成提交</button>
    </div>
  </div>
</form>
</div>
</template>

<script>
import PubSub from 'pubsub-js'
export default {
  data () {
    return {
      options: [
        {
          content: '',
          isAddition: false
        },
        {
          content: '',
          isAddition: false
        },
        {
          content: '',
          isAddition: false
        }
      ],
      add_form: {},
      question: '',
      description: '',
      type: this.$route.params.type,
      isRequired: true,
      selectContent: [],
      additional: '',
      related: '',
      types: [
        {
          id: 1,
          typer: '单选',
          label: '单选'
        },
        {
          id: 2,
          typer: '多选',
          label: '多选'
        },
        {
          id: 3,
          typer: '下拉框',
          label: '下拉框'
        },
        {
          id: 4,
          typer: '单项填空',
          label: '单项填空'
        },
        {
          id: 11,
          typer: '量表题',
          label: '量表题'
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
            isAddition: false
          },
          {
            content: '',
            isAddition: false
          },
          {
            content: '',
            isAddition: false
          }
        ]
        this.options = tempoptions
      }
    },
    addOption () {
      const tempdata = {
        content: '',
        isAddition: false
      }
      this.options.push(tempdata)
    },
    delOption (index) {
      this.options.splice(index, 1)
    },
    submitRadio () {
      this.add_form.question = this.question
      this.add_form.options = this.options
      this.add_form.description = this.description
      this.add_form.type = this.type
      this.add_form.isRequired = this.isRequired
      this.add_form.additioal = this.additional
      this.add_form.selectContent = this.selectContent
      this.add_form.related = this.related
      const data = Object.assign({}, this.add_form)
      console.log(data)
      this.$store.dispatch('addQuestion', data)
      const optionsTemp = [
        {
          content: '',
          isAddition: false
        },
        {
          content: '',
          isAddition: false
        },
        {
          content: '',
          isAddition: false
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
  },
  mounted: function () {
    PubSub.subscribe('guanlian', (msg, data) => {
      console.log(data)
      this.related = data
    })
  }
}
</script>

<style>
  .item {
    width: 250px;
    margin: 5px;
  }
</style>
