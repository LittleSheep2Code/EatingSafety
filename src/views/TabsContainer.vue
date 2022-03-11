<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button href="/introduce" tab="introduce">
          <ion-icon :icon="informationCircleOutline"/>
          <ion-label>介绍</ion-label>
        </ion-tab-button>

        <ion-tab-button href="/query" tab="query">
          <ion-icon :icon="searchCircleOutline"/>
          <ion-label>查询</ion-label>
        </ion-tab-button>

        <ion-tab-button href="/record" tab="record">
          <ion-icon :icon="newspaperOutline"/>
          <ion-label>记录</ion-label>
        </ion-tab-button>

        <ion-tab-button href="/settings" tab="settings">
          <ion-icon :icon="settingsOutline"/>
          <ion-label>设置</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/vue';
import {
  informationCircleOutline,
  newspaperOutline,
  searchCircleOutline,
  settingsOutline
} from 'ionicons/icons';</script>
