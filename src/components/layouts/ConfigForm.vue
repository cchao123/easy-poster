<template>
  <div class="formWrap">
    <div class="custom-form">
      <div>
        <!-- {{curCompConfig }} -->
        <h4>画布设置</h4>
        <ElRow>
          <ElCol :span="5">
            <span class="labelText">宽度:</span>
            <ElInputNumber v-model="canvasConfig.width" :min="750" controls-position="right" style="width: 90px" />
          </ElCol>
          <ElCol :span="5">
            <span class="labelText">高度:</span>
            <ElInputNumber v-model="canvasConfig.height" :min="1334" controls-position="right" style="width: 90px" />
          </ElCol>
          <ElCol :span="12">
            <span class="labelText">画布颜色:</span>
            <ElColor-picker v-model="canvasConfig.background" :predefine="predefineColors" />
          </ElCol>
        </ElRow>
      </div>

      <template v-if="curCompConfig">
        <template v-if="[TemplateType.CONTAINER].includes(curCompConfig.type)">
          <ElDivider />
          <h4>容器设置</h4>
          <ElRow>
            <ElCol :span="5">
              <span class="labelText">宽度:</span>
              <ElInputNumber v-model="curCompConfig.width" :max="canvasConfig.width" controls-position="right"
                style="width: 90px" />
            </ElCol>
            <ElCol :span="5">
              <span class="labelText">高度:</span>
              <ElInputNumber v-model="curCompConfig.height" :max="canvasConfig.height" controls-position="right"
                style="width: 90px" />
            </ElCol>
            <ElCol :span="12">
              <span class="labelText">画布颜色:</span>
              <ElColor-picker v-model="curCompConfig.background" :predefine="predefineColors" />
            </ElCol>
          </ElRow>
        </template>

        <template v-if="['text'].includes(curCompConfig.type)">
          <ElDivider />
          <h4>文字设置</h4>
          <ElRow>
            <ElCol :span="4">
              <span class="labelText">字体颜色:</span>
              <ElColor-picker v-model="curCompConfig.fontColor" :predefine="fontDefineColors" />
            </ElCol>
            <ElCol :span="20">
              <span class="labelText">文字内容:</span>
              <ElInput v-model="curCompConfig.textValue" style="width: 525px" />
            </ElCol>
          </ElRow>
          <br>
          <ElRow>
            <ElCol :span="8">
              <span class="labelText">字体大小:</span>
              <ElInputNumber v-model="curCompConfig.fontSize" :min="12" :step="2" />
            </ElCol>
            <ElCol :span="8">
              <span class="labelText">字体样式:</span>
              <el-select v-model="curCompConfig.fontStyle" style="width: 150px" placeholder="normal">
                <ElOption :label="val" :value="val" v-for="val in FONT_STYlE" />
              </el-select>
            </ElCol>
            <ElCol :span="8">
              <span class="labelText">字体粗细:</span>
              <el-select v-model="curCompConfig.fontWeight" style="width: 150px" placeholder="normal">
                <ElOption :label="val" :value="val" v-for="val in FONT_WEIGHT" />
              </el-select>
            </ElCol>
          </ElRow>
        </template>

        <template
          v-if="[TemplateType.IMAGE, TemplateType.HEAD, TemplateType.BACKGROUND, TemplateType.QRCODE].includes(curCompConfig.type)">
          <ElDivider />
          <h4>素材设置</h4>
          <ElRow>
            <template v-if="[TemplateType.HEAD, TemplateType.QRCODE].includes(curCompConfig.type)">
              <ElCol :span="5">
                <span class="labelText">宽高:</span>
                <ElInputNumber v-model="curCompConfig.width" @change="SyncSetHeight(curCompConfig.width)" :min="0"
                  :max="375" controls-position="right" style="width: 90px" />
              </ElCol>
            </template>
            <template v-else>
              <ElCol :span="5">
                <span class="labelText">宽度:</span>
                <ElInputNumber v-model="curCompConfig.width" :min="0" controls-position="right" style="width: 90px" />
              </ElCol>
              <ElCol :span="5">
                <span class="labelText">高度:</span>
                <ElInputNumber v-model="curCompConfig.height" :min="0" controls-position="right" style="width: 90px" />
              </ElCol>
            </template>
            <ElCol :span="12">
              <span class="labelText">素材地址:</span>
              <ElInput v-model="curCompConfig.url"
                :placeholder="`${curCompConfig.type === TemplateType.QRCODE ? '生成二维码所需链接' : '输入素材地址'}`"
                style="width: 300px" />
            </ElCol>
          </ElRow>
        </template>

        <ElDivider />
        <h4>拖拽设置</h4>
        <ElRow>
          <ElCol :span="3">
            <ElCheckbox v-model="isCheckAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange(isCheckAll)">
              拖拽锁定</ElCheckbox>
          </ElCol>
          <ElCol :span="3">
            <ElCheckboxGroup v-model="curCompConfig.dragDirFixed">
              <ElCheckbox key="x" label="X">锁定X轴</ElCheckbox>
              <ElCheckbox key="y" label="Y">锁定Y轴</ElCheckbox>
            </ElCheckboxGroup>
          </ElCol>
          <ElCol :span="10">
            <div class="dirContainer">
              <div class="icon-wrap iconfont" v-for="btn in POSITION_BUTTON" :key="btn.class" :content="btn.content"
                :placement="btn.placement" @click="changeFixedDirection(btn.direction)"
                :class="`${btn.class} ${btn.direction}`"></div>
            </div>
          </ElCol>
          <ElCol :span="5">
            <ElRow>
              <ElCol>
                <span class="labelText">X轴:</span>
                <ElInputNumber v-model="curCompConfig.point.x" style="width: 120px" />
              </ElCol>
              <ElCol style="margin-top: 5px">
                <span class="labelText">Y轴:</span>
                <ElInputNumber v-model="curCompConfig.point.y" style="width: 120px" />
              </ElCol>
            </ElRow>
          </ElCol>
        </ElRow>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
const FONT_STYlE = ['normal', 'italic'];
const FONT_WEIGHT = ['normal', 'bold', 'bolder'];
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '~/store';
import { DirFun, Direction } from '~/types';
import { POSITION_BUTTON, predefineColors, fontDefineColors, TemplateType } from '~/constants';
const store = useStore();
const curCompIndex = computed(() => store.curCompIndex);
const curCompConfig = computed(() => store.curCompConfig);
const canvasConfig = computed(() => store.canvasConfig);
const isIndeterminate = computed(() => store.isIndeterminate);
const isCheckAll = computed(() => store.isCheckAll);
const { setCheckAllStatus, setCompPoint } = store;

const changeFixedDirection = (direction: Direction) => {
  const dirFun: DirFun = {
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
</script>

<style lang="scss">
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
}</style>
