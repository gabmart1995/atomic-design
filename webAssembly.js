document.addEventListener('DOMContentLoaded', () => {
    
    const loadWasm = async ( path, callback ) => {
        
        if ( !WebAssembly.instantiateStreaming ) {
            console.log('Tu navegador no soporta compilaciones en web assembly debes buscar un pollyfill');
            return;
        }
        
        // se crea la instancia de GO que controla la comunicacion con el binario
        const go = new Go();
        
        try {
            const result = await WebAssembly.instantiateStreaming( 
                await fetch( path ), 
                go.importObject 
            );
            
            callback({ 
                instance: result.instance, 
                module: result.module, 
                go 
            });
            
        } catch ( error ) {
            console.error( error );
        }
    
    };

    loadWasm('/wasm/greetings-module/greetings.wasm', ( wasm ) => {
        if ( wasm ) {
            const { go, module } = wasm;
            let { instance } = wasm;

            const run = async () => {
                go.run( instance );
                instance = await WebAssembly.instantiate( module, go.importObject ); // reset instance
            };

            const button = document.querySelector('#runButton');
            button.disabled = false;
            button.addEventListener('click', run );
        }
    });

    loadWasm('/wasm/calculator-module/calculator.wasm', ( wasm ) => {
        if ( wasm ) {
            const { go, instance } = wasm;
            go.run( instance );
        }
    });

    loadWasm('/wasm/hash-module/hash-module.wasm', ( wasm ) => {
        if ( wasm ) {
            const { go, instance } = wasm;
            go.run( instance );
        }
    });
});







