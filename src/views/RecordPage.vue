<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>记录</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">记录</ion-title>
        </ion-toolbar>
      </ion-header>

      <InProgress name="记录功能"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
import InProgress from '@/components/InProcessComponents.vue';</script>
