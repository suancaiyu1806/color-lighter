export default defineBackground(() => {
  // TODO: 全局模式对新tab应用。需调研，是否需要在这里控制
  console.log("Hello background!", { id: browser.runtime.id });
});
