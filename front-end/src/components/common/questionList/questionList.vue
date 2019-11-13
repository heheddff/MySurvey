<template>
  <Row class="question-wrapper">
    <p v-if="questionList.length == 0" style="margin: 10px 0">一点东西都没有，赶快点击上方按钮添加题目吧！</p>
    <Row type="flex" justify="start" align="top" v-for="(topic, index) in questionList" class="question-item"
         :key="topic.q_id">
      <h4>
        Q{{ index + 1 }}:{{ topic.question }}{{topic.isRequired ? "（必填）" : "（选填）"}}
        <span style="color: #f00;" v-if="topic.isRequired">*</span>
        <span v-show="isPreview" @click="delQuestion(index)" title="删除" class="delete">
          <Icon type="trash-a" size="18"></Icon>
        </span>
      </h4>
      <p class="question-desc" v-if="topic.description !== ''">说明：{{ topic.description }}</p>
      <div class="question-options">
        <!--单选-->
        <div v-if="topic.type == 1">
            <RadioComponent :topic="topic" :type="topic.type" :isPreview="isPreview" :index="index"></RadioComponent>
        </div>
        <!--多选-->
        <div v-if="topic.type == 2">
            <CheckboxComponent :topic="topic" :type="topic.type" :isPreview="isPreview"></CheckboxComponent>
        </div>
        <!--下拉框-->
        <div v-if="topic.type == 3">
          <SelectComponent :topic="topic" :type="topic.type" :isPreview="isPreview"></SelectComponent>
        </div>
        <!--单项填空&&矩阵填空-->
        <div class="option-item" v-if="topic.type == 4 || topic.type == 6">
            <FillComponent :topic="topic" :type="topic.type" :isPreview="isPreview"></FillComponent>
        </div>
        <!--矩阵单选 -->
        <div v-if="topic.type == 7">
          <MatrixRadio :topic="topic" :type="topic.type" :isPreview="isPreview"></MatrixRadio>
        </div>
        <!--矩阵多选 -->
        <div v-if="topic.type == 8">
          <MatrixCheckbox :topic="topic" :type="topic.type" :isPreview="isPreview"></MatrixCheckbox>
        </div>
        <!--矩阵量表-->
        <div v-if="topic.type == 9">
          <MatrixScalecComponent :topic="topic" :type="topic.type" :isPreview="isPreview"></MatrixScalecComponent>
        </div>
        <!--表格下拉框-->
        <div v-if="topic.type == 10">
          <MatrixSelectComponent :topic="topic" :type="topic.type" :isPreview="isPreview"></MatrixSelectComponent>
        </div>
        <!--量表题-->
        <div v-if="topic.type == 11">
          <ScoreComponent :topic="topic" :type="topic.type" :isPreview="isPreview"></ScoreComponent>
        </div>
        <!--评分单选-->
        <div v-if="topic.type == 12">
          <RadioScoreComponent :topic="topic" :type="topic.type" :isPreview="isPreview"></RadioScoreComponent>
        </div>
        <!--比重题-->
        <div v-if="topic.type == 13">
          <WeightScoreComponent  :topic="topic" :type="topic.type" :isPreview="isPreview"></WeightScoreComponent>
        </div>
        <!--滑动条-->
        <div v-if="topic.type == 14">
          <SliderScoreComponent :topic="topic" :type="topic.type" :isPreview="isPreview"></SliderScoreComponent>
        </div>
      </div>
    </Row>
    <div class="question-btns">
      <slot></slot>
    </div>
  </Row>
</template>

<script>
  import MatrixRadio from './MatrixRadio'
  import MatrixCheckbox from './MatrixCheckbox'
  import MatrixSelectComponent from './MatrixSelectComponent'
  import MatrixScalecComponent from './MatrixScalecComponent'
  import RadioComponent from './RadioComponent'
  import CheckboxComponent from './CheckboxComponent'
  import SelectComponent from './SelectComponent'
  import FillComponent from './FillComponent'
  import ScoreComponent from './ScoreComponent'
  import RadioScoreComponent from './RadioScoreComponent'
  import SliderScoreComponent from './SliderScoreComponent'
  import WeightScoreComponent from './WeightScoreComponent'
  export default {
    props: ['questionList', 'isPreview'],
    methods: {
      delQuestion (index) {
        this.$store.dispatch('delQuestion', index)
      },
      delOption (index, opIndex) {
        this.$store.dispatch('delOption', {
          index: index,
          opIndex: opIndex
        })
      }
    },
    created () {
      console.log('imported successfully')
    },
    components: {
      MatrixRadio,
      RadioComponent,
      CheckboxComponent,
      SelectComponent,
      FillComponent,
      MatrixSelectComponent,
      MatrixScalecComponent,
      ScoreComponent,
      RadioScoreComponent,
      SliderScoreComponent,
      WeightScoreComponent,
      MatrixCheckbox
    }
  }
</script>

<style scoped>
  .question-list {
    padding: 30px 0;
    overflow: visible;
  }

  .question-options {
    padding: 5px 0;
  }

  .option-item {
    margin: 5px 0;
  }

  .question-desc {
    padding: 5px 0;
  }
  .delete{
    color: #a9afb2;
    cursor: pointer;
  }
  .question-action {
    display: none;
    color: #a9afb2;
  }

  .question-item {
    padding: 20px 0;
    min-width: 300px;
  }

  .question-item:hover {
    background: rgba(238, 238, 238, 0.47);
  }

  .question-item:hover .question-action {
    display: block;
    margin-top: 8px;
  }

  .question-action:hover {
    color: #018fe5;
    cursor: pointer;
  }

  .option-item {

  }

  .question-btns {
    margin-top: 20px;
  }

  .option-action {
    display: none;
    margin-left: 100px;
    padding: 0 10px;
    text-align: right;
    color: #a9afb2;
  }

  .option-action:hover {
    color: #018fe5;
  }

  .option-item:hover .option-action {
    display: inline-block;
    cursor: pointer;
  }
</style>
