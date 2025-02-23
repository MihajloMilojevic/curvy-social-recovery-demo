import "./wasm_exec.js"

// https://vite.dev/guide/features.html#webassembly
import wasmUrl from './main.wasm?url'

const rejectedPromise = () => new Promise((_, reject) => {
    reject(new Error("WASM not loaded!"));
})

export const WASM_STATUS = {
    ERROR: -1,
    NOT_LOADED: 0,
    READY: 1
}

export const defaultWasmModule = {
    fn: {
        split: (t, n, sk, vk) => {return rejectedPromise()},
        recover: (t, shares) => {return rejectedPromise()} ,
        genRandomKeys: () => {return rejectedPromise()}
    },
    status: WASM_STATUS.NOT_LOADED
}

export const loadWasm = async (wasm, setWasm) => {
    const go = new Go()
    
    fetch(wasmUrl).then(resp =>
        WebAssembly.instantiateStreaming(resp, go.importObject) 
    ).then(result => {
        go.run(result.instance);
        setWasm({
            fn: {
                split: window.goSplit,
                recover: window.goRecover,
                genRandomKeys: window.goGenRandomKeys
            },
            status: WASM_STATUS.READY
        })
    }).catch(err => {
        setWasm({
            ...wasm,
            status: WASM_STATUS.ERROR
        })
        console.error("error loading WASM: " + err)
    });
};
