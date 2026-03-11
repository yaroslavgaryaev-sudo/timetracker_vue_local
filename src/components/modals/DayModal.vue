<template>
  <div class="modalBack" :class="{ open: state.modals.day }" @click.self="closeDayModal">
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modalHead">
        <div class="modalTitle">День: Рабочий / Выходной</div>
        <button class="btn ghost" title="Закрыть (Esc)" @click="closeDayModal">✕</button>
      </div>
      <div class="modalBody">
        <div class="small muted">{{ state.dayModal.dateISO }}</div>
        <div style="height: 10px"></div>
        <div class="pillNote">{{ explain }}</div>
        <div class="hint" style="margin-top: 10px">{{ hint }}</div>
      </div>
      <div class="modalFoot">
        <button class="btn" @click="applyResetDay">Сбросить</button>
        <button class="btn primary" @click="applyToggleDay">Переключить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTimeTracker } from '../../composables/useTimeTracker'
const { state, getOverride, applyResetDay, applyToggleDay, closeDayModal } = useTimeTracker()
const explain = computed(() => {
  const ov = getOverride(state.dayModal.dateISO)
  if (ov === true) return 'Сейчас день принудительно помечен как выходной (x1.5 весь день).'
  if (ov === false) return 'Сейчас день принудительно помечен как рабочий.'
  return 'Сейчас используется автоматическое правило по дню недели.'
})
const hint = computed(() => 'Сброс вернёт автоматическое правило: суббота/воскресенье — выходные, будни — рабочие.')
</script>
