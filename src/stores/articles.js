import { defineStore } from "pinia";
import api from "@/api/http";
import { reactive, ref } from "vue";

export const useArticleStore = defineStore("article", () => {
    const articles = ref([]);
    const ownArticles = ref([]);

    const pagination = reactive({
        currentPage: 1,
        itemPerPage: 10,
        totalItems: 0,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false,
    });

    async function fetchArticles({
        search = "",
        sortBy = "createdAt",
        sortDir = "desc", // asc | desc
    } = {}) {
        try {
        const res = await api.get("/articles", {
            params: {
            search,
            sortBy,
            sortDir,
            },
        });

        articles.value = res.data.data.items;
        } catch (error) {
        console.error("Fetch articles error:", error);
        }
    }

    async function fetchOwnArticles(page, per_page) {
        try {
        const res = await api.get(
            `/articles/own?_page=${page}&_per_page=${per_page}`
        );
        console.log(res);
        ownArticles.value = res.data.data.items;
        pagination.totalItems = res.data.data.meta.totalItems;
        pagination.totalPages = res.data.data.meta.totalPages;
        pagination.currentPage = res.data.data.meta.currentPage;
        } catch (error) {
        console.error(error);
        }
    }

    return {
        articles,
        ownArticles,
        pagination,
        fetchArticles,
        fetchOwnArticles,
    };
});
