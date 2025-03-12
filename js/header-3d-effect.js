document.addEventListener('DOMContentLoaded', function() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded. Please include the Three.js library.');
        return;
    }

    // Create a scene
    const scene = new THREE.Scene();
    
    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Add the renderer to the hero section
    const heroSection = document.querySelector('.hero-bg');
    if (heroSection) {
        heroSection.appendChild(renderer.domElement);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.zIndex = '-1';
    } else {
        console.error('Hero section not found');
        return;
    }
    
    // Create a group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x5a8dee,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particlesMesh);
    
    // Create floating 3D objects
    
    // Gavel
    const gavelGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.8, 32);
    const gavelMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    const gavel = new THREE.Mesh(gavelGeometry, gavelMaterial);
    gavel.position.set(-3, 1, -2);
    gavel.rotation.set(Math.PI / 4, 0, Math.PI / 6);
    group.add(gavel);
    
    // Scales of Justice
    const scaleBaseGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.1);
    const scaleMaterial = new THREE.MeshBasicMaterial({ color: 0xd4af37 });
    const scaleBase = new THREE.Mesh(scaleBaseGeometry, scaleMaterial);
    scaleBase.position.set(2, 0, -1);
    
    const scalePoleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 32);
    const scalePole = new THREE.Mesh(scalePoleGeometry, scaleMaterial);
    scalePole.position.set(0, 0.3, 0);
    scaleBase.add(scalePole);
    
    const scaleDishGeometry1 = new THREE.CircleGeometry(0.2, 32);
    const scaleDish1 = new THREE.Mesh(scaleDishGeometry1, scaleMaterial);
    scaleDish1.position.set(-0.4, 0.5, 0);
    scaleDish1.rotation.set(-Math.PI / 2, 0, 0);
    scaleBase.add(scaleDish1);
    
    const scaleDishGeometry2 = new THREE.CircleGeometry(0.2, 32);
    const scaleDish2 = new THREE.Mesh(scaleDishGeometry2, scaleMaterial);
    scaleDish2.position.set(0.4, 0.5, 0);
    scaleDish2.rotation.set(-Math.PI / 2, 0, 0);
    scaleBase.add(scaleDish2);
    
    group.add(scaleBase);
    
    // Law Book
    const bookGeometry = new THREE.BoxGeometry(0.7, 0.1, 0.5);
    const bookMaterial = new THREE.MeshBasicMaterial({ color: 0x8b0000 });
    const book = new THREE.Mesh(bookGeometry, bookMaterial);
    book.position.set(0, -1.5, -1);
    book.rotation.set(0, Math.PI / 6, 0);
    group.add(book);
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Floating effect for 3D objects
        const time = Date.now() * 0.001;
        gavel.position.y = 1 + Math.sin(time) * 0.2;
        scaleBase.position.y = Math.sin(time + 1) * 0.2;
        book.position.y = -1.5 + Math.sin(time + 2) * 0.1;
        
        // Render the scene
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Mouse movement effect
    document.addEventListener('mousemove', function(event) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        group.rotation.y = mouseX * 0.1;
        group.rotation.x = mouseY * 0.1;
    });
}); 