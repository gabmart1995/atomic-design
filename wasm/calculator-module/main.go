package main

import (
	"fmt"
	"strconv"
	"syscall/js"
)

/* funcion de suma en JS */
func add(this js.Value, args []js.Value) interface{} {

	// obtenemos los argumentos de la funcion
	param1 := args[0].String()
	param2 := args[1].String()
	param3 := args[2].String()

	// obtenemos el valor del input de entrada del formulario desde el frontend
	value1 := js.Global().Get("document").Call("querySelector", param1).Get("value").String()
	value2 := js.Global().Get("document").Call("querySelector", param2).Get("value").String()

	int1, _ := strconv.ParseFloat(value1, 32)
	int2, _ := strconv.ParseFloat(value2, 32)

	// verificamos los valores de entrada
	// fmt.Println( this )
	// fmt.Println( args )
	// fmt.Println( value1 )
	// fmt.Println( value2 )

	result := fmt.Sprintf("%.2f", int1+int2)

	// establecemos el valor en el result del dom
	js.Global().Get("document").Call("querySelector", param3).Set("innerHTML", result)

	// retornamos undefined a la interface
	return js.Undefined()
}

func substract(this js.Value, args []js.Value) interface{} {

	// obtenemos los argumentos de la funcion
	param1 := args[0].String()
	param2 := args[1].String()
	param3 := args[2].String()

	// obtenemos el valor del input de entrada del formulario desde el frontend
	value1 := js.Global().Get("document").Call("querySelector", param1).Get("value").String()
	value2 := js.Global().Get("document").Call("querySelector", param2).Get("value").String()

	int1, _ := strconv.ParseFloat(value1, 32)
	int2, _ := strconv.ParseFloat(value2, 32)

	// verificamos los valores de entrada
	// fmt.Println( this )
	// fmt.Println( args )
	// fmt.Println( value1 )
	// fmt.Println( value2 )

	result := fmt.Sprintf("%.2f", int1-int2)

	// establecemos el valor en el result del dom
	js.Global().Get("document").Call("querySelector", param3).Set("innerHTML", result)

	// retornamos undefined a la interface
	return js.Undefined()
}

func multiply(this js.Value, args []js.Value) interface{} {

	// obtenemos los argumentos de la funcion
	param1 := args[0].String()
	param2 := args[1].String()
	param3 := args[2].String()

	// obtenemos el valor del input de entrada del formulario desde el frontend
	value1 := js.Global().Get("document").Call("querySelector", param1).Get("value").String()
	value2 := js.Global().Get("document").Call("querySelector", param2).Get("value").String()

	int1, _ := strconv.ParseFloat(value1, 32)
	int2, _ := strconv.ParseFloat(value2, 32)

	// verificamos los valores de entrada
	// fmt.Println( this )
	// fmt.Println( args )
	// fmt.Println( value1 )
	// fmt.Println( value2 )

	result := fmt.Sprintf("%.2f", int1*int2)

	// establecemos el valor en el result del dom
	js.Global().Get("document").Call("querySelector", param3).Set("innerHTML", result)

	// retornamos undefined a la interface
	return js.Undefined()
}

func divide(this js.Value, args []js.Value) interface{} {

	// obtenemos los argumentos de la funcion
	param1 := args[0].String()
	param2 := args[1].String()
	param3 := args[2].String()

	// obtenemos el valor del input de entrada del formulario desde el frontend
	value1 := js.Global().Get("document").Call("querySelector", param1).Get("value").String()
	value2 := js.Global().Get("document").Call("querySelector", param2).Get("value").String()

	int1, _ := strconv.ParseFloat(value1, 32)
	int2, _ := strconv.ParseFloat(value2, 32)

	// verificamos los valores de entrada
	// fmt.Println( this )
	// fmt.Println( args )
	// fmt.Println( value1 )
	// fmt.Println( value2 )

	if int2 == 0 {
		js.Global().Get("document").Call("querySelector", param3).Set("innerHTML", "No se puede dividir entre 0")
	} else {
		result := fmt.Sprintf("%.2f", int1/int2)

		// establecemos el valor en el result del dom
		js.Global().Get("document").Call("querySelector", param3).Set("innerHTML", result)
	}

	// retornamos undefined a la interface
	return js.Undefined()
}

/** registra las funciones en el objeto global de Javascript */
func registerCallbacks() {
	js.Global().Set("add", js.FuncOf(add))
	js.Global().Set("substract", js.FuncOf(substract))
	js.Global().Set("multiply", js.FuncOf(multiply))
	js.Global().Set("divide", js.FuncOf(divide))
}

func main() {

	// creamos un canal de una sola via
	channel := make(chan struct{}, 0)

	fmt.Println("WASM Go calculator module initialized")

	registerCallbacks()

	// ejecutamos el canal
	<-channel
}
