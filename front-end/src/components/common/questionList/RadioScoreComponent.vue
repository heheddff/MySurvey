<template>
  <!--评分单选-->
  <div>
    <Radio-group  v-model="topic.selectContent[0]" vertical style="width: 100%;">
      <Radio :label="option.o_id" v-for="(option, opIndex) in options" :disabled="isPreview" class="option-item" :key="option.o_id">
        <label>{{option.content}}</label>
        &nbsp;<span style="color:#efa030;font-size:14px;">(分值:{{option.score}}）</span>
        <Input v-model="topic.additional"
               placeholder="请输入理由"
               style="width: 300px"
               v-show="option.isAddition && topic.selectContent === option.o_id "
               v-if="option.isAddition"
        ></Input>
        <!--<span class="delete"  title="删除" v-show="isPreview" @click="delOption(index, opIndex)">
          <Icon type="close" size="16"></Icon>
        </span>-->
      </Radio>
    </Radio-group>
  </div>
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
        return data
      }
    }
  }
</script>

<style>
</style>
