<template>
  <transition
    enter-active-class="transition-all transition-fastest ease-out-quad"
    leave-active-class="transition-all transition-faster ease-in-quad"
    enter-class="opacity-0 scale-70"
    enter-to-class="opacity-100 scale-100"
    leave-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-70"
  >
    <p v-if="!start && !loading">
      For the use we need
      <mark class="user"> your location on earth</mark>.<br /><a
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

  <transition
    enter-active-class="transition-all transition-fastest ease-out-quad"
    leave-active-class="transition-all transition-faster ease-in-quad"
    enter-class="opacity-0 scale-70"
    enter-to-class="opacity-100 scale-100"
    leave-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-70"
  >
    <p v-if="loading">
      Exploring
      <mark class="text-signal">the solarsystem</mark>
      and <mark class="user">your neighbourhood</mark>
      <span class="load-container ml-2" style="animation-delay: 0s">.</span>
      <span class="load-container ml-2" style="animation-delay: 0.2s">.</span>
      <span class="load-container ml-2" style="animation-delay: 0.4s">.</span>

      Even at the speed of light, this can take over 10 seconds.
    </p>
  </transition>

  <!--  -->
  <transition
    enter-active-class="transition-all transition-fastest ease-out-quad"
    leave-active-class="transition-all transition-faster ease-in-quad"
    enter-class="opacity-0 scale-70"
    enter-to-class="opacity-100 scale-100"
    leave-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-70"
  >
    <p v-if="start && !loading">
      If <mark class="user">you</mark> were the
      <mark class="text-signal">sun</mark> with the diameter of
      <mark class="user">{{ diameter + " m" }}</mark
      >,

      <span v-for="[name, ref] in Object.entries(referncesClean)" :key="name">
        <mark class="text-signal">{{ name + " " }}</mark>
        would be at
        <mark
          v-for="(tag, index) in Object.values(ref)"
          :key="tag"
          :class="'text-black-' + (500 - index * 200)"
          class="capitalize"
          >{{ " " + tag.replace("_", " ") + " " }}</mark
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
    diameter() {
      if (this.refernce) {
        const num = (this.references.Mercury.dist / 60000) * 1392700;
        return Math.round((num + Number.EPSILON) * 100) / 100;
      }
      return 0;
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
  @apply bg-transparent text-stroke-0;
}
.load-container {
  animation: load 2.5s ease-in-out infinite;
  display: inline-block;
}

.load-container:nth-child(0) {
  animation-delay: 0s;
}
.load-container:nth-child(1) {
  animation-delay: 0.2s;
}
.load-container:nth-child(2) {
  animation-delay: 0.4s;
}

@keyframes load {
  0%,
  100% {
    transform: translateY(-20px);
  }
  50% {
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in;
}
.fade-enter-to .fade-leave {
  transform: translateY(100%);
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
