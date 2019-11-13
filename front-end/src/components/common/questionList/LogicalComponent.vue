<template>
  <div>
    <Button type="primary" @click="modal1 = true">Display dialog box</Button>
    <Modal
        v-model="modal1"
        title="逻辑选项"
        @on-ok="ok"
        @on-cancel="cancel">
        <div v-if="questions.length > 0" class="form-inline form-group">
          <select class="dropdown form-control item" v-model="guanid">
            <option v-for="(question,index) in questions" :value="index">{{question.question}}</option>
          </select>
        </div>
    </Modal>
  </div>
</template>
<script>
import PubSub from 'pubsub-js'
export default {
  props: ['questions'],
  data () {
    return {
      modal1: false,
      guanid: ''
    }
  },
  methods: {
    ok () {
      // this.$Message.info(this.guanid)
      PubSub.publish('guanlian', this.guanid)
    },
    cancel () {
      // this.$Message.info('Clicked cancel')
      PubSub.publish('guanlian', 'cancel')
    }
  }
}
</script>
