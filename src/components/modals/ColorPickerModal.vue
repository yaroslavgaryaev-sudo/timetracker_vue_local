<template>
  <div class="modalBack" :class="{ open: state.modals.color }" @click.self="closeColorModal">
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modalHead">
        <div class="modalTitle">Цвет проекта</div>
        <button class="btn ghost" title="Закрыть (Esc)" @click="closeColorModal">✕</button>
      </div>
      <div class="modalBody">
        <div class="small muted" style="margin-bottom: 8px">Выбери один из доступных цветов:</div>
        <div style="display: grid; grid-template-columns: repeat(6, 26px); gap: 8px">
          <button v-for="c in allowedColors" :key="c" type="button" class="colorSwatch" :style="{ width: '26px', height: '26px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.18)', background: c }" :title="c" @click="pickColor(c)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTimeTracker } from '../../composables/useTimeTracker'
const { state, allowedColors, pickColor, closeColorModal } = useTimeTracker()
</script>
