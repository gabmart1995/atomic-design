package main

import (
	"crypto/sha1"
	"encoding/hex"
	"reflect"
	"syscall/js"
)

/*
*	Hash module
 */

var jsDoc = js.Global().Get("document")
var jsConsole = js.Global().Get("console")

func createHash(this js.Value, args []js.Value) interface{} {

	// get the document DOM of Javascript
	value := jsDoc.Call("querySelector", args[0].String()).
		Get("value").
		String()

	if len(value) > 0 {

		// fmt.Println(value)

		sha1Hash := generateHash(value)

		// establecemos el valor en el result del dom
		jsDoc.
			Call("querySelector", args[1].String()).
			Set("innerHTML", sha1Hash)

	} else {
		// establecemos el valor en el result del dom
		jsDoc.
			Call("querySelector", args[1].String()).
			Set("innerHTML", "Ingresa un mensaje")
	}

	return js.Undefined()
}

/* retorna el hash como un string */
func getHash(this js.Value, args []js.Value) interface{} {

	// validamos si existen parametros
	if len(args) != 1 {
		jsConsole.Call("error", js.ValueOf("getHash: invalid no arguements passed"))
		return js.Undefined()
	}

	// validamos el tipo
	value := args[0].String()
	valueType := reflect.ValueOf(value).Kind().String()

	if valueType != "string" {
		jsConsole.Call("error", js.ValueOf("getHash: the value must be a string"))
		return js.Undefined()
	}

	return js.ValueOf(generateHash(value))
}

func generateHash(value string) string {

	hashInstance := sha1.New()
	hashInstance.Write([]byte(value))

	sha1Hash := hex.EncodeToString(hashInstance.Sum(nil))

	return sha1Hash
}

func registerCallbacks() {
	js.Global().Set("createHash", js.FuncOf(createHash))
	js.Global().Set("getHash", js.FuncOf(getHash))
}

func main() {

	channel := make(chan struct{}, 0)

	println("WASM Go Hash Module initialized")

	registerCallbacks()

	// ejecutamos el canal
	<-channel
}
