<template>
  <div class="modalBack" :class="{ open: state.modals.group }" @click.self="closeGroupModal">
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modalHead">
        <div class="modalTitle">Группа проекта</div>
        <button class="btn ghost" title="Закрыть (Esc)" @click="closeGroupModal">✕</button>
      </div>
      <div class="modalBody">
        <div class="small muted">Изменение группы проекта</div>
        <div style="height: 10px"></div>
        <label class="small muted">Выбери из существующих или введи новую:</label>
        <input v-model="state.groupModal.value" class="input" placeholder="Группа (например: Клиент А)" style="width: 100%; margin-top: 8px" list="groupsDatalist2" />
        <datalist id="groupsDatalist2">
          <option v-for="g in groups" :key="g" :value="g" />
        </datalist>
        <div class="hint">Если введёшь новую группу — она появится в списке автоматически.</div>
      </div>
      <div class="modalFoot">
        <button class="btn primary" @click="saveGroupModal">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTimeTracker } from '../../composables/useTimeTracker'
const { state, groups, saveGroupModal, closeGroupModal } = useTimeTracker()
</script>
