<template>
  <div class="formWrap">
    <div class="custom-form">
      <div>
        <h4>画布设置</h4>
        <el-row>
          <el-col :span="5">
            <span class="labelText">宽度:</span>
            <el-input-number v-model="canvasConfig.width"
                             :min="375"
                             controls-position="right"
                             style="width: 90px" />
          </el-col>
          <el-col :span="5">
            <span class="labelText">高度:</span>
            <el-input-number v-model="canvasConfig.height"
                             :min="667"
                             controls-position="right"
                             style="width: 90px" />
          </el-col>
          <el-col :span="12">
            <span class="labelText">画布颜色:</span>
            <el-color-picker v-model="canvasConfig.background"
                             show-alpha />
          </el-col>

        </el-row>
      </div>
      <template v-if="currentCompConfig">
        <template v-if="['text'].includes(currentCompConfig.type)">
          <el-divider />
          <h4>文字设置</h4>
          <el-row>
            <el-col :span="4">
              <span class="labelText">字体颜色:</span>
              <el-color-picker v-model="currentCompConfig.style.fontColor"
                               show-alpha />
            </el-col>
            <el-col :span="20">
              <span class="labelText">文字内容:</span>
              <el-input v-model="currentCompConfig.style.textValue"
                        style="width: 525px" />
            </el-col>
          </el-row>
          <br>
          <el-row>
            <el-col :span="8">
              <span class="labelText">字体大小:</span>
              <el-input-number v-model="currentCompConfig.style.fontSize"
                               @change="elInputNumberChange"
                               min="12"
                               :step="2" />
            </el-col>
            <el-col :span="8">
              <span class="labelText">字体样式:</span>
              <el-select v-model="currentCompConfig.style.fontStyle"
                         style="width: 150px"
                         placeholder="normal">
                <el-option label="normal"
                           value="normal" />
                <el-option label="italic"
                           value="italic" />
              </el-select>
            </el-col>

            <el-col :span="8">
              <span class="labelText">字体粗细:</span>
              <el-select v-model="currentCompConfig.style.fontWeight"
                         style="width: 150px"
                         placeholder="normal">
                <el-option label="normal"
                           value="normal" />
                <el-option label="bold"
                           value="bold" />
                <el-option label="bolder"
                           value="bolder" />
              </el-select>
            </el-col>
          </el-row>
        </template>

        <template v-if="['image', 'head', 'background', 'qrcode'].includes(currentCompConfig.type)">
          <el-divider />
          <h4>素材设置</h4>
          <el-row>
            <el-col :span="5">
              <span class="labelText">宽度:</span>
              <el-input-number :min="1"
                               :max="10"
                               controls-position="right"
                               style="width: 90px" />
            </el-col>
            <el-col :span="5">
              <span class="labelText">高度:</span>
              <el-input-number :min="1"
                               :max="10"
                               controls-position="right"
                               style="width: 90px" />
            </el-col>
            <el-col :span="12">
              <span class="labelText">素材地址:</span>
              <el-input v-model="currentCompConfig.style.url"
                        placeholder="生成二维码所需链接"
                        style="width: 300px" />
            </el-col>

          </el-row>
        </template>

        <el-divider />
        <h4>拖拽设置 ~ [ {{currentCompConfig.point.x  }}, {{currentCompConfig.point.y  }} ]</h4>
        <el-checkbox v-model="checkAll"
                     :indeterminate="isIndeterminate"
                     @change="handleCheckAllChange">锁定位置</el-checkbox>
        <el-checkbox-group v-model="checkedCities"
                           @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities"
                       :key="city"
                       :label="city">{{
              city
            }}</el-checkbox>
        </el-checkbox-group>
  <br>
        <el-button-group>
          <el-button type="primary"
                     style="width: 10px!important">靠左</el-button>
          <el-button type="primary"
                     style="width: 50px">靠右</el-button>
          <el-button type="primary"
                     style="width: 50px">靠上</el-button>
          <el-button type="primary"
                     style="width: 50px">靠下</el-button>
        </el-button-group>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from '~/store';

const store = useStore();
// const currentCompIndex = computed(() => store.currentCompIndex);
const currentCompConfig = computed(() => store.currentCompConfig);
const canvasConfig = computed(() => store.canvasConfig);

const { setCurrentCompValue } = store;

const elInputNumberChange = (currentValue: number) => {
  setCurrentCompValue('fontSize', currentValue);
};

const checkAll = ref(false);
const isIndeterminate = ref(false);
const checkedCities = ref();
const cities = ['锁定X', '锁定Y'];

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};
</script>

<style lang="postcss">
.formWrap {
  flex: 1;
  border-bottom: 1px solid var(--ep-menu-border-color);
}

.custom-form {
  /* padding: 0 25px; */
  margin: 0 25px;
  text-align: left;
}

.labelText {
  font-size: 0.83em;
  font-weight: bold;
  margin-right: 10px;
}

.row-width {
}
</style>
