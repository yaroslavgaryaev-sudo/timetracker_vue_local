<template>
  <div class="panel active">
    <div class="row">
      <div class="controls">
        <input v-model="state.projectForm.group" class="input" placeholder="Группа" style="min-width: 180px" list="groupsDatalist" />
        <input v-model="state.projectForm.name" class="input" placeholder="Проект" style="min-width: 240px" @keydown.enter.prevent="addProject" />
        <input v-model="state.projectForm.budget" class="input mono" type="number" min="0" step="0.01" placeholder="Бюджет" style="min-width: 140px" @keydown.enter.prevent="addProject" />
        <datalist id="groupsDatalist">
          <option v-for="g in groups" :key="g" :value="g" />
        </datalist>
        <button class="btn primary" @click="addProject">Добавить</button>
      </div>
      <div class="controls">
        <button class="btn">Пересчитать</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 7%">Оплачен</th>
          <th style="width: 8%">Группа</th>
          <th style="width: 28%">Проект</th>
          <th class="nowrap" style="width: 10%">Часы 1 / 1,5</th>
          <th class="nowrap" style="width: 10%">Бюджет</th>
          <th class="nowrap" style="width: 10%">Ставка</th>
          <th style="width: 20%">Комментарий</th>
          <th style="width: 4%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!visibleProjects.length">
          <td colspan="8" class="muted">{{ state.showArchived ? 'Проектов нет.' : 'Нет неархивных проектов. Нажми “Показать архивные”.' }}</td>
        </tr>
        <ProjectRow v-for="project in visibleProjects" :key="project.id" :project="project" />
      </tbody>
    </table>

    <div class="footerRow">
      <button class="btn" @click="toggleArchive">{{ state.showArchived ? 'Скрыть архивные' : 'Показать архивные' }}</button>
    </div>

    <div class="hint">Проекты сортируются по времени добавления (новые сверху). Архивные по умолчанию скрыты.</div>
  </div>
</template>

<script setup>
import { useTimeTracker } from '../../composables/useTimeTracker'
import ProjectRow from './ProjectRow.vue'
const { state, groups, visibleProjects, addProject, toggleArchive } = useTimeTracker()
</script>
