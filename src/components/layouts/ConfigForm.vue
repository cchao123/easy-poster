<template>
  <div class="formWrap">
    <div class="custom-form">
      <div>
        {{curCompConfig }}
        <h4>画布设置</h4>
        <el-row>
          <el-col :span="5">
            <span class="labelText">宽度:</span>
            <el-input-number v-model="canvasConfig.width"
                             :min="750"
                             controls-position="right"
                             style="width: 90px" />
          </el-col>
          <el-col :span="5">
            <span class="labelText">高度:</span>
            <el-input-number v-model="canvasConfig.height"
                             :min="1334"
                             controls-position="right"
                             style="width: 90px" />
          </el-col>
          <el-col :span="12">
            <span class="labelText">画布颜色:</span>
            <el-color-picker v-model="canvasConfig.background"
                             :predefine="predefineColors" />
          </el-col>

        </el-row>
      </div>

      <template v-if="curCompConfig">
        <template v-if="['container'].includes(curCompConfig.type)">
          <el-divider />
          <h4>容器设置</h4>
          <el-row>
            <el-col :span="5">
              <span class="labelText">宽度:</span>
              <el-input-number v-model="curCompConfig.width"
                               :max="canvasConfig.width"
                               controls-position="right"
                               style="width: 90px" />
            </el-col>
            <el-col :span="5">
              <span class="labelText">高度:</span>
              <el-input-number v-model="curCompConfig.height"
                               :max="canvasConfig.height"
                               controls-position="right"
                               style="width: 90px" />
            </el-col>
            <el-col :span="12">
              <span class="labelText">画布颜色:</span>
              <el-color-picker v-model="curCompConfig.background"
                               :predefine="predefineColors" />
            </el-col>

          </el-row>
        </template>

        <template v-if="['text'].includes(curCompConfig.type)">
          <el-divider />
          <h4>文字设置</h4>
          <el-row>
            <el-col :span="4">
              <span class="labelText">字体颜色:</span>
              <el-color-picker v-model="curCompConfig.fontColor" :predefine="fontDefineColors" />
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
                               :min="12"
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
            <template v-if="[ 'head','qrcode'].includes(curCompConfig.type)">
              <el-col :span="5">
                <span class="labelText">宽高:</span>
                <el-input-number v-model="curCompConfig.width"
                                 @change="SyncSetHeight"
                                 :min="0"
                                 :max="375"
                                 controls-position="right"
                                 style="width: 90px" />

              </el-col>
              <!-- <el-col :span="5">
                <span class="labelText">圆角:</span>
                <el-input-number v-model="curCompConfig.radius"
                                 :min="0"
                                 :max="100"
                                 controls-position="right"
                                 style="width: 90px" />

              </el-col> -->
            </template>
            <template v-else>
              <el-col :span="5">
                <span class="labelText">宽度:</span>
                <el-input-number v-model="curCompConfig.width"
                                 :min="0"
                                 controls-position="right"
                                 style="width: 90px" />
              </el-col>
              <el-col :span="5">
                <span class="labelText">高度:</span>
                <el-input-number v-model="curCompConfig.height"
                                 :min="0"
                                 controls-position="right"
                                 style="width: 90px" />
              </el-col>
            </template>
            <el-col :span="12">
              <span class="labelText">素材地址:</span>
              <el-input v-model="curCompConfig.url"
                        placeholder="生成二维码所需链接"
                        style="width: 300px" />
            </el-col>

          </el-row>
        </template>

        <el-divider />
        <h4>拖拽设置</h4>
        <el-row>
          <el-col :span="3">
            <el-checkbox v-model="isCheckAll"
                         :indeterminate="isIndeterminate"
                         @change="handleCheckAllChange">拖拽锁定</el-checkbox>
          </el-col>
          <el-col :span="3">
            <el-checkbox-group v-model="curCompConfig.dragDirFixed"
                               @change="handleCheckedCitiesChange">
              <el-checkbox key="x"
                           label="X">锁定X轴</el-checkbox>
              <el-checkbox key="y"
                           label="Y">锁定Y轴</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="10">
            <div class="dirContainer">
              <div class="icon-wrap iconfont"
                   v-for="btn in POSITION_BUTTON"
                   :key="btn.class"
                   :content="btn.content"
                   :placement="btn.placement"
                   @click="changeFixedDirection(btn.direction)"
                   :class="`${btn.class} ${btn.direction}`"></div>
            </div>
          </el-col>
          <el-col :span="5">
            <el-row>
              <el-col>
                <span class="labelText">X轴:</span>
                <el-input-number v-model="curCompConfig.point.x"
                                 style="width: 120px" />
              </el-col>
              <el-col style="margin-top: 5px">
                <span class="labelText">Y轴:</span>
                <el-input-number v-model="curCompConfig.point.y"
                                 style="width: 120px" />
              </el-col>
            </el-row>

          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from '~/store';
import { POSITION_BUTTON, predefineColors, fontDefineColors, TemplateType } from '~/constants';
const store = useStore();
const curCompIndex = computed(() => store.curCompIndex);
const curCanvasId = computed(() => store.curCanvasId);
const curCanvasIndex = computed(() => store.curCanvasIndex);
const compList = computed(() => store.compList);
const historyList = computed(() => store.historyList);
const curCompConfig = computed(() => store.curCompConfig);
const canvasConfig = computed(() => store.canvasConfig);
const isIndeterminate = computed(() => store.isIndeterminate);
const isCheckAll = computed(() => store.isCheckAll);
const { setCheckAllStatus, setCompPoint } = store;

const changeFixedDirection = (direction: string) => {
  const { setDOMparams } = store;
  const dirFun = {
    bottom: () => setCompPoint(curCompIndex.value, 'y', canvasConfig.value.height - curCompConfig.value.height),
    top: () => setCompPoint(curCompIndex.value, 'y', 0),
    left: () => setCompPoint(curCompIndex.value, 'x', 0),
    right: () => setCompPoint(curCompIndex.value, 'x', canvasConfig.value.width - curCompConfig.value.width),
    center: () => {
      if (curCompConfig.value.type === TemplateType.TEXT)
        setCompPoint(curCompIndex.value, 'x', canvasConfig.value.width / 2 - curCompConfig.value.width);
      else setCompPoint(curCompIndex.value, 'x', canvasConfig.value.width / 2 - curCompConfig.value.width / 2);
    },
    middle: () => setCompPoint(curCompIndex.value, 'y', canvasConfig.value.height / 2 - curCompConfig.value.height / 2),
  };
  dirFun[direction]();
};

const SyncSetHeight = (num: number) => {
  curCompConfig.value.height = num;
};

const handleCheckAllChange = (status: boolean) => {
  setCheckAllStatus(status);
};

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
};
</script>

<style lang="postcss">
.formWrap {
  border-bottom: 1px solid var(--ep-menu-border-color);
  padding-bottom: 20px;
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
  position: absolute;
  left: 50%;
  right: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--ep-fill-color-light);
  color: var(--ep-text-color-regular);
  border-radius: 4px;
}

.dirContainer {
  position: relative;
  left: -30px;
}

.top {
  transform: translateY(-45px);
}

.left {
  transform: translateX(-80px);
}

.bottom {
  transform: translateY(45px) rotate(180deg);
}

.right {
  transform: translateX(80px) rotate(180deg);
}

.center {
  transform: translateX(-25px) rotate(90deg);
}

.middle {
  transform: translateX(25px);
}
</style>
