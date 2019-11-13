<template>
  <div>
    <Checkbox-group v-model="topic.selectContent" class="checkbox-list">
      <Checkbox
        :label="option.o_id"
        v-for="(option, opIndex) in topic.options"
        :disabled="isPreview"
        class="option-item" :key="option.o_id">
        <span>{{option.content}}</span>
        <!--<span class="delete"  title="删除" v-show="isPreview" @click="delOption(index, opIndex)">
          <Icon type="close" size="16"></Icon>
        </span>-->
      </Checkbox>
    </Checkbox-group>
  </div>
</template>

<script>
  export default {
    props: ['topic', 'type', 'isPreview'],
    methods: {
      delOption (index, opIndex) {
        this.$store.dispatch('delOption', {
          index: index,
          opIndex: opIndex
        })
      }
    }
  }
</script>

<style>
  .checkbox-list label {
    display: block;
  }
</style>
