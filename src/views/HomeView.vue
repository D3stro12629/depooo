<template>
  <Navbar />

  <div class="d-flex">
    <Sidebar />

    <div class="container content">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold">Article List</h3>

        <select class="form-select w-auto" v-model="sortDir">
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <input
          type="text"
          class="form-control w-25"
          placeholder="Search Articles"
          v-model="search"
        />
      </div>

      <div class="row g-4">
        <BaseCard :articles="articleStore.articles" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import { useArticleStore } from "@/stores/articles";

const articleStore = useArticleStore();

const search = ref("");
const sortDir = ref("desc"); 

watch([search, sortDir], ([searchValue, sortValue]) => {
  articleStore.fetchArticles({
    search: searchValue,
    sortDir: sortValue,
  });
});

onMounted(async () => {
  await articleStore.fetchArticles({
    sortDir: sortDir.value,
  });
});
</script>
