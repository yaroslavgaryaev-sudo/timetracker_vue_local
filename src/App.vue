<template>
  <header>
    <h1>Time Tracker</h1>
    <div class="sub">
      x1.5: (1) выходной целиком, (2) будни до 10:00 и с 19:00. <br />
      Клик по дате в заголовке: сделать день рабочим/выходным.
    </div>
  </header>

  <div class="wrap">
    <div class="card">
      <div class="tabs">
        <div class="tabsLeft">
          <button class="tabbtn" :class="{ active: state.activeTab === 'calendar' }" @click="state.activeTab = 'calendar'">Календарь</button>
          <button class="tabbtn" :class="{ active: state.activeTab === 'projects' }" @click="state.activeTab = 'projects'">Проекты</button>
        </div>
        <div class="authBar">
          <span class="badge">{{ authStatus }}</span>
          <button v-if="state.userId" class="btn" @click="logout">Выйти</button>
        </div>
      </div>

      <AuthOverlay />
      <CalendarPanel v-show="state.activeTab === 'calendar'" />
      <ProjectsPanel v-show="state.activeTab === 'projects'" />
    </div>
  </div>

  <CellModal />
  <DayModal />
  <GroupModal />
  <ColorPickerModal />
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useTimeTracker } from './composables/useTimeTracker'
import AuthOverlay from './components/AuthOverlay.vue'
import CalendarPanel from './components/calendar/CalendarPanel.vue'
import ProjectsPanel from './components/projects/ProjectsPanel.vue'
import CellModal from './components/modals/CellModal.vue'
import DayModal from './components/modals/DayModal.vue'
import GroupModal from './components/modals/GroupModal.vue'
import ColorPickerModal from './components/modals/ColorPickerModal.vue'

const { state, init, authStatus, logout, handleEscape } = useTimeTracker()

onMounted(async () => {
  await init()
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

function onKey(e) {
  if (e.key === 'Escape') handleEscape()
}
</script>
