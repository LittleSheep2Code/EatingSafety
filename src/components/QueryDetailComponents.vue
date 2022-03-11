<template>
  <ion-content :fullscreen="true">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="close()">关闭</ion-button>
        </ion-buttons>
        <ion-title>{{ food["description"] }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-list lines="full">
      <ion-list-header lines="full">
        <ion-label>营养成分</ion-label>
      </ion-list-header>
      <ion-item v-for="(item, index) in food['foodNutrients']" :key="index">
        <ion-label>{{ item["nutrientName"] }}</ion-label>
        <ion-note slot="end">{{ item["value"] }}{{ item["unitName"] }}</ion-note>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts" setup>
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonTitle,
  IonToolbar,
  modalController
} from "@ionic/vue";
import {defineProps} from "vue";

const props = defineProps({
  food: Object
})

async function close() {
  await modalController.dismiss();
}
</script>

<style scoped>

</style>
