<template>
  <transition name="fade">
    <p v-if="!start && !loading">
      For the use we need
      <mark class="user"> your geolocation</mark>.<br /><a
        v-if="!start"
        @click="get"
        class="
          text-signal
          hover:text-black
          transition-all
          text-stroke-0
          cursor-pointer
          underline
        "
      >
        Okay
      </a>
    </p>
  </transition>
  <!--  -->

  <transition o name="fade">
    <p v-if="loading">
      Exploring
      <mark class="text-signal text-stroke-0">the solarsystem</mark>
      and <mark class="user">your neighbourhood</mark>…
    </p>
  </transition>

  <!--  -->
  <transition name="fade">
    <p v-if="start && !loading">
      If <mark class="user">you</mark> were the
      <mark class="text-signal text-stroke-0">sun</mark>,

      <span v-for="[name, ref] in Object.entries(referncesClean)" :key="name">
        <mark class="text-signal">{{ name + " " }}</mark>
        would be at
        <mark
          v-for="(tag, index) in Object.values(ref)"
          :key="tag"
          :class="'text-black-' + (500 - index * 200)"
          class="capitalize text-stroke-0"
          >{{ " " + tag + " " }}</mark
        >.
      </span>
    </p>
  </transition>
</template>

<script>
import Refernces from "../js/references";
/* import { data } from "../js/references"; */

export default {
  data() {
    return {
      start: false,
      loading: false,
      references: {},
    };
  },
  computed: {
    referncesClean() {
      let referencesClean = {};
      Object.entries(this.references).forEach((entry) => {
        let refs = { name: entry[1]["name"] };
        Object.entries(entry[1]).forEach((entry) => {
          if (entry[0] == "amenity" || entry[0] == "place") {
            refs[entry[0]] = entry[1];
          }
        });
        referencesClean[entry[0]] = refs;
      });

      console.log({ referencesClean });
      return referencesClean;
    },
  },
  methods: {
    async get() {
      this.start = true;
      this.refernce = new Refernces();
      this.loading = true;
      await this.refernce.build();
      this.loading = false;
      console.log("component: ", this.refernce.ref);
      this.references = this.refernce.ref;
    },
    print() {
      console.log(this.refernce);
    },
  },
};
</script>

<style>
mark {
  @apply bg-transparent;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  margin-top: -10%;
}
</style>
