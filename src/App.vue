<template>
  <ion-app>
    <tabs-container>
      <ion-router-outlet/>
    </tabs-container>
  </ion-app>
</template>

<script lang="ts" setup>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {Storage} from "@ionic/storage";

import TabsContainer from "@/views/TabsContainer.vue";

import APIConfig from "@/ts/DefaultConfig/APIConfig";


(async () => {
  const store = new Storage();
  await store.create();
  if (await store.get("apiConfig") == null) {
    console.log("Create APIConfig default configure");
    await store.set("apiConfig", APIConfig);
  }
})();
</script>
