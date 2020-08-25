<template>
  <div>
    <div id="canvas">
      <div class="vWindow" id="vWindow">
        <div class="systemBar" id="systemBar">
          <slot name="systemBarContent">VueWindowTitle</slot>

          <!-- <span id="closeBtn">
        X
          </span>-->
        </div>
        <div id="vWindow-content">
          <slot name="content">
            Content will be inserted here. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Fugiat magni accusamus qui, aut
            aliquid numquam reprehenderit cupiditate, soluta placeat, dolores
            asperiores id at sunt suscipit! Culpa, mollitia nesciunt. Eius,
            magnam.
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trespassParent: { type: Boolean, default: true },
    systemBarColor: { type: String, default: "rgb(230, 230, 230)" },
    backgroundColor: { type: String, default: "white" },
    width: { type: String, default: "290px" },
    height: { type: String, default: "" },
    maxHeight: { type: String, default: "" },
  },
  data() {
    return {
      isDown: false,
      offset: [0, 0],
    };
  },
  methods: {
    mousedownfunction(e) {
      const vWindow = document.getElementById("vWindow");
      this.isDown = true;
      this.offset = [
        vWindow.offsetLeft - e.clientX,
        vWindow.offsetTop - e.clientY,
      ];
    },
    mouseupfunction() {
      this.isDown = false;
    },
    mousemovefunction(e) {
      const vWindow = document.getElementById("vWindow");

      if (this.isDown) {
        vWindow.style.left = e.clientX + this.offset[0] + "px";
        vWindow.style.top = e.clientY + this.offset[1] + "px";
      }
      this.preventTrespassingParent();
    },
    preventTrespassingParent() {
      const vWindow = document.getElementById("vWindow");
      const systemBar = document.getElementById("systemBar");
      var parent = "";
      if (this.trespassParent) {
        parent = document.getElementsByTagName("html")[0];
      } else {
        parent = vWindow.parentElement;
      }

      var top = vWindow.style.top;
      top = parseInt(top.replace("px", ""));
      var left = vWindow.style.left;
      left = parseInt(left.replace("px", ""));

      var right = vWindow.offsetWidth + left;

      var bottom = systemBar.offsetHeight + top;

      if (top <= parent.offsetTop && top != "") {
        vWindow.style.top = parent.offsetTop + "px";
      }

      if (left <= parent.offsetLeft && left != "") {
        vWindow.style.left = parent.offsetLeft + "px";
      }

      if (right >= parent.offsetWidth + parent.offsetLeft) {
        vWindow.style.left =
          parent.offsetWidth + parent.offsetLeft - vWindow.offsetWidth + "px";
      }

      if (bottom >= parent.offsetHeight + parent.offsetTop) {
        vWindow.style.top =
          parent.offsetHeight +
          parent.offsetTop -
          systemBar.offsetHeight +
          "px";
      }
    },
    makevWindowDraggable() {
      const systemBar = document.getElementById("systemBar");
      const canvas = document.getElementsByTagName("body")[0];

      systemBar.addEventListener("mousedown", this.mousedownfunction);

      canvas.addEventListener("mouseup", this.mouseupfunction);

      canvas.addEventListener("mousemove", this.mousemovefunction);
    },
  },
  mounted() {
    this.makevWindowDraggable();
    document.getElementById(
      "systemBar"
    ).style.backgroundColor = this.systemBarColor;
    const vWindow = document.getElementById("vWindow");
    vWindow.style.backgroundColor = this.backgroundColor;
    vWindow.style.width = this.width;
    if (this.height !== "") {
      vWindow.style.height = this.height;
    }
    if (this.maxHeight !== "") {
      vWindow.style.maxHeight = this.maxHeight;
    }
  },
  destroyed() {
    const systemBar = document.getElementById("systemBar");
    const canvas = document.getElementsByTagName("body")[0];

    systemBar.removeEventListener("mousedown", this.mousedownfunction);

    canvas.removeEventListener("mouseup", this.mouseupfunction);

    canvas.removeEventListener("mousemove", this.mousemovefunction);
  },
  watch: {
    isDown() {
      const vWindow = document.getElementById("vWindow");
      if (this.isDown) {
        vWindow.style.userSelect = "none";
      } else {
        vWindow.style.userSelect = "auto";
      }
    },
  },
};
</script>

<style>
* {
  margin: 0%;
  padding: 0%;
}
.vWindow {
  position: absolute;
  box-shadow: 2px 2px 10px rgb(105, 105, 105);
  border-radius: 5px;
  text-align: left;
}

.systemBar {
  position: relative;
  border-radius: 5px 5px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  padding-left: 8px;
  padding-right: 8px;
  user-select: none;
  cursor: move;
}

/* #closeBtn {
  cursor: pointer;
  height: 0.9em;
  width: 0.9em;
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#closeBtn:hover {
  background: rgb(201, 201, 201);
} */

#vWindow-content {
  margin: 0.5em;
}

#canvas {
  height: 500px;
  width: 500px;
  border: 1px solid black;
  margin: 100px;
}
</style>
