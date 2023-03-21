import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF, } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader} from 'three/examples/jsm/loaders/FontLoader';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
 
})
export class HomepageComponent implements OnInit {
  @ViewChild('canvass') private canvasRef!: ElementRef ;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
   
  }
  cube = null;
  constructor() { }

  ngOnInit(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    
    
    renderer.setSize(10*(window.innerWidth)/10, (8.8*(window.innerHeight)/10));
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xA3A3A3);
    const ambientLight = new THREE.AmbientLight(0xededed, 3);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 10);
   scene.add(directionalLight);
   directionalLight.position.set(10, 11, 7);
   

    
    this.cube = null;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/gg/scene.gltf', function(gltf){
      const model = gltf.scene;

      gltf.scene.scale.set(1.5, 1.5, 1.5);
      scene.add(model);
      const animate = function () {
        requestAnimationFrame(animate);
  
        model.rotation.y += 0.01;
  
        renderer.render(scene, camera);
      };
      camera.position.z = 5;
    renderer.render(scene, camera);
    animate();
    const fontf = new FontLoader();
    fontf.load('assets/font.json', function (font){
      var geometry = new TextGeometry( 'InterIorX', {
        font: font,
        size: 0.4,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.00010,
        bevelSize: 0.01,
        bevelSegments: 0.1
    } );
    var txt_mat = new THREE.MeshPhongMaterial({color:0x000000});
    var txt_mesh = new THREE.Mesh(geometry, txt_mat);
    txt_mesh.scale.set(1,1,0.1);
    txt_mesh.position.z = -1.7;
    txt_mesh.position.x = 2.6;
    txt_mesh.position.y = 0.5;

    txt_mesh.rotation.y = -Math.PI/2;
    
    model.add(txt_mesh);

    })
  
    fontf.load('assets/Bolgart Display_Regular.json', function (font){
      var geometry = new TextGeometry( 'Your Space, Your Design, ', {
        font: font,
        size: 0.2,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.00010,
        bevelSize: 0.01,
        bevelSegments: 0.1
    } );
    var txt_mat = new THREE.MeshPhongMaterial({color:0x00000});
    var txt_mesh = new THREE.Mesh(geometry, txt_mat);
    txt_mesh.scale.set(1,1,0.1);
    txt_mesh.position.z = -0.8;
    txt_mesh.position.x = 2.6;
    txt_mesh.position.y = -0.15;

    txt_mesh.rotation.y = -Math.PI/2;
    
    model.add(txt_mesh);

    })
    fontf.load('assets/Bolgart Display_Regular.json', function (font){
      var geometry = new TextGeometry( ' Your WAY ', {
        font: font,
        size: 0.3,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.00010,
        bevelSize: 0.01,
        bevelSegments: 0.1
    } );
    var txt_mat = new THREE.MeshPhongMaterial({color:0x19191A});
    var txt_mesh = new THREE.Mesh(geometry, txt_mat);
    txt_mesh.scale.set(1,1,0.1);
    txt_mesh.position.z = 0.4;
    txt_mesh.position.x = 2.6;
    txt_mesh.position.y = -0.8;

    txt_mesh.rotation.y = -Math.PI/2;
    
    model.add(txt_mesh);

    })
  
  });
    
 
  }

  
  }


