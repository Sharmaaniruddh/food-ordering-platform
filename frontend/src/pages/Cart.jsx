import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import "./Cart.css"; // Custom CSS for full-screen background

function SpinningBox() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#22d3ee" />
    </mesh>
  );
}

function Background3D() {
  return (
    <Canvas className="canvas-bg">
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <SpinningBox />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <Background3D />

      <div className="relative z-10 space-y-4 bg-gray-900 bg-opacity-90 rounded-xl p-6 shadow-xl max-w-2xl mx-auto mt-10 border border-gray-700 text-white">
        <h2 className="text-2xl font-bold mb-4 text-white">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-300">Cart is empty. Add something from the Menu.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border border-gray-600 p-4 rounded-md bg-gray-800 shadow-md"
            >
              <div>
                <h3 className="font-semibold text-white">{item.name}</h3>
                <p className="text-gray-300">Qty: {item.qty}</p>
                <p className="text-gray-100 font-semibold">
                  Price: ₹{item.price * item.qty}
                </p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-400 font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="text-right font-bold text-lg mt-4 text-white">
            Total: ₹{total}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
