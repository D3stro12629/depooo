<template>
  <div>
    <Navbar></Navbar>
    <div class="d-flex">
      <Sidebar></Sidebar>
      <div class="content w-100">
        <h1>Category</h1>
        <div class="d-flex justify-content-end my-3">
          <button 
            class="btn btn-primary text-light"
            @click="showModal = true"
          >
            Add Article
          </button>
        </div>

        <BaseTable
          :columns="columns"
          :rows="categoryStore.categories"
          class="text-center"
        ></BaseTable>
        <BasePagination
          :totalPages="categoryStore.pagination.totalPages"
          :current="categoryStore.pagination.currentPage"
          @update:page="handleNextPage"
        >
        </BasePagination>
      </div>
      <basemodal2 v-if="showModal" :title="titleModal" @close="showModal=false">
      <div>
        <label for="">Category Name</label>
        <input type="text" class="form-control" v-model="name" >
      </div>
      <template #footer>
        <button class="btn btn-danger" @click="showModal=false">Cancel</button>
        <button class="btn btn-primary" @click="handleCreate">Create</button>
      </template>
      </basemodal2>

    </div>
  </div>
</template>
<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import BasePagination from "@/components/ui/BasePagination.vue";
import { useCategoryStore } from "@/stores/category";
import { onMounted, ref } from "vue";
import basemodal2 from "@/components/ui/basemodal2.vue";
import { defineEmits } from "vue";
import api from "@/api/http";

let per_page = ref(5);
let categoryStore = useCategoryStore();

let titleModal = ref("Create Category");

const showModal = ref(false);

let name = ref("")

onMounted(async () => {
  await categoryStore.fetchCategory(1, per_page.value);
});

let columns = [
  { label: "Id", key: "id" },
  { label: "Name", key: "name" },
];

const handleNextPage = async (page) => {
  await categoryStore.fetchCategory(page, per_page.value);
};

const handleCreate = async() => {
  console.log(name.value);
  try{
    let res = await api.post(`/categories`, {name: name.value});
    console.log(res);
  }catch(e){
    console.error(e);
  }finally{
    showModal.value = false;
  }
}
</script>
