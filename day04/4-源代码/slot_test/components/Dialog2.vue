<template>
  <div>
    <slot name="header">
      <h1>提示</h1>
    </slot>
    <div>
      <slot>如果没有传递，则默认显示这些内容</slot>
    </div>
    <slot name="footer">
      <button>提交</button>
    </slot>
  </div>
</template>
