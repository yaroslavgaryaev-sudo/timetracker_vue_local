<template>
  <div class="panel active">
    <div class="row">
      <div class="controls calendarNavControls">
        <button class="btn icon" title="Предыдущая неделя" @click="goPrevWeek">←</button>
        <button class="btn" @click="showTodayWeek">Текущая неделя</button>
        <button class="btn icon" title="Следующая неделя" @click="goNextWeek">→</button>

        <select class="select" :value="selectedMonth" title="Месяц" @change="selectedMonth = Number($event.target.value)">
          <option v-for="(label, i) in monthOptions" :key="label" :value="i">{{ label }}</option>
        </select>
        <select class="select mono" :value="selectedYear" title="Год" @change="selectedYear = Number($event.target.value)">
          <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
        </select>

        <span class="pillNote">
          <span class="kbd">Клик</span> по дате в заголовке: <b>Рабочий ↔ Выходной</b>
        </span>
      </div>
      <div class="controls">
        <span class="small muted"><span class="kbd">Esc</span> — закрыть окно.</span>
      </div>
    </div>

    <div class="hint" style="margin-bottom: 10px">{{ currentWeekLabel }}</div>

    <CalendarGrid />

    <div class="hint">В одной ячейке можно хранить 1 или 2 задачи: 1 задача = 0.5ч, 2 задачи = по 0.25ч каждая.</div>
  </div>
</template>

<script setup>
import { useTimeTracker } from '../../composables/useTimeTracker'
import CalendarGrid from './CalendarGrid.vue'
const { monthOptions, yearOptions, selectedMonth, selectedYear, currentWeekLabel, showTodayWeek, goPrevWeek, goNextWeek } = useTimeTracker()
</script>
