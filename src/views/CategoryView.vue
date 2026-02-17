<template>
  <div>
    <Navbar />

    <div class="d-flex">
      <Sidebar />

      <div class="row justify-content-center w-100 my-5">
        <div class="col-12 col-md-10 col-lg-6">
          <div class="card p-4">
            <h5 class="fw-bold mb-3">Create New Article</h5>

            <form @submit.prevent="handleCreate">

              <!-- Title -->
              <div class="mb-3">
                <label class="form-label">Article Title</label>
                <input
                  v-model="form.title"
                  type="text"
                  class="form-control"
                  placeholder="Enter article title"
                />
                <div v-if="err.title" class="text-danger small">
                  {{ err.title }}
                </div>
              </div>

              <!-- Category -->
              <div class="mb-3">
                <label class="form-label">Category</label>
                <select v-model="form.categoryId" class="form-select">
                  <option value="">Choose category</option>
                  <option
                    v-for="category in categoryStore.categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <div v-if="err.categoryId" class="text-danger small">
                  {{ err.categoryId }}
                </div>
              </div>

              <!-- Thumbnail -->
              <div class="mb-3">
                <label class="form-label">Thumbnail Image</label>
                <input
                  type="file"
                  class="form-control"
                  @change="handleFile"
                />
                <div v-if="err.thumbnail" class="text-danger small">
                  {{ err.thumbnail }}
                </div>
              </div>

              <!-- Content -->
              <div class="mb-3">
                <label class="form-label">Content</label>
                <textarea
                  v-model="form.content"
                  class="form-control"
                  rows="5"
                ></textarea>
                <div v-if="err.content" class="text-danger small">
                  {{ err.content }}
                </div>
              </div>

              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">
                  Publish Article
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import Navbar from '@/components/layout/Navbar.vue'
import { useCategoryStore } from '@/stores/category'
import { reactive, ref, onMounted } from 'vue'
import api from '@/api/http'
import router from '@/router'

const categoryStore = useCategoryStore()

// FORM (reactive, NOT ref)
const form = reactive({
  title: '',
  content: '',
  categoryId: ''
})

const file = ref(null)

// ERROR OBJECT (reactive like login)
const err = reactive({
  title: '',
  content: '',
  categoryId: '',
  thumbnail: ''
})

onMounted(() => {
  categoryStore.fetchCategory()
})

// VALIDATOR
function validator() {

  // reset
  err.title = ''
  err.content = ''
  err.categoryId = ''
  err.thumbnail = ''

  if (!form.title.trim()) {
    err.title = 'Title is required'
  }

  if (!form.categoryId) {
    err.categoryId = 'Category is required'
  }

  if (!form.content.trim()) {
    err.content = 'Content is required'
  }

  if (!file.value) {
    err.thumbnail = 'Thumbnail is required'
  }

  return !err.title && !err.content && !err.categoryId && !err.thumbnail
}

// SUBMIT
async function handleCreate() {

  if (!validator()) return

  try {
    let res = await api.post('/articles', form)
    let articleID = res.data.data.id

    if (file.value) {
      let formData = new FormData()
      formData.append('thumbnail', file.value)
      await api.post(`/articles/${articleID}/thumbnail`, formData)
    }

    router.push({ name: 'article' })

  } catch (error) {
    console.log(error)
  }
}

// FILE
function handleFile(event) {
  file.value = event.target.files[0]
}
</script>
