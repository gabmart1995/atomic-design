package main

import (
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"syscall/js"
)

/*
*	Hash module
 */

func generateHash(this js.Value, args []js.Value) interface{} {

	value := js.Global().
		Get("document").
		Call("querySelector", args[0].String()).
		Get("value").
		String()

	if len(value) > 0 {

		fmt.Println(value)

		hashInstance := sha1.New()
		hashInstance.Write([]byte(value))
		sha1Hash := hex.EncodeToString(hashInstance.Sum(nil))

		// fmt.Println(value, sha1Hash)

		// establecemos el valor en el result del dom
		js.Global().
			Get("document").
			Call("querySelector", args[1].String()).
			Set("innerHTML", sha1Hash)

	} else {
		// establecemos el valor en el result del dom
		js.Global().
			Get("document").
			Call("querySelector", args[1].String()).
			Set("innerHTML", "Ingresa un mensaje")
	}

	return js.Undefined()
}

func registerCallbacks() {
	js.Global().Set("generateHash", js.FuncOf(generateHash))
}

func main() {

	channel := make(chan struct{}, 0)

	println("WASM Go Hash Module initialized")

	registerCallbacks()

	// ejecutamos el canal
	<-channel
}
