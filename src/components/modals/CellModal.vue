<template>
  <div class="modalBack" :class="{ open: state.modals.cell }" @click.self="closeCellModal">
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modalHead">
        <div class="modalTitle">Задачи в ячейке</div>
        <button class="btn ghost" title="Закрыть (Esc)" @click="closeCellModal">✕</button>
      </div>
      <div class="modalBody">
        <div class="small muted">{{ metaText }}</div>
        <div style="height: 10px"></div>
        <div class="twoCols">
          <div>
            <label class="small muted">Задача 1:</label>
            <select v-model="state.cellModal.task1" class="select" style="width: 100%">
              <option v-for="p in selectableProjects" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </div>
          <div>
            <label class="small muted">Задача 2 (опционально):</label>
            <select v-model="state.cellModal.task2" class="select" style="width: 100%" :disabled="state.cellModal.isHalf">
              <option value="">— Нет второй задачи —</option>
              <option v-for="p in selectableProjects" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </div>
          <div style="margin-top: 10px; display: flex; align-items: center; gap: 10px">
            <input id="halfCellCk" v-model="state.cellModal.isHalf" type="checkbox" @change="onToggleHalf" />
            <label for="halfCellCk" class="small muted">Пол-ячейки (0,25ч). Вторая задача будет недоступна.</label>
          </div>
        </div>
        <div class="hint">{{ selectableProjects.length ? 'Можно выбрать до 2 задач в одной ячейке.' : 'Открой “Проекты” и сними “Оплачено” у проекта.' }}</div>
      </div>
      <div class="modalFoot">
        <button class="btn" @click="clearCellModal">Очистить</button>
        <button class="btn primary" :disabled="!selectableProjects.length" @click="saveCellModal">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useTimeTracker } from '../../composables/useTimeTracker'
const { state, selectableProjects, slotMultiplier, slotToLabel, saveCellModal, clearCellModal, closeCellModal } = useTimeTracker()
const metaText = computed(() => {
  const { dateISO, slot, isHalf, task1, task2 } = state.cellModal
  if (dateISO == null) return ''
  const count = [task1, !isHalf && task2].filter(Boolean).length
  const label = count === 2 ? '2 задачи по 0.25ч' : (isHalf ? '1 задача 0.25ч (пол-ячейки)' : '1 задача 0.5ч')
  return `${dateISO} • ${slotToLabel(slot)} – ${slotToLabel(slot + 1)} • x${slotMultiplier(dateISO, slot)} • ${label}`
})
function onToggleHalf() { if (state.cellModal.isHalf) state.cellModal.task2 = '' }
watch(() => state.cellModal.task2, (v) => { if (v) state.cellModal.isHalf = false })
</script>
