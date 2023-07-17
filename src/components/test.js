import React, { useReducer } from 'react'

const reducer = (state, action) => {
    switch(action.type){
        case:"다주거"

    }
}

const test = () => {

    const [state, dispatch] = useReducer(reducer, 0)
  return (
    <div>
        <button onClick={
            dispatch({type:"다주거",payload:""})
        }>버튼</button>
    </div>
  )
}

export default test