<template>
  <div>
    <Radio-group v-model="topic.selectContent[0]" vertical style="width: 100%;">
                <Radio :label="option.o_id" v-for="(option, opIndex) in topic.options" :disabled="isPreview"
                       class="option-item" :key="option.o_id">
                  <span>{{option.content}}</span>
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
    props: ['topic', 'type', 'isPreview']
  }
</script>

<style>
</style>
