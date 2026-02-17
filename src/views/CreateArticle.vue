<template>
  <!-- {{}} -->
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
                  type="text" 
                  class="form-control" 
                  placeholder="Enter article title" 
                  v-model="form.title" 
                />
                <small v-if="errors.title" class="text-danger">{{ errors.title }}</small>
              </div>

              <!-- Category -->
              <div class="mb-3">
                <label class="form-label">Category</label>
                <select class="form-select" v-model="form.categoryId">
                  <option value="" disabled="">Choose category</option>
                  <option 
                    v-for="category in categoryStore.categories" 
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <small v-if="errors.categoryId" class="text-danger">{{ errors.categoryId }}</small>
              </div>

              <!-- Thumbnail -->
              <div class="mb-3">
                <label class="form-label">Thumbnail Image</label>
                <input 
                  type="file" 
                  @change="handleFile" 
                  class="form-control" 
                />
                <small v-if="errors.thumbnail" class="text-danger">{{ errors.thumbnail }}</small>
              </div>

              <!-- Content -->
              <div class="mb-3">
                <label class="form-label">Content</label>
                <textarea 
                  class="form-control" 
                  rows="5"
                  placeholder="Write your article content..." 
                  v-model="form.content">
                </textarea>
                <small v-if="errors.content" class="text-danger">{{ errors.content }}</small>
              </div>

              <!-- Actions -->
              <div class="d-flex justify-content-end gap-2">
                <button type="reset" class="btn btn-outline-secondary">Cancel</button>
                <button type="submit" class="btn btn-primary">Publish Article</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue';
import Navbar from '@/components/layout/Navbar.vue';
import { reactive, ref, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category';
import api from '@/api/http';
import router from '@/router';
import { notify } from '@/components/utils/toast'; 

let categoryStore = useCategoryStore();

let form = reactive({
  title: "",
  content: "",
  categoryId: "",
})

let file = ref(null)

let errors = reactive({
  title: "",
  content: "",
  categoryId: "",
  thumbnail: ""
})

onMounted(() => {
  categoryStore.fetchCategory();
})

const validateForm = () => {
  errors.title = ""
  errors.content = ""
  errors.categoryId = ""
  errors.thumbnail = ""

  let valid = true

  if (!form.title.trim()) {
    errors.title = "Title is required"
    notify.error(errors.title)
    valid = false
  }

  if (!form.categoryId) {
    errors.categoryId = "Category is required"
    notify.error(errors.categoryId)
    valid = false
  }
  
  if (!file.value) {
    errors.thumbnail = "Thumbnail is required"
    notify.error(errors.thumbnail)
    valid = false
  }
  
  if (!form.content.trim()) {
    errors.content = "Content is required"
    notify.error(errors.content)
    valid = false
  } else if (form.content.trim().length < 10) {
    errors.content = "Content must be at least 10 characters"
    notify.error(errors.content)
    valid = false
  }


  return valid
}

const handleCreate = async () => {
  if (!validateForm()) return 

  try {
    let res = await api.post('/articles', form)
    let articleID = res.data.data.id

    if (file.value) {
      let formData = new FormData()
      formData.append('thumbnail', file.value)
      await api.post(`/articles/${articleID}/thumbnail`, formData)
    }

    notify.success("Article created successfully!", { name: 'article' }, 2000)

  } catch (err) {
    console.error(err)
    notify.error("Failed to create article. Try again!")
  }
}

const handleFile = (event) => {
  let selectFile = event.target.files[0]
  if(selectFile){
    file.value = selectFile
  }
}
</script>
