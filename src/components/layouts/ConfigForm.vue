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

      <template v-if="curCompConfig">
        <template v-if="['container'].includes(curCompConfig.type)">
          <h4>容器设置</h4>
          <el-row>
            <el-col :span="5">
              <span class="labelText">宽度:</span>
              <el-input-number v-model="curCompConfig.width"
                               :max="375"
                               controls-position="right"
                               style="width: 90px" />
            </el-col>
            <el-col :span="5">
              <span class="labelText">高度:</span>
              <el-input-number v-model="curCompConfig.height"
                               :max="667"
                               controls-position="right"
                               style="width: 90px" />
            </el-col>
            <el-col :span="12">
              <span class="labelText">画布颜色:</span>
              <el-color-picker v-model="curCompConfig.background"
                               show-alpha />
            </el-col>

          </el-row>
        </template>

        <template v-if="['text'].includes(curCompConfig.type)">
          <el-divider />
          <h4>文字设置</h4>
          <el-row>
            <el-col :span="4">
              <span class="labelText">字体颜色:</span>
              <el-color-picker v-model="curCompConfig.fontColor"
                               show-alpha />
            </el-col>
            <el-col :span="20">
              <span class="labelText">文字内容:</span>
              <el-input v-model="curCompConfig.textValue"
                        style="width: 525px" />
            </el-col>
          </el-row>
          <br>
          <el-row>
            <el-col :span="8">
              <span class="labelText">字体大小:</span>
              <el-input-number v-model="curCompConfig.fontSize"
                               @change="elInputNumberChange"
                               min="12"
                               :step="2" />
            </el-col>
            <el-col :span="8">
              <span class="labelText">字体样式:</span>
              <el-select v-model="curCompConfig.fontStyle"
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
              <el-select v-model="curCompConfig.fontWeight"
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

        <template v-if="['image', 'head', 'background', 'qrcode'].includes(curCompConfig.type)">
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
              <el-input v-model="curCompConfig.url"
                        placeholder="生成二维码所需链接"
                        style="width: 300px" />
            </el-col>

          </el-row>
        </template>

        <el-divider />
        <h4>拖拽设置 ~ [ {{curCompConfig.point.x  }}, {{curCompConfig.point.y  }} ]</h4>

        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="isCheckAll"
                         :indeterminate="isIndeterminate"
                         @change="handleCheckAllChange">拖拽锁定</el-checkbox>
          </el-col>
          <el-checkbox-group v-model="curCompConfig.drag.directionFixed"
                             @change="handleCheckedCitiesChange">
            <el-checkbox key="x"
                         label="X">锁定X</el-checkbox>
            <el-checkbox key="y"
                         label="Y">锁定Y</el-checkbox>
          </el-checkbox-group>
          
          <el-tooltip v-for="btn in POSITION_BUTTON"
                      :key="btn.class"
                      :content="btn.content"
                      placement="top">
            <div class="icon-wrap iconfont"
            @click="changeABABABAB"
                 :class="btn.class"></div>
          </el-tooltip>
        </el-row>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from '~/store';
import { POSITION_BUTTON } from '~/constants';

const store = useStore();
const curCompConfig = computed(() => store.curCompConfig);
const canvasConfig = computed(() => store.canvasConfig);
const isIndeterminate = computed(() => store.isIndeterminate);
const isCheckAll = computed(() => store.isCheckAll);

const { setCurCompValue, setCheckAllStatus } = store;


const changeABABABAB = () => {
}

const elInputNumberChange = (currentValue: number) => {
  setCurCompValue('fontSize', currentValue);
};


const handleCheckAllChange = (status: boolean) => {
  setCheckAllStatus(status);
};
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  // checkedCount && checkedCount === curCompConfig.value.drag.directionFixed.length ? setCheckAllStatus(true): setCheckAllStatus(false);
};
</script>

<style lang="postcss">
.formWrap {
  flex: 1;
  border-bottom: 1px solid var(--ep-menu-border-color);
}

.custom-form {
  margin: 0 25px;
  text-align: left;
}

.labelText {
  font-size: 0.83em;
  font-weight: bold;
  margin-right: 10px;
}

.icon-wrap {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  background-color: var(--ep-fill-color-light);
  color: var(--ep-text-color-regular);
  border-radius: 4px;
}

.icon-r-180 {
  transform: rotate(180deg);
}

.icon-r-90 {
  transform: rotate(90deg);
}
</style>
