<template>
    <el-date-picker v-bind="getBind" v-model="modelValue">
    </el-date-picker>
</template>
<script lang="tsx" setup>
import { computed, type ModelRef } from 'vue';
import { omit } from 'lodash'
import type { Props, ShortEvent } from './types'
import defaultProps from './defaultProps';
import { getInheritanceEvent } from '@/utils';
import dayjs from 'dayjs';
const props = withDefaults(defineProps<Props>(), defaultProps)
const emit = defineEmits<ShortEvent>()
const modelValue = defineModel<string | string[]>() as any
const getBind: any = computed(() => {
    /**
     * 模式对应格式化规则
     */
    const format = {
        year: 'YYYY',
        years: 'YYYY',
        month: 'MM',
        date: 'YYYY-MM-DD',
        dates: 'YYYY-MM-DD',
        daterange: 'YYYY-MM-DD',
        monthrange: 'YYYY-MM',
        datetime: 'YYYY-MM-DD HH:mm:ss',
        datetimerange: 'YYYY-MM-DD HH:mm:ss',
    }[props.type]
    return {
        style: {
            width: '100%'
        },
        valueFormat: props.valueFormat ?? format,
        format: props.format ?? format,
        /**
         * 快速选项
         */
        shortcuts: props.shortcuts ?? (
            (props.type === 'monthrange' || props.type === 'daterange' || props.type === 'datetimerange') ? [] : [
                {
                    text: '一月前',
                    value: checkDisabledDate(dayjs().subtract(1, 'M')) ? false : dayjs().subtract(1, 'M')
                },
                {
                    text: '一周前',
                    value: checkDisabledDate(dayjs().subtract(1, 'w')) ? false : dayjs().subtract(1, 'w')
                },
                {
                    text: '现在',
                    value: checkDisabledDate(dayjs()) ? false : dayjs()
                }, {
                    text: '一周后',
                    value: checkDisabledDate(dayjs().add(1, 'w')) ? false : dayjs().add(1, 'w')
                }, {
                    text: '一月后',
                    value: checkDisabledDate(dayjs().add(1, 'M')) ? false : dayjs().add(1, 'M')
                },
            ].filter((item) => item.value)
        ),
        /**
         * 禁用日期
         */
        disabledDate: checkDisabledDate,
        /**
         * datetime模式的默认时间
         */
        defaultTime: (dayjs(props.defaultTime).isValid() ? dayjs(props.defaultTime) : dayjs()).toDate(),
        ...omit(props, ['modelValue', 'valueFormat', 'format', 'shortcuts', 'disabledDate', 'min', 'max', 'shortcuts', 'defaultTime']),
        ...getInheritanceEvent(emit, ['change']),
    }
})
/**
* 检查禁用日期
*/
function checkDisabledDate(date: dayjs.ConfigType = dayjs()) {
    const actDay = dayjs(date)
    if (props.min && (actDay.isBefore(props.min))) {
        return true
    }
    if (props.max && (actDay.isAfter(props.max))) {
        return true
    }
    return props.disabledDate ? props.disabledDate(date) : false
}
</script>