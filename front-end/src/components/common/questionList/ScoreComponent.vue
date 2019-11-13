<template>
  <!--量表题-->
    <div class="table-responsive div_table_radio_question">
      <div style="float: left;">
        <span style="margin-right: 10px;">{{options[0].content}}</span>
      </div>
      <div style="float: left;">
        <ul>
          <li :class="{on2:onStatus, off2:offStatus}"
              v-for="(option,index) in options"
              :key="index"
              @click="mouseOver($event,index,option.o_id)">
          </li>
        </ul>
      </div>
      <div>
        <span style="margin-left: 10px;">{{options[options.length - 1].content}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    props: ['topic', 'type', 'isPreview'],
    data () {
      return {
        onStatus: false,
        offStatus: true
      }
    },
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
    },
    methods: {
      mouseOver (e, index, oId) {
        if (this.isPreview) {
          return
        }
        var _parent = e.target.parentElement
        var _child = _parent.children
        // var arr = []
        for (var i = 0; i < _child.length; i++) {
          if (i <= index) {
            _child[i].className = 'on2'
          } else {
            _child[i].className = 'off2'
          }
          // arr.push(_childI)
        }
        this.topic.selectContent = oId
      }
    }
  }
</script>

<style>
  .off2 {
      background: url('../../../assets/wjxstar.png') no-repeat;
      width: 24px;
      height: 24px;
      text-decoration: none;
      cursor: pointer;
  }
  .on2 {
      background: url('../../../assets/wjxstar.png') no-repeat;
      width: 24px;
      height: 24px;
      text-decoration: none;
      cursor: pointer;
      background-position: 0 -28px;
  }
  ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
      clear: both;
  }
  dl, dt, dd, ul, li, ol, p, form, img {
      padding: 0px;
      margin: 0px;
      list-style: none;
      border: none;
  }
  li {
      float: left;
      display: list-item;
      text-align: -webkit-match-parent;
      padding-left:3px;
  }
</style>
