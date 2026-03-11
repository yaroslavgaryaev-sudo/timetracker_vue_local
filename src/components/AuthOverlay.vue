<template>
  <div class="overlay" :class="{ open: !state.userId }">
    <div class="row" style="margin-bottom: 8px">
      <div class="controls">
        <input v-model="state.auth.email" class="input" placeholder="E-mail для входа (magic link)" style="min-width: 260px" @keydown.enter.prevent="sendMagicLink" />
        <button class="btn primary" :disabled="state.auth.sending" @click="sendMagicLink">Отправить ссылку</button>
      </div>
      <div class="controls">
        <span class="small muted">{{ state.auth.statusText }}</span>
      </div>
    </div>
    <div class="hint">После клика по ссылке вернёшься на сайт уже авторизованным. Если письмо не приходит — проверь “Spam/Промоакции”.</div>
  </div>
</template>

<script setup>
import { useTimeTracker } from '../composables/useTimeTracker'
const { state, sendMagicLink } = useTimeTracker()
</script>
