<template>
    <div>
        <!-- Top Navbar -->
        <Navbar />

        <div class="d-flex">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content -->
        <div class="row justify-content-center w-100 my-5">
            <div class="col-12 col-md-10 col-lg-6">
            <div class="card p-4">
                <h5 class="fw-bold mb-3">Edit Article</h5>

                <form @submit.prevent="handleUpdate">
                <!-- Title -->
                <div class="mb-3">
                    <label class="form-label">Article Title</label>
                    <input
                    type="text"
                    class="form-control"
                    placeholder="Enter article title"
                    v-model="form.title"
                    />
                </div>

                <!-- Category -->
                <div class="mb-3">
                    <label class="form-label">Category</label>
                    <select class="form-select" v-model="form.categoryId">
                    <option disabled value="">Choose category</option>
                    <option
                        v-for="category in categoryStore.categories"
                        :key="category.id"
                        :value="category.id"
                    >
                        {{ category.name }}
                    </option>
                    </select>
                </div>

                <!-- Thumbnail -->
                <div class="mb-3">
                    <label class="form-label">Thumbnail Image</label>
                    <input type="file" class="form-control" @change="handleFile" />
                    <div v-if="currentThumbnail" class="mt-2">
                    <p class="mb-1">Current Thumbnail:</p>
                    <img :src="currentThumbnail" alt="Current thumbnail" class="img-fluid" style="max-height:150px;" />
                    </div>
                </div>

                <!-- Content -->
                <div class="mb-3">
                    <label class="form-label">Content</label>
                    <textarea
                    class="form-control"
                    rows="5"
                    placeholder="Write your article content..."
                    v-model="form.content"
                    ></textarea>
                </div>

                <!-- Actions -->
                <div class="d-flex justify-content-end gap-2">
                    <button type="button" class="btn btn-outline-secondary" @click="router.back()">
                    Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                    Update Article
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
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/category'
import api from '@/api/http'

const route = useRoute()
const router = useRouter()
const categoryStore = useCategoryStore()
const articleId = route.params.id

const form = ref({
  title: '',
  content: '',
  categoryId: ''
})
const file = ref(null)
const currentThumbnail = ref('') 

// Fetch article data
const fetchArticle = async () => {
  try {
    const res = await api.get(`/articles/${articleId}`)
    const article = res.data.data

    form.value.title = article.title
    form.value.content = article.content
    form.value.categoryId = article.category.id // dak a nis show the old category 
    // form.value.categoryId = article.category_id // dont show category 

    // optional: show current thumbnail
    currentThumbnail.value = article.thumbnail.url
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await categoryStore.fetchCategory()
  await fetchArticle()
})

// Update article
const handleUpdate = async () => {
  try {
    await api.put(`/articles/${articleId}`, form.value);

    if (file.value) {
      const formData = new FormData();
      formData.append('thumbnail', file.value);
      await api.post(`/articles/${articleId}/thumbnail`, formData);
    }

    router.push('/article');

  } catch (err) {
    console.error(err);
  }
}


const handleFile = (event) => {
  file.value = event.target.files[0]
}
</script>
