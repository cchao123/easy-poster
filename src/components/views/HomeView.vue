<template>
  <div class="worktop">
    <!-- 层级关系 背景 漂浮物 文字 -->
    <div class="worktop-options">
      <el-form :model="form" label-width="120px">
        <el-form-item label="背景相关配置">
          <el-input />
        </el-form-item>
 
        <el-form-item label="">
          <el-input v-model="form.name" />
        </el-form-item>

        <!-- <el-form-item label="预览区域尺寸">
          <el-select v-model="form.region" placeholder="please select your zone">
            <el-option label="iPhone 6/7/8 (375 * 667)" value="6" />
            <el-option label="iPhone11 Pro (378 * 812)" value="11" />
            <el-option label="iPhone12 Pro (400 * 700)" value="12" />
          </el-select>
        </el-form-item> -->

   
        <el-form-item label="代码风格">
          <el-switch v-model="form.isPixi" inline-prompt style="--el-switch-on-color: #5896ef; --el-switch-off-color: #5896ef" active-text="使用Pixi代码" inactive-text="使用html2Canvas代码" />
        </el-form-item>

        <el-form-item>
          <el-button type="info" @click="onSubmit">生成代码</el-button>
          <el-button type="primary" @click="onSubmit">暂存配置</el-button>
          <el-button>重置配置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 预览模块 -->
    <div class="worktop-preview">
      <!-- <img src="https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-bg-new.png" alt=""> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
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
    const onSubmit = () => {
      console.log('submit!')
    }
    return {
      form,
      onSubmit,
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
</style>