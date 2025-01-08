import { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

// const reducer = (state, action) => {
//   switch (action.type) {
//     // Define reducer cases here
//     case "ADD":
//     return [...state,{
//         id:action.id,
//         name:action.name,
//         qty:action.qty,
//         size:action.size,
//         finalPrice: action.finalPrice,
//         img:action.img

//     }];
//     case "REMOVE":
//   let newArry = [...state]
//     newArry.splice(action.index,1)
//     return newArry;

//     case "UPDATE":
//       let arr=[...state]
//       arr.find((food,index)=>{
//         if(food.id===action.id){
//           console.log(food.qty,parseInt(action.qty),action.price+food.price)
//           arr[index]={...food,qty:parseInt(action.qty)+food.qty,price:action.price+food.price}
//         }
//       })

//     default:
//     console.log("Error in Reducer");
//     return state;
//   }
// };
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          finalPrice: action.finalPrice,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newArry = [...state];
      newArry.splice(action.index, 1);
      return newArry;

    case "UPDATE":
      return state.map((food) => {
        if (food.id === action.id && food.size === action.size) {
          return {
            ...food,
            qty: food.qty=action.qty, // Update quantity
            finalPrice: food.finalPrice= action.finalPrice, // Update price
          };
        }
        return food;
             
      });

        case "DROP":
          // Clear all items in the cart
          let EmptyArry=[]
          return EmptyArry;
    
   
      
      


    default:
      console.log("Error in Reducer");
      return state;
  }
};


export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export const useCart = () => {
  return  useContext(CartStateContext);
 

};

export const useDispatchCart = () => {
   return useContext(CartDispatchContext);
 
};

export default CartProvider;