<template>
  <button type="button" @click="flag = !flag">Toggle</button>

  <!--  mode="in-out"  is the default-->
  <!-- <transition name="fade" mode="out-in">
    <h2 v-if="flag" key="main">Hello World</h2>
    <h2 v-else key="secondary">Another Hello World</h2>
  </transition> -->
  <!-- <transition name="fade">
    <h2 v-show="flag">Show Hello World</h2>
  </transition> -->

  <!-- with the type vue will use the duration set here, otherwise will choose the longer -->
  <!-- <transition name="zoom" type="animation" appear>
    <h2 v-if="flag">Hello</h2>
  </transition> -->

  <!-- 
    animation with JS
    there is also cancel events not defined here

    vue favors css animation over JS animations. In case we have javascript animations we should
    use the prop :css="false" to tel vue to skip the check of what types of animations we have

   -->
  <!-- <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="faterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    :css="true"
    name="fade"
  >
    <h2 v-if="flag">Hello</h2>
  </transition> -->

  <button @click="addItem">ADD</button>

  <ul>
    <transition-group name="fade">
      <li
        v-for="(number, index) in numbers"
        :key="number"
        @click="removeItem(index)"
      >
        {{ number }}
      </li>
    </transition-group>
  </ul>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      flag: false,
      numbers: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    addItem() {
      const num = Math.floor(Math.random() * 100 + 1);
      const index = Math.floor(Math.random() * this.numbers.length);
      this.numbers.splice(index, 0, num);
    },
    removeItem(index) {
      this.numbers.splice(index, 1);
    },
    beforeEnter(el) {
      console.log("beforeEnter", el);
    },
    enter(el) {
      // enter(el, done) {
      console.log("enter", el);

      // const animation = el.animate([{ transform: "scale3d(0,0,0)" }, {}], {
      //   duration: 1000,
      // });

      // animation.onfinish = () => {
      // done argument is a function that will define the function is dne
      // done();
      // };
    },
    faterEnter(el) {
      console.log("faterEnter", el);
    },
    beforeLeave(el) {
      console.log("beforeLeave", el);
    },
    leave(el) {
      // leave(el, done) {
      console.log("leave", el);

      // const animation = el.animate([{}, { transform: "scale3d(0,0,0)" }], {
      //   duration: 1000,
      // });

      // animation.onfinish = () => {
      // done argument is a function that will define the function is dne
      // done();
      // };
    },
    afterLeave(el) {
      console.log("afterLeave", el);
    },
  },
};
</script>

<style>
li {
  font-size: 22px;
  cursor: pointer;
}
h2 {
  width: 400px;
  padding: 20px;
  margin: 20px;
}
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s linear;
}

.fade-leave-active {
  transition: all 1s linear;
}
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active {
  animation: zoom-in 1s linear forwards;
  transition: all 2s linear;
}
.zoom-leave-active {
  animation: zoom-out 1s linear forwards;
  transition: all 2s linear;
}

.zoom-enter-from {
  opacity: 0;
}
.zoom-leave-to {
  opacity: 0;
}
@keyframes zoom-in {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(1, 1);
  }
}

@keyframes zoom-out {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0, 0);
  }
}
</style>