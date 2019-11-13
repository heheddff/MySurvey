<template>
  <div>
    <!--<Select v-model="topic.selectContent" class="dropdown item">
      <Option
        :label="option.o_id"
        v-for="(option, opIndex) in topic.options"
        :disabled="isPreview"
        :value="option.content"
        class="option-item" :key="option.o_id">
        <span>{{option.content}}</span>
        <span class="delete"  title="删除" v-show="isPreview" @click="delOption(index, opIndex)">
          <Icon type="close" size="16"></Icon>
        </span>
      </Option>
    </Select>-->
    <select id="selectType" v-model="topic.selectContent" class="dropdown form-control item">
      <option v-for="(option, opIndex) in topic.options"
        :disabled="isPreview"
        :value="option.o_id"
        class="option-item" :key="option.o_id">{{option.content}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    props: ['topic', 'type', 'isPreview']
  }
</script>

<style>
  .question-item {
    padding: 20px 0;
    min-width: 300px;
  }
  .item {
    width: 250px;
    margin: 5px;
  }
</style>
