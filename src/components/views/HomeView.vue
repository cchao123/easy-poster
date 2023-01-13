<template>
  <div class="worktop">
    <!-- 层级关系 背景 漂浮物 文字 -->
    <div class="worktop-options">
      <div>
        <div>组件库：</div>
        <!-- <div><button @click="addCom('img')">添加一个图片组件</button></div> -->
        <br>
        <div><button @click="addCom('text')">添加一个文本组件</button></div>
        <br>
        <div><button @click="addCom('btn')">添加一个按钮组件</button></div>
      </div>

      <br>
      <br>
      <br>
      <br>
      <br>
      <div>当前组件参数：</div>
      <br>
      <div v-for="(cmp, ind) in cmptList" :key="ind">
        <hr>
        <div style="background-color: #FEFEFE">
          <div>No.{{ind + 1}}:</div>
          <b>类型：</b>{{ cmp.type }}组件 <button @click="del">删除</button>
          <br>
          <b>内容：</b><input type="text" v-model="cmp.url">
        </div>
      </div>
      <hr>
      <br>
      <br>
      <br>
      <br>
      <el-button type="info" @click="onSubmit">保存页面</el-button>
      <el-form :model="form" label-width="120px" v-if="false">
        <el-form-item label="背景相关配置">
          <el-input />
        </el-form-item>
 
        <el-form-item label="">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="预览区域尺寸">
          <el-select v-model="form.region" placeholder="please select your zone">
            <el-option label="iPhone 6/7/8 (375 * 667)" value="6" />
            <el-option label="iPhone11 Pro (378 * 812)" value="11" />
            <el-option label="iPhone12 Pro (400 * 700)" value="12" />
          </el-select>
        </el-form-item>

   
        <el-form-item label="代码风格">
          <el-switch v-model="form.isPixi" inline-prompt style="--el-switch-on-color: #5896ef; --el-switch-off-color: #5896ef" active-text="使用Pixi代码" inactive-text="使用html2Canvas代码" />
        </el-form-item>

        <el-form-item>
          <el-button type="info" @click="onSubmit">保存页面</el-button>
          <el-button type="primary" @click="onSubmit">暂存配置</el-button>
          <el-button>重置配置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <img src="https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-bg-new.png" alt=""> -->
    <!-- 预览模块 -->
    <div class="worktop-preview">
      <template v-for="(cmp, ind) in cmptList" :key="ind">
        <BtnComp @updatePoint="updatePoint" :config="cmp" :ind="ind" v-if="cmp.type === 'btn'"></BtnComp>
        <TextComp @updatePoint="updatePoint" :config="cmp" :ind="ind" v-if="cmp.type === 'text'"></TextComp>
        <ImgComp @updatePoint="updatePoint" :config="cmp" :ind="ind" v-if="cmp.type === 'img'"></ImgComp>
      </template>

      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import BtnComp from './btmComp.vue'
import TextComp from './textComp.vue'
import ImgComp from './imgComp.vue'
import { setStorage } from './../../libs/storage'
export default defineComponent({
  components: {
    BtnComp,
    TextComp,
    ImgComp,
  },
  setup() {
    const form = ref({
      name: '',
      region: '',
      date1: '',
      date2: '',
      isPixi: true,
      type: [],
      resource: '',
      desc: '',
    })
    const cmptList = ref([
      {
        type: 'btn',
        url: '我是按钮',
        point: {
          x: 0,
          y: 0,
        }
      },
      {
        type: 'img',
        url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/core/news_logo_200.png',
        point: {
          x: 100,
          y: 0,
        }
      },
      {
        type: 'text',
        url: '我是文案',
        point: {
          x: 50,
          y: 300,
        }
      },
    ]);
    const onSubmit = () => {
      console.log(cmptList.value)
      setStorage('QWEQWEQWEQWEQWE_QWEQWEQWE', JSON.stringify(cmptList.value));
    }

    const addCom = (type: string) =>{
      cmptList.value.push({
        type: type,
        url: type,
        point: {
          x: 0,
          y: 0,
        }
      });
    };
    
    const del = (index: number)=> {
      cmptList.value.splice(index, 1)
    }

    const updatePoint = (a: any,b: any)=>{
      if (b!=undefined) {
        cmptList.value[b].point.x = a.moveX;
        cmptList.value[b].point.y = a.moveY;
      }
    }
    return {
      addCom,
      del,
      form,
      onSubmit,
      cmptList,
      updatePoint,
    }
  }
})

</script>

<style lang="postcss">
.worktop {
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
}

.worktop-preview {
  position: relative;
  margin-left: 340px;
  width: 375px;
  height: 667px;
  /* transform: translateY(-333px) scale(0.5); */
  /* width: 750px;
  height: 1334px; */
  background-color: #fff;
  /* box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08); */
  box-shadow: 0px 16px 48px 16px rgba(0, 0, 0, .08), 0px 12px 32px rgba(0, 0, 0, .12), 0px 8px 16px -8px rgba(0, 0, 0, .16);
  img {
    width: 50%;
  }
}

.aaa {
    /* display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 27px;
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 87px;
    font-weight: 500;
    font-size: 12px;
    color: #ffd2ae;
    border-radius: 16.5px;
    box-shadow: 0 4px 7px -3px #ab0100, inset 0 0 4px 0 rgba(131, 12, 11, 0.86);
    border: solid 2px #e76563;
    background-image: linear-gradient(to bottom, #ff534f, #c91d1a); */
}



.disabled {
  border-image: none;
  border-color: #ea70ef;
  color: #ea70ef;
  background-image: none;
  background-color: #fff;
}
</style>