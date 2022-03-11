<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="saveConfig()">保存</ion-button>
        </ion-buttons>

        <ion-title>设置</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list lines="full">
        <ion-list-header lines="full">
          <ion-label>数据源设置</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>USDA 密钥</ion-label>
          <ion-input v-model="config['apiConfig']['USDA']['apiKey']" placeholder="请求密钥"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>USDA 单次查询</ion-label>
          <ion-input v-model="config['apiConfig']['USDA']['totalFetch']" placeholder="10000" type="number"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>每页渲染数量</ion-label>
          <ion-input v-model="config['apiConfig']['paginationItem']" placeholder="20" type="number"></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonLabel,
  IonItem,
  IonList,
  IonInput,
  IonListHeader,
  IonButton,
  IonButtons,
  toastController
} from "@ionic/vue";
import {Storage} from "@ionic/storage";
import {reactive} from "vue";

import APIConfig from "@/ts/DefaultConfig/APIConfig";

const config = reactive({'apiConfig': APIConfig});
const store = new Storage();

(async () => {
  await store.create();
  config["apiConfig"] = await store.get("apiConfig");
})()

async function saveConfig() {
  await store.set("apiConfig", JSON.parse(JSON.stringify(config['apiConfig'])));
  const toast = await toastController.create({"message": "设置保存成功", "duration": 3000});
  await toast.present();
}
</script>

<style scoped>

</style>
