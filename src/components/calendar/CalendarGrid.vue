<template>
  <div class="gridWrap">
    <div class="gridShell">
      <div class="leftCol">
        <div class="leftHeader">Время</div>
        <div ref="leftBody" class="leftBody">
          <div v-for="slot in allSlots" :key="slot" class="tcell">{{ slotToLabel(slot) }}</div>
        </div>
      </div>

      <div class="rightCol">
        <div ref="hScroll" class="hScroll" @wheel="forwardHorizontalWheel">
          <div class="rightHeader" :style="gridStyle">
            <button
              v-for="col in columns"
              :key="col.dateISO"
              class="hcell"
              :class="headerClass(col.dateISO)"
              @click="openDayModal(col.dateISO)"
            >
              {{ col.label }}
            </button>
          </div>
          <div ref="rightBody" class="rightBody" @scroll="syncScroll">
            <div v-for="slot in allSlots" :key="slot" class="gRow" :style="gridStyle">
              <button
                v-for="col in columns"
                :key="`${col.dateISO}-${slot}`"
                class="cell"
                :class="{ premium: isPremiumWholeDay(col.dateISO) || slotMultiplier(col.dateISO, slot) > 1, normal: !(isPremiumWholeDay(col.dateISO) || slotMultiplier(col.dateISO, slot) > 1) }"
                @click="openCellModal(col.dateISO, slot)"
              >
                <div class="cellPills" v-if="pillsFor(col.dateISO, slot).length">
                  <span
                    v-for="pill in pillsFor(col.dateISO, slot)"
                    :key="pill.id"
                    class="pill"
                    :class="{ half: pill.isHalf }"
                    :style="{ background: pill.color, color: pill.color === '#FFFFFF' ? '#111' : '' }"
                  >
                    <span class="pname">{{ pill.name }}</span>
                    <small v-if="pill.isHalf">0.25ч</small>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTimeTracker } from '../../composables/useTimeTracker'
import { toISODate } from '../../utils/date'

const { columns, allSlots, slotToLabel, getCellMeta, renderCellPills, openCellModal, openDayModal, isPremiumWholeDay, slotMultiplier, getOverride } = useTimeTracker()
const leftBody = ref(null)
const rightBody = ref(null)
const hScroll = ref(null)
const gridStyle = computed(() => ({ gridTemplateColumns: `repeat(${columns.value.length}, minmax(180px, 1fr))` }))

function pillsFor(dateISO, slot) {
  const meta = getCellMeta(dateISO, slot)
  return renderCellPills(meta.tasks, meta.isHalf)
}
function syncScroll() {
  if (leftBody.value && rightBody.value) leftBody.value.scrollTop = rightBody.value.scrollTop
}
function forwardHorizontalWheel(e) {
  if (!hScroll.value) return
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    hScroll.value.scrollLeft += e.deltaY
    e.preventDefault()
  }
}
function headerClass(dateISO) {
  const today = toISODate(new Date())
  return {
    today: dateISO === today,
    userOff: getOverride(dateISO) === true,
    userWork: getOverride(dateISO) === false,
  }
}
onMounted(() => syncScroll())
</script>
