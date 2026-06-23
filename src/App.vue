<script setup>
import { ref, onMounted } from 'vue'

const entries = ref([])
const newEntry = ref('')

const loadEntries = () => {
  const saved = localStorage.getItem('journalEntries')
  if (saved) entries.value = JSON.parse(saved)
}

const saveEntries = () => {
  localStorage.setItem('journalEntries', JSON.stringify(entries.value))
}

const addEntry = () => {
  if (newEntry.value.trim()) {
    entries.value.push({
      id: Date.now(),
      content: newEntry.value.trim(),
      createdAt: new Date().toISOString()
    })
    newEntry.value = ''
    saveEntries()
  }
}

const removeEntry = (id) => {
  entries.value = entries.value.filter(entry => entry.id !== id)
  saveEntries()
}

onMounted(loadEntries)
</script>

<template>
  <div class="journal-container">
    <h1>Skytron Journal</h1>
    <div class="input-group">
      <textarea
        v-model="newEntry"
        placeholder="Write your thoughts..."
        rows="4"
      ></textarea>
      <button @click="addEntry" class="save-btn">Save Entry</button>
    </div>
    <div class="entries-list">
      <div v-for="entry in entries" :key="entry.id" class="entry">
        <p>{{ entry.content }}</p>
        <small>{{ new Date(entry.createdAt).toLocaleString() }}</small>
        <button @click="removeEntry(entry.id)" class="delete-btn">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.journal-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Courier New', monospace;
}

h1 {
  color: #4a90e2;
  text-align: center;
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 2rem;
}

textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  resize: vertical;
}

.save-btn, .delete-btn {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-btn:hover, .delete-btn:hover {
  background-color: #3a7bc8;
}

.entries-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.entry {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.entry p {
  margin: 0 0 0.5rem 0;
}

.entry small {
  color: #666;
  font-size: 0.8rem;
}

.delete-btn {
  background-color: #e74c3c;
  margin-top: 0.5rem;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
