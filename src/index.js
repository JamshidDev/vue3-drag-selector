import DragSelector from "./components/DragSelector.vue";


const Vue3DragSelector = {
    install(app) {
        app.component('DragSelector', DragSelector)
    }
}


export { DragSelector };
export default Vue3DragSelector;
