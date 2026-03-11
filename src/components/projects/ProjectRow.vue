<template>
  <tr>
    <td>
      <input class="ck" type="checkbox" :checked="project.paid" @change="toggleProjectPaid(project, $event.target.checked)" />
    </td>
    <td>
      <span class="tag" style="cursor: pointer" title="Клик: изменить группу" @click="openGroupModal(project.id)">{{ (project.group || '').trim() || '—' }}</span>
    </td>
    <td class="nameCol">
      <div style="display: flex; align-items: flex-start; gap: 8px">
        <span class="dot" :style="dotStyle" style="margin-top: 4px; cursor: pointer" title="Клик: изменить цвет" @click.stop="openColorModal(project.id)" />
        <input class="input" type="text" style="width: 100%" :value="nameDraft" @input="nameDraft = $event.target.value" @keydown.enter.prevent="$event.target.blur()" @change="commitName" />
      </div>
    </td>
    <td class="mono">{{ hours.real.toFixed(2) }} / {{ hours.weighted.toFixed(2) }}</td>
    <td>
      <input class="input mono" type="number" min="0" step="0.01" style="width: 120px" :value="budgetDraft" @change="commitBudget($event.target.value)" />
    </td>
    <td class="mono">{{ rateText }}</td>
    <td>
      <textarea class="textarea" placeholder="Комментарий..." :value="project.comment || ''" @input="updateProjectComment(project, $event.target.value)" />
    </td>
    <td>
      <button class="btn danger icon" title="Удалить проект" @click="deleteProject(project)">✕</button>
    </td>
  </tr>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useTimeTracker } from '../../composables/useTimeTracker'
const props = defineProps({ project: { type: Object, required: true } })
const { hoursByProject, stableColorFromString, openGroupModal, openColorModal, updateProjectName, updateProjectBudget, updateProjectComment, toggleProjectPaid, deleteProject } = useTimeTracker()
const nameDraft = ref(props.project.name)
const budgetDraft = ref(Number(props.project.budget).toFixed(2))
watch(() => props.project.name, (v) => { nameDraft.value = v })
watch(() => props.project.budget, (v) => { budgetDraft.value = Number(v).toFixed(2) })
const hours = computed(() => hoursByProject.value.get(props.project.id) || { real: 0, weighted: 0 })
const rateText = computed(() => hours.value.weighted > 0 ? (props.project.budget / hours.value.weighted).toFixed(2) : '—')
const dotStyle = computed(() => ({ background: props.project.color || stableColorFromString(props.project.id) }))
async function commitName() {
  const ok = await updateProjectName(props.project, nameDraft.value)
  if (!ok) nameDraft.value = props.project.name
}
async function commitBudget(value) {
  const ok = await updateProjectBudget(props.project, value)
  if (!ok) budgetDraft.value = Number(props.project.budget).toFixed(2)
}
</script>
