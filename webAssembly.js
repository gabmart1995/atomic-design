document.addEventListener('DOMContentLoaded', () => {
    
    const button = document.querySelector('#runButton');

    /**
     * Funcion que lee y carga en memoria el archivo .wasm
     * @param {string} path - path al archivo .wasm 
     * @param {*} callback - llamada de retorno a JavaScript 
     * @returns 
     */
    const loadWasm = async ( path, callback ) => {
        
        if ( !WebAssembly.instantiateStreaming ) {
            console.log('Tu navegador no soporta compilaciones en web assembly debes buscar un pollyfill');
            return;
        }
        
        let instance = null; 
        let module = null;

        // se crea la instancia de GO que controla la comunicacion con el binario
        const go = new Go();
        
        const run = async () => {
            await go.run( instance );
            instance = await WebAssembly.instantiate( module, go.importObject ); // reset instance
        };
    
        try {
            const result = await WebAssembly.instantiateStreaming( 
                await fetch( path ), 
                go.importObject 
            );
    
            instance = result.instance;
            module = result.module;
            
            callback({ run });
            
        } catch ( error ) {
            console.error( error );
        }
    
    };

    const loadWasmCalculator = async ( path ) => {
        
        if ( !WebAssembly.instantiateStreaming ) {
            console.log('Tu navegador no soporta compilaciones en web assembly debes buscar un pollyfill');
            return;
        }
        
        let instance = null; 
        let module = null;

        // se crea la instancia de GO que controla la comunicacion con el binario
        const go = new Go();
        
        try {
            const result = await WebAssembly.instantiateStreaming( 
                await fetch( path ), 
                go.importObject 
            );
    
            instance = result.instance;
            module = result.module;
            
            // registramos las funciones de la calculadora
            go.run( instance );
            
        } catch ( error ) {
            console.error( error );
        }
    
    };

    loadWasm('/wasm/greetings/greetings.wasm', ( instance ) => {
        if ( instance ) {
            // activamos el boton
            // añadimos el evento

            button.disabled = false;
            button.addEventListener('click', instance.run );
        }
    });

    loadWasmCalculator('/wasm/calculator-module/calculator.wasm');
});







