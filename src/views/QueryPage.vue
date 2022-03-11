<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>查询</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar v-model="searchContent.data" animated autocorrect="on" placeholder="搜索英文的食品名称"
                       spellcheck @ionClear="clearData()" @keyup.enter="doQuery()"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list v-if="searchResponse.data.foods.length !== 0">
        <ion-item v-for="(item, index) in searchResponse.renderData" :key="index" lines="full">
          <ion-label>{{ item["brandName"] }} {{ item["description"] }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer v-if="searchResponse.data.foods.length !== 0">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="flipPage(false)">上一页</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="flipPage(true)">下一页</ion-button>
        </ion-buttons>

        <ion-title>{{ searchResponse.current }}/{{ searchResponse.pages }} 页，共 {{ searchResponse.total }} 个记录
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts" setup>
import axios from "axios";
import {reactive} from "vue";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  loadingController
} from '@ionic/vue';

import {Storage} from "@ionic/storage";
import APIConfig from "@/ts/DefaultConfig/APIConfig";

const config = reactive({'apiConfig': APIConfig});

(async () => {
  const store = new Storage();
  await store.create();
  config["apiConfig"] = await store.get("apiConfig");
})()

const searchContent = reactive({
  data: "",
  before: ""
})
const searchResponse = reactive({
  data: {
    totalHits: 0,
    foods: []
  },

  renderData: [],

  // Pagination
  total: 0,
  current: 0,
  pages: 0
})

function clearData() {
  searchResponse.data = {
    totalHits: 0,
    foods: []
  };

  searchResponse.renderData = [];

  searchResponse.total = 0;
  searchResponse.current = 0;
  searchResponse.pages = 0;

}

async function doQuery() {
  const loading = await loadingController.create({message: "查询数据中"});
  await loading.present();

  if (config.apiConfig.USDA.totalFetch <= 0) {
    config.apiConfig.USDA.totalFetch = 50;
  }

  // Query data
  searchResponse.data = (await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchContent.data}&pageSize=${config.apiConfig.USDA.totalFetch}&api_key=${config.apiConfig.USDA.apiKey}`)).data;

  // Parse data
  searchResponse.total = searchResponse.data["totalHits"];
  searchResponse.pages = Math.ceil(searchResponse.data["foods"].length / config.apiConfig.paginationItem);
  searchResponse.current = 1;

  // Set render data
  if (searchResponse.pages === 1) {
    searchResponse.renderData = searchResponse.data["foods"];
  } else {
    searchResponse.renderData = searchResponse.data["foods"].slice(0, config.apiConfig.paginationItem);
  }

  await loading.dismiss();

  // Set to the old data
  searchContent.before = searchContent.data;
}

async function flipPage(action: boolean) {
  // Next page
  if (action) {
    // Out of range
    if (searchResponse.current + 1 > searchResponse.pages) {
      return;
    }

    searchResponse.current++;
    const renderStart = (searchResponse.current - 1) * config.apiConfig.paginationItem;
    searchResponse.renderData = searchResponse.data["foods"].slice(renderStart, renderStart + config.apiConfig.paginationItem);
  }

  // Up page
  else {
    // Out of range
    if (searchResponse.current - 1 <= 0) {
      return;
    }

    searchResponse.current--;
    const renderStart = (searchResponse.current - 1) * config.apiConfig.paginationItem;
    searchResponse.renderData = searchResponse.data["foods"].slice(renderStart, renderStart + config.apiConfig.paginationItem);
  }
}
</script>
