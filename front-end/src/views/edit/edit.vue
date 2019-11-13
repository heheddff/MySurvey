<template>
  <div class="edit">
    <Row>
      <!--按钮组-->
      <i-col span="2">
        <ul class="nav nav-stacked">
          <li><router-link to="/platform/edit/radio/1" class="active">单选题</router-link></li>
          <li><router-link to="/platform/edit/radio/2">多选题</router-link></li>
          <li><router-link to="/platform/edit/radio/3">下拉单选</router-link></li>
          <li><router-link to="/platform/edit/radio/4">单项填空</router-link></li>
          <!--<li><router-link to="/platform/edit/radio/5">单项填空</router-link></li>-->
          <li><router-link to="/platform/edit/matrix/6">矩阵填空</router-link></li>
          <li><router-link to="/platform/edit/matrix/7">矩阵单选</router-link></li>
          <li><router-link to="/platform/edit/matrix/8">矩阵多选</router-link></li>
          <li><router-link to="/platform/edit/matrix/9">矩阵量表</router-link></li>
          <li><router-link to="/platform/edit/matrix/10">表格下拉框</router-link></li>
          <li><router-link to="/platform/edit/radio/11">量标题</router-link></li>
          <li><router-link to="/platform/edit/score/12">评分单选</router-link></li>
          <li><router-link to="/platform/edit/weight/13">比重题</router-link></li>
          <li><router-link to="/platform/edit/slider/14">滑动条</router-link></li>
        </ul>
      </i-col>
      <i-col span="10">
        <div>
          <router-view>
            <div class="form-inline form-group">
              <LogicalComponent :questions="naire.topic"></LogicalComponent>
            </div>
          </router-view>
        </div>
      </i-col>
      <i-col span="12">
        <form class="form-horizontal" :model="naire">
          <div class="form-group">
            <label for="selectType" class="col-sm-2 control-label">问卷名</label>
            <div class="col-sm-10">
              <div class="form-inline form-group item">
                <Input v-model="title"
                       ref="title"
                       placeholder="问卷名">
                </Input>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="selectType" class="col-sm-2 control-label">问卷介绍</label>
            <div class="col-sm-10">
              <div class="form-inline form-group item">
                <Input v-model="textarea"
                       @on-change="updateIntro"
                       type="textarea"
                       :rows='3'
                       placeholder="请输入问卷介绍...">
                </Input>
              </div>
            </div>
          </div>
        </form>
      <questionList :question-list="naire.topic" :is-preview="true">
        <Row>
          <Col span="4" style="margin-right: 10px;">
          <Date-picker type="datetime" placeholder="截止日期"
                       v-model="deadline"
                       :editable="false" placement="right-end"
                       :options="dateOption">
          </Date-picker>
          </Col>
          <Col span="12">
          <Button style="margin-right: 10px;" @click="handleSave">保存问卷</Button>
          <Button type="success" @click="handlePublish">发布问卷</Button>
          </Col>
        </Row>
      </questionList>
    </i-col>
    </Row>
    <div style="clear: both;"></div>
  </div>

</template>

<script>
  import LogicalComponent from '@/components/common/questionList/LogicalComponent'
  import questionList from '@/components/common/questionList/questionList'
  export default {
    data () {
      return {
        dateOption: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        textarea: ''
      }
    },
    computed: {
      naire () {
        return this.$store.getters.naire
      },
      title: {
        get () {
          return this.$store.getters.naire.title
        },
        set (value) {
          this.$store.commit('UPDATE_TITLE', value)
        }
      },
      intro: {
        get () {
          this.textarea = this.$store.getters.naire.intro
          return this.$store.getters.intro
        },
        set (value) {
          this.$store.commit('UPDATE_INTRO', value)
        }
      },
      deadline: {
        get () {
          return this.$store.getters.naire.deadline
        },
        set (value) {
          this.$store.commit('UPDATE_DEADLINE', new Date(value).getTime())
        }
      }
    },
    created () {
      // 如果id存在，则从服务器获取数据，并展示
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      // '$route': 'fetchData'
    },
    methods: {
      warning (nodesc, title, desc) {
        this.$Notice.warning({
          title: title,
          desc: nodesc ? '' : desc
        })
      },
      error (nodesc, title, desc) {
        this.$Notice.error({
          title: title,
          desc: nodesc ? '' : desc
        })
      },
      // 校验填写项是否正确填写
      validQuestion (target) {
        let isPassed = true
        if (target.question === '') {
          this.warning(false, '题目', '请输入问题内容')
          isPassed = false
        }
        if (target.options.length < 1) {
          this.warning(false, '选项', '选项至少增加一个')
          isPassed = false
        }
        let valid = target.options.some((item, index) => {
          return (item.content === '')
        })

        if (valid && target.type !== '单项填空') {
          this.warning(false, '选项内容', '请输入选项内容')
          isPassed = false
        }

        return isPassed
      },
      validNaire () {
        let isPassed = true
        if (this.title === '') {
          this.warning(false, '问卷标题', '请输入问卷标题')
          this.$refs.title.focus()
          isPassed = false
        }
        if (this.deadline === '' || !this.deadline) {
          this.warning(false, '截止时间', '请选择问卷截止时间')
          isPassed = false
        }
        if (this.naire.topic.length < 1) {
          this.warning(false, '问卷题目', '请至少添加一道问卷题目')
          isPassed = false
        }
        return isPassed
      },
      // 用于问卷介绍的 v-model 双向数据绑定
      updateIntro (e) {
        this.$store.commit('UPDATE_INTRO', e.target.value)
      },
      handleSave () {
        if (this.validNaire()) {
          this.$store.dispatch('changeNaireStatus', 0)
          this.saveNaire('保存失败，请重试')
        }
      },
      handlePublish () {
        console.log('handlepublish')
        if (this.validNaire()) {
          this.$store.dispatch('changeNaireStatus', 1)
          this.saveNaire('发布失败，请重试')
        }
      },
      // 当传入id值时，获取问卷详情，用于编辑
      fetchData () {
        if (this.$route.params.id) {
//        this.$store.dispatch('getNaire')
          this.$store.dispatch('getQuestionList')
          this.$store.dispatch('changeStatus', 'update')
          // 通过 JSON 序列化将数组不再为引用，避免出现在 store 外修改 state 的内容
        } else {
          // 新增问卷
          const _naire = {
            title: '',
            deadline: '',
            intro: '',
            status: 0,
            topic: []
          }
          let newNaire = Object.assign({}, _naire)
          this.$store.dispatch('createNaire', newNaire)
          this.$store.dispatch('changeStatus', 'create')
        }
      },
      // 保存问卷和发布问卷
      saveNaire (message) {
        let _axios = this.$store.dispatch('saveNewNaire')
        _axios.then((response) => {
          console.log(response.data)
          if (response.data.err === 0) {
            this.$Message.success(response.data.data)
            this.$router.push('/platform/list')
          } else {
            this.$Message.error(response.data.data)
          }
        })
          .catch((error) => {
            console.log(error)
            this.$Message.error(message)
          })
      }
    },
    components: {
      questionList,
      LogicalComponent
    }
  }
</script>

<style>
  .edit{
    width: 1024px;
    }
  #left,#right{
    margin-left: 5px;
    border:1px solid silver;
  }
  #middle{
    float: left;
    width:300px;
    margin-left: 5px;
    border: 1px gray solid;
  }
  #right{
    width: 80%;
    border: 1px solid #000000;
  }
  .option-btn {
    padding-left: 10px;
  }

  .option-item {
    padding: 5px 0;
  }

  .option-addtion {
    height: 30px;
    line-height: 30px;
  }

  .add-button button {
    margin: 5px 10px;
  }

</style>
