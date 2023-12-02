import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
interface IProps{
  backgroundColor?: string;
  stopRotate?:boolean;
  size?: number;

}
function Torus(props: IProps){
  function getRandomInt( min: number, max: number ){
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }
  const random = getRandomInt( 0, 2 );
  const random2 = getRandomInt( 0, 2 );
  const random3 = getRandomInt( 0, 2 );
  const containerRef = useRef<HTMLDivElement>( null );
  const [ containerSize, setContainerSize ] = useState<{ width: number, height: number }>( { width: null, height: null } );
  const [ torus, setTorus ] = useState();
  useEffect( () => {
    const handleResize = () => {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      setContainerSize( { width: containerWidth, height: containerHeight } );
    };
    window.addEventListener( 'resize', handleResize );
    return () => {
      window.removeEventListener( 'resize', handleResize );
    };
  }, [] );
  useEffect( () => {
    const element = containerRef.current;
    // console.clear();
    let scene = new THREE.Scene();
    scene.background = new THREE.Color( props.backgroundColor??'#fff' );
    let camera = new THREE.PerspectiveCamera( props.size??getRandomInt(20,30), ((containerSize.width ?? element.clientWidth) / (containerSize.height ?? element.clientHeight)) );
    camera.position.set( props.stopRotate ? 0 : 0, props.stopRotate ? 4 : 4, props.stopRotate ? 20 : 20 );
    camera.lookAt( scene.position );
    let renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( containerSize.width ?? element.clientWidth, (containerSize.width ?? element.clientWidth) * ((containerSize.height ?? element.clientHeight) / (containerSize.width ?? element.clientWidth)) );
    renderer.setAnimationLoop( animationLoop );
    element.replaceChildren( renderer.domElement );
// window.addEventListener( "resize", (event) => {
//     camera.aspect = innerWidth/innerHeight;
//     camera.updateProjectionMatrix( );
//     renderer.setSize( innerWidth, innerHeight );
// });
    let controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    // controls.autoRotate = true;
    let ambientLight = new THREE.AmbientLight('red', 500);
    scene.add(ambientLight);
    let light = new THREE.DirectionalLight('black', 100);
    light.position.set(10, 13, 1);
    scene.add(light);
    // next comment
    function surface(u, v, target) {
      const n = 10,  // larger values make sharper square
        t = 1.5; // larger values make more twists
      u *= 2 * Math.PI;
      v *= 2 * Math.PI;
      let r = (Math.cos( v ) ** n + Math.sin( v ) ** n) ** (-1 / n),
        x =  (4 + r * Math.cos( v + t * u )) * Math.cos( u ),
        y = (4 + r * Math.cos( v + t * u )) * Math.sin( u ),
        z = r * Math.sin( v + t * u );
      target.set( x, y, z );
    }
    const geometry = new ParametricGeometry( surface, 100, 100 );
    let object = new THREE.Mesh(
      geometry,
      new THREE.MeshNormalMaterial(),
    );
    scene.add( object );
    function animationLoop( t ){
      light.position.set( getRandomInt(2,70), getRandomInt(2,70), getRandomInt(2,70) );
      const T: number[] = [ 2700, 3000, 2100 ];
      object.rotation.z = t / T[random];
      object.rotation.y = props.stopRotate?0:(t / T[random2]);
      object.rotation.x = props.stopRotate?0:(t / T[random3]);
      controls.update();
      light.position.copy( camera.position );
      renderer.render( scene, camera );
    }
  }, [ containerSize, containerRef ] );
  return (
    <div ref = { containerRef } style = { { width: "100%", height: "100%", display: "grid", justifyItems: "center", overflow: "hidden" } } >
      <Canvas
        camera = { {
          position: [ 0, 0, 25 ],
          fov: 30,
        } }
      >
        <scene></scene>
      </Canvas>
    </div>
  );
}
export default Torus;
