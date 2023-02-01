<template>
  <div class="ffff">{{currentCompIndex}}
    {{ currentCompConfig }}
    <el-form label-width="100px"
             v-if="currentCompConfig">
      <el-form-item label="位置锁定">
        <el-switch v-model="form.delivery" />
      </el-form-item>

      <el-form-item label="图片地址">
        <el-col :span="18">
          <el-input v-model="currentCompConfig.style.url">
            <!-- <template #prepend>Http://</template> -->
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="文字内容">
        <el-col :span="18">
          <el-input v-model="currentCompConfig.style.textValue"
                    type="textarea" />
        </el-col>

      </el-form-item>

      <el-form-item label="字体样式">
        <el-select v-model="currentCompConfig.style.fontStyle"
                   placeholder="normal">
          <el-option label="normal"
                     value="normal" />
          <el-option label="italic"
                     value="italic" />
        </el-select>
      </el-form-item>

      <el-form-item label="字体粗细">
        <el-select v-model="form.region"
                   placeholder="normal">
          <el-option label="normal"
                     value="normal" />
          <el-option label="bold"
                     value="bold" />
          <el-option label="bolder"
                     value="bolder" />
        </el-select>
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-col :span="1">
          <el-color-picker v-model="color"
                           show-alpha />
        </el-col>
      </el-form-item>

      <el-form-item label="输出代码">
        <el-radio-group v-model="form.resource">
          <el-radio label="HTML2Cancas" />
          <el-radio label="Pixi.js" />
        </el-radio-group>
      </el-form-item>

    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useStore } from '~/store';

const store = useStore();
const currentCompIndex = computed(() => store.currentCompIndex);
const currentCompConfig = computed(() => store.compList[currentCompIndex.value]);
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});
</script>
<style lang="postcss">
.ffff {
  flex: 1;
  border-bottom: 1px solid var(--ep-menu-border-color);
}
</style>
