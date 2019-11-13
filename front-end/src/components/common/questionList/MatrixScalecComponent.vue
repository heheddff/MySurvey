<template>
  <!--矩阵量表-->
    <div class="table-responsive div_table_radio_question">
        <table class="text-center" cellpadding="5" cellspacing="0" style="width: 100%;">
          <tbody>
            <tr  v-for="(row,rindex) in topic.rows" :key="rindex">
              <td class="text-left" width="12%">{{row.content}}</td>
              <td>
                <ul>
                  <li :class="{on2:onStatus, off2:offStatus}"
                      v-for="(option,index) in topic.options"
                      :key="index"
                      @click="mouseOver($event,index,rindex,row.r_id,option.o_id)"
                      ></li>
                </ul>
              </td>
            </tr>
      </tbody>
      </table>
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
    methods: {
      mouseOver (e, index, rindex, rId, oId) {
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
          this.topic.selectContent[rindex] = rId + '_' + oId
        }
      },
      mouseLeave (e, index) {
        e.target.className = 'off2'
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
