<template>
  <!-- {{ articleStore.fetchArticles }} -->
  <div>
    <Navbar></Navbar>
    <div class="d-flex">
      <Sidebar></Sidebar>
      <div class="content container">
        <h3>Article Page</h3>
        <div class="d-flex justify-content-end my-4">
          <router-link class="btn bg-primary text-light w-25" :to="{name:'createArticle'}">
            Add Article
          </router-link>
        </div>
        <BaseTable
          :columns="columns"
          :rows="articleStore.fetchOwnArticles(1,2)"
          @delete="handleDelete"
          @edit="handleEdit"
          >
          <template #col-thumbnail="{ value }">
            <img :src="value" alt="" width="100px">
          </template>
          <template #col-category="{ value }">
            <p>{{ value.name }}</p>
          </template>
        </BaseTable>
        <Pagination 
        :totalPages="articleStore.pagination.totalPages" 
        :current="articleStore.pagination.currentPage"
        @update:page="handleNextPage">
      </Pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue';
import Navbar from '@/components/layout/Navbar.vue';
import Pagination from '@/components/ui/BasePagination.vue';
import { useArticleStore } from '@/stores/articles';
import { onMounted } from 'vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import api from '@/api/http';
import { useRouter } from 'vue-router';

let router = useRouter();
let articleStore = useArticleStore();

onMounted(async () => {
  //await articleStore.fetchOwnArticles(1, 2);
  console.log(1);
  
  console.log('test', await articleStore.fetchArticles({
    sortDir: sortDir.value,
  }));
  
})

let columns = [
  { label: "Id", key: "id" },
  { label: "Title", key: "title" },
  { label: "Content", key: "content" },
  { label: "Thumbnail", key: "thumbnail" },
  { label: "Category", key: "category" },
]

const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this article?")) return;

  await api.delete(`/articles/${id}`);

  await articleStore.fetchOwnArticles(
    articleStore.pagination.currentPage,
    2
  );
};

const handleEdit = (id) => {
  router.push(`/article/edit/${id}`);
}

const handleNextPage = async (page) => {
  await articleStore.fetchOwnArticles(page, 2);
}
</script>
