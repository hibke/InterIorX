import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { sample_items } from 'src/app/components/shared/models/data'; 
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import { Item } from 'src/app/components/shared/models/item';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-final-model',
  templateUrl: `final-model.component.html`

})

export class FinalModelComponent implements OnInit, AfterViewInit {
  
   item_table= sample_items[Number(localStorage.getItem('item_table'))];
   item= sample_items[Number(localStorage.getItem('item'))];
   item_cabinet= sample_items[Number(localStorage.getItem('item_cabinet'))];
   item_storage = sample_items[Number(localStorage.getItem('item_storage'))];
   item_accessory = sample_items[Number(localStorage.getItem('item_accessory'))];
  @ViewChild('canvas') private canvasRef!: ElementRef ;

 
  @Input() public fieldOfView: number = 1.5;
  @Input('nearClipping') public nearClippingPane: number = 0.1;
  @Input('farClipping') public farClippingPane: number = 1000;
  
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private ambientLight!: THREE.AmbientLight;
  private model!: any;

  private directionalLight!: THREE.DirectionalLight;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loaderGLTF = new GLTFLoader();
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  private animateModel(){
    if (this.model) {
      this.model.rotation.z += 0.005;
    }
    
  }

  private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.controls.addEventListener( 'change', ()=>{renderer.render(this.scene, this.camera)} );
    this.controls.update();
  };


  private createScene(){
    this.scene = new THREE.Scene();
    this.scene.background= new THREE.Color(0x000000);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8)
    this.loaderGLTF.load('assets/room_shell/scene.gltf', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      
      this.model.scale.set(0.01, 0.01, 0.01);
   
      this.scene.add(this.model);
     
    });
    this.loaderGLTF.load(this.item_table.path, (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      
   
      this.model.scale.set(this.item_table.scalex, this.item_table.scaley,this.item_table.scalez);
      this.model.position.x = this.item_table.positionx;
      this.model.position.y = this.item_table.positiony;
      
    
      this.scene.add(this.model);

     
    });

    this.loaderGLTF.load(this.item.path, (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      
      this.model.scale.set(this.item.scalex, this.item.scaley,this.item.scalez);
      this.model.position.x = this.item.positionx;
      this.model.position.y = this.item.positiony;
      this.model.rotation.z = this.item.rotationz;
    
      this.scene.add(this.model);

     
    });
    this.loaderGLTF.load(this.item_storage.path, (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      
      this.model.scale.set(this.item_storage.scalex, this.item_storage.scaley, this.item_storage.scalez);
      this.model.position.x = this.item_storage.positionx;
      this.model.position.y = this.item_storage.positiony;
      this.model.position.z = this.item_storage.positionz;
    
      
      
      this.scene.add(this.model);

     
    });
    this.loaderGLTF.load(this.item_cabinet.path, (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      
      this.model.scale.set(this.item_cabinet.scalex, this.item_cabinet.scaley, this.item_cabinet.scalez);
      this.model.position.x = this.item_cabinet.positionx;
      this.model.position.z = this.item_cabinet.positionz;
      this.model.position.y = this.item_cabinet.positiony;
      this.model.rotation.z = this.item_cabinet.rotationz;
      
      this.scene.add(this.model);

     
    });
    this.loaderGLTF.load(this.item_accessory.path, (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      
      this.model.scale.set(this.item_accessory.scalex, this.item_accessory.scaley, this.item_accessory.scalez);
      this.model.position.x = this.item_accessory.positionx;
      this.model.position.z = this.item_accessory.positionz;
      this.model.position.y = this.item_accessory.positiony;
      this.model.rotation.z = this.item_accessory.rotationz;
    
      this.scene.add(this.model);

     
    });

    
    

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    )
    this.camera.position.x = 40;
    this.camera.position.y = 100;
    this.camera.position.z = 150;
    this.ambientLight = new THREE.AmbientLight(0xededed, 0.001);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    this.directionalLight.position.set(10, 11, 7);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    
  }



  private getAspectRatio(){
    return this.canvas.clientWidth /this.canvas.clientHeight;
  }

  
  private startRenderingLoop(){
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, 470);
    let component: FinalModelComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      requestAnimationFrame(render);

    
    }());
  }

 
  constructor(activatedRoute:ActivatedRoute, itemService:ItemService) {
    activatedRoute.params.subscribe((params) => {
      if(params.id){
      const it = itemService.getItemById(params.id); 
        if( it.type == 'sofa'){
            this.item = itemService.getItemById(params.id);
            localStorage.setItem('item', String(params.id ));
        }
        else if( it.type == 'chair'){
          this.item = itemService.getItemById(params.id);
          localStorage.setItem('item', String(params.id ) );
      }
        else if( it.type == 'table'){
            this.item_table = itemService.getItemById(params.id);
            localStorage.setItem('item_table', String(params.id) );
        }
        else if( it.type == 'cabinet'){
          this.item_cabinet = itemService.getItemById(params.id);
          localStorage.setItem('item_cabinet', String(params.id ) );
      }
      else if( it.type == 'storage'){
        this.item_storage = itemService.getItemById(params.id);
        localStorage.setItem('item_storage', String(params.id ) );
    }
     else if( it.type == 'accessory'){
      this.item_accessory = itemService.getItemById(params.id);
      localStorage.setItem('item_accessory', String(params.id ) );
    }
      }
    })

   }

   ngOnInit(): void {

  }

  
  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }

  
  

}

