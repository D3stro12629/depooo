<template>
    <div>
        <!-- Top Navbar -->
        <Navbar />

        <div class="d-flex">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content -->
        <div class="container py-5" v-if="article">
            <h3 class="fw-bold mb-3">
            {{ article.title }}
            </h3>

            <img
            :src="article.thumbnail"
            class="img-fluid rounded-4 shadow-sm mb-4"
            alt="thumbnail"
            style="object-fit: cover; width: 100%; height: 500px;"
            />

            <div class="d-flex align-items-center gap-3 mb-4">
            <img
                :src="article.creator.avatar"
                class="rounded-circle shadow-sm"
                width="40"
                height="40"
            />
            <div class="fw-semibold">
                {{ article.creator.firstName }} {{ article.creator.lastName }}  
                <!--  || 'Unknown Author' dak a ng mk for if author name ot men jenh 'unknown Author'  -->
            </div> 
            </div>

            <div class="article-content">
            {{ article.content }}
            </div>
        </div>

        <!-- Loading -->
        <!-- <div class="container py-5" v-else>
            <p class="text-muted">Loading article...</p>
        </div> -->
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/http'

const route = useRoute()
// get id from article 
let id = route.params.id;
// console.log(id );

let article = ref()

onMounted(async () => {
    let res = await api.get(`/articles/${id}`)  //'articles/' + id ( dak a nis kor bn del pov)
    article.value = res.data.data
})
</script>

<style scoped>

</style>
