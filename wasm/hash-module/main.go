package main

import "syscall/js"

/*
*	Calculator module
 */

func add(i []js.Value) {

	// parseamos el valor a un entero
	value1 := i[0].Int()
	value2 := i[1].Int()

	// generamos la salida
	js.Global().Set("output", value1+value2)

	println((value1 + value2).String())
}

func substact() {
}

func registerCallbacks() {
	js.Global().Set("add", js.NewCallback(add))
	js.Global().Set("substract", js.NewCallback(substact))
}

func main() {

	channel := make(chan struct{}, 0)

	println("WASM Go initialized")

	registerCallbacks()

	// ejecutamos el canal
	<-channel
}
