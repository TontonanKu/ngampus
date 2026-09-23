// Lecturers Database
        const lecturers = {
            'AR': { name: 'Ardiman Firmanda, S.S.T., M.Tr.Kom.', contact: 'ardiman@polibatam.ac.id', photo: 'https://if.polibatam.ac.id/storage/dosen/S7KZIwdkbjGWcaetMgFzHKLvYFH57xmQsiAIWyz0.jpg' },
            'SW': { name: 'Suwarno, S.S., M.Pd.', contact: 'suwarno@polibatam.ac.id', photo: 'https://if.polibatam.ac.id/storage/dosen/5fnfol76ZAp0aupmiel3hn7fMGb7Nvroj4eLQjqk.jpg' },
            'AD': { name: 'Agung Riyadi, S.Si., M.Kom.', contact: 'agung@polibatam.ac.id', photo: 'https://if.polibatam.ac.id/storage/dosen/Fznb2SNyJJw9K0mDudldIcKDixicBT1PBjXxesWc.jpg' },
            'M':  { name: "Amirul Mu'minin, S.Ds., M.Ds.", contact: 'amirul@polibatam.ac.id', photo: 'https://if.polibatam.ac.id/storage/dosen/vZXoxK8G0IeZ6KRADUdwhmQoVeUOSCLlfXUzagCI.jpg' },
            'MH': { name: "Miftahul Husna Ghawa, S.Tr.Kom.", contact: 'miftahul@polibatam.ac.id', photo: '' },
            'BR': { name: 'Berliansyah Rumodhon, S.Pd., M.Sn.', contact: 'berliansyah@polibatam.ac.id', photo: 'https://if.polibatam.ac.id/storage/dosen/q4pidjdGlNZhi8h6SiJxVrhjIyl1Cb2uJh44C7OE.jpg' },
            'NH': { name: 'Nursaima Harahap, M.Hum.', contact: 'nursaima@polibatam.ac.id', photo: 'https://if.polibatam.ac.id/storage/dosen/JgQG412BAUOhjCmRtjjGcbQSDPeNSHnUluy3BRtk.jpg' },
            'SY': { name: 'Syaprilla Donata, A.Md.Kom.', contact: 'syaprilla@polibatam.ac.id', photo: '' }
        };

        // Schedule Data
        const schedules = {
            senin: {
                theme: 'theme-senin', model: './models/controller.glb', icon: '🎮',
                classes: [
                    { time: '18:00 - 21:20', course: 'TP301-Proyek Gim', room: 'GU 601', lec: 'AR', type: 'Offline' },
                    { time: '21:20 - 23:00', course: 'TP305-Fisika', room: 'Online', lec: 'AD', type: 'Online' }
                ]
            },
            selasa: {
                theme: 'theme-selasa', model: './models/laptop.glb', icon: '💻',
                classes: [
                    { time: '18:00 - 19:40', course: 'TP303-Manajemen Proyek', room: 'Online', lec: 'SW', type: 'Online' },
                    { time: '21:20 - 22:10', course: 'TP304-Pemrograman Berorientasi Objek', room: 'Online', lec: 'SY', type: 'Online' },
                    { time: '22:10 - 23:00', course: 'TP302-Aset Gim 2D', room: 'Online', lec: 'M', type: 'Online' }
                ]
            },
            rabu: {
                theme: 'theme-rabu', model: './models/handphone.glb', icon: '📱',
                classes: [
                    { time: '18:00 - 20:30', course: 'PBL TP Semester 3', room: 'GU 604', lec: 'AR', type: 'Offline' },
                    { time: '20:30 - 23:00', course: 'TP302-Aset Gim 2D (Praktikum)', room: 'GU 601', lec: 'MH', type: 'Offline' }
                ]
            },
            kamis: {
                theme: 'theme-kamis', model: './models/keyboard.glb', icon: '⌨️',
                classes: [
                    { time: '18:00 - 20:30', course: 'TP304-Pemrograman Berorientasi Objek (Praktikum)', room: 'GU 601', lec: 'SY', type: 'Offline' },
                    { time: '22:10 - 23:00', course: 'TP306-Desain Suara Gim', room: 'Online', lec: 'BR', type: 'Online' }
                ]
            },
            jumat: {
                theme: 'theme-jumat', model: './models/mouse.glb', icon: '🖱️',
                classes: [
                    { time: '18:00 - 19:40', course: 'PK003TP-Bahasa Inggris Umum', room: 'Online', lec: 'NH', type: 'Online' },
                    { time: '20:30 - 23:00', course: 'TP306-Desain Suara Gim (Praktikum)', room: 'TF 4.2', lec: 'BR', type: 'Offline' }
                ]
            }
        };

        const modelViewer = document.querySelector('#product-model');
        const berriesFG = document.querySelector('.berries-container');
        const berriesBG = document.querySelector('.berries-container-bg');
        const leavesBG = document.querySelector('.leaves-container');
        const allBerries = document.querySelectorAll('.berry');
        const cards = document.querySelectorAll('.card');
        const dayTitle = document.getElementById('day-title');
        const scheduleList = document.getElementById('schedule-list');
        const awardIcon = document.getElementById('award-icon');
        const detailCard = document.getElementById('detail-card');
        
        let isSwitching = false;
        let isDetailOpen = false;
        let currentDayKey = 'senin';

        function generateScheduleHTML(classes) {
            return classes.map((c, i) => `
                <div class="schedule-item" onclick="openDetail(${i})">
                    <div class="schedule-time">${c.time}</div>
                    <div class="schedule-course">${c.course}</div>
                    <div class="schedule-detail">
                        <span>${c.type === 'Online' ? '🌐' : '📍'} ${c.room}</span>
                        <span>👨‍🏫 ${c.lec}</span>
                    </div>
                </div>
            `).join('');
        }

        // --- Auto Select Current Day on Load ---
        document.addEventListener('DOMContentLoaded', () => {
            // Mobile Layout DOM Adjustment
            if (window.innerWidth <= 1024) {
                const hLeft = document.querySelector('.hero-left');
                const dTitle = document.getElementById('day-title');
                const hCenter = document.querySelector('.hero-center');
                const hRight = document.querySelector('.hero-right');
                const schedList = document.getElementById('schedule-list');
                
                if (hLeft) {
                    // 1. Move 3D model right below day title
                    if (dTitle && hCenter) {
                        hLeft.insertBefore(hCenter, dTitle.nextSibling);
                    }
                    // 2. Move carousel right below schedule list
                    if (schedList && hRight) {
                        hLeft.insertBefore(hRight, schedList.nextSibling);
                    }
                }
            }

            const dayMap = { 1: 'senin', 2: 'selasa', 3: 'rabu', 4: 'kamis', 5: 'jumat' };
            currentDayKey = dayMap[new Date().getDay()] || 'senin'; 
            
            const activeCard = document.querySelector(`.card[data-day="${currentDayKey}"]`);
            if (activeCard) {
                cards.forEach(c => c.classList.remove('active'));
                activeCard.classList.add('active');
                
                const data = schedules[currentDayKey];
                document.body.className = data.theme;
                dayTitle.innerText = activeCard.querySelector('.card-info').innerText;
                scheduleList.innerHTML = generateScheduleHTML(data.classes);
                awardIcon.innerText = data.icon;
                modelViewer.src = data.model;
            }
        });

        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (isSwitching || card.classList.contains('active')) return;
                
                // If detail is open, close it first
                if (isDetailOpen) {
                    closeDetail(() => performDaySwitch(card));
                } else {
                    performDaySwitch(card);
                }
            });
        });

        function performDaySwitch(card) {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            currentDayKey = card.dataset.day;
            switchDay(currentDayKey, card.querySelector('.card-info').innerText);
        }

        function switchDay(dayKey, dayName) {
            isSwitching = true;
            const body = document.body;
            const data = schedules[dayKey];
            
            body.className = data.theme;

            gsap.to([dayTitle, scheduleList, awardIcon], {
                opacity: 0,
                x: -20,
                duration: 0.3,
                onComplete: () => {
                    dayTitle.innerText = dayName;
                    scheduleList.innerHTML = generateScheduleHTML(data.classes);
                    awardIcon.innerText = data.icon;
                    gsap.to([dayTitle, scheduleList, awardIcon], { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 });
                }
            });

            gsap.to(modelViewer, {
                rotationY: "+=360",
                filter: "blur(10px)",
                duration: 0.6,
                ease: "power2.in",
                onComplete: () => {
                    modelViewer.src = data.model;
                    gsap.to(modelViewer, {
                        rotationY: "+=360",
                        filter: "blur(0px)",
                        duration: 1.5,
                        ease: "back.out(0.7)",
                        onComplete: () => isSwitching = false
                    });
                }
            });

            allBerries.forEach((berry) => {
                const nextBaseX = (Math.random() - 0.5) * 200;
                const nextBaseY = (Math.random() - 0.5) * 200;
                gsap.to(berry, {
                    x: nextBaseX,
                    y: nextBaseY,
                    duration: 1.5,
                    ease: "power2.out",
                    onComplete: () => {
                        berry.dataset.baseX = nextBaseX;
                        berry.dataset.baseY = nextBaseY;
                    }
                });
            });
        }

        // --- Interactive Detail View ---
        window.openDetail = function(classIndex) {
            if (isSwitching) return;
            isDetailOpen = true;
            
            const classData = schedules[currentDayKey].classes[classIndex];
            const lecturerInfo = lecturers[classData.lec] || { name: classData.lec, contact: 'Tidak ada informasi' };
            
            // Populate Data
            document.getElementById('detail-course').innerText = classData.course;
            document.getElementById('detail-time').innerText = classData.time;
            document.getElementById('detail-type').innerText = classData.type === 'Online' ? 'Online' : 'Offline (' + classData.room + ')';
            document.getElementById('detail-lecturer').innerText = lecturerInfo.name;
            document.getElementById('detail-contact').innerHTML = '<a href="mailto:' + lecturerInfo.contact + '" class="email-link">' + lecturerInfo.contact + '</a>';

            // Animate Elements
            // 1. Hide left menu and right carousel
            gsap.to('.hero-left', { x: -100, opacity: 0, duration: 0.5, pointerEvents: 'none', ease: "power2.inOut" });
            gsap.to('.hero-right', { x: 100, opacity: 0, duration: 0.5, pointerEvents: 'none', ease: "power2.inOut" });
            
            // 2. Shift 3D Model to the left using 'left' property so it doesn't conflict with CSS transform animations
            gsap.to('.hero-center', { left: '-25%', duration: 0.8, ease: "power3.out" });
            
            // 3. Show Detail Card
            detailCard.style.pointerEvents = 'auto';
            gsap.to(detailCard, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.2, ease: "back.out(1)" });
        };

        window.closeDetail = function(callback) {
            isDetailOpen = false;
            
            // Hide Detail Card
            detailCard.style.pointerEvents = 'none';
            gsap.to(detailCard, { opacity: 0, y: 30, scale: 0.95, duration: 0.4, ease: "power2.in" });
            
            // Restore Elements
            gsap.to('.hero-center', { left: '0%', duration: 0.8, delay: 0.1, ease: "power3.out" });
            gsap.to('.hero-left', { x: 0, opacity: 1, duration: 0.5, delay: 0.2, pointerEvents: 'auto', ease: "power2.out" });
            gsap.to('.hero-right', { x: 0, opacity: 1, duration: 0.5, delay: 0.2, pointerEvents: 'auto', ease: "power2.out", onComplete: () => {
                if(callback) callback();
            } });
        };

        // --- Contact Modal ---
        const contactModal = document.getElementById('contact-modal');
        const contactListContainer = document.getElementById('contact-list-container');
        let isContactListPopulated = false;

        window.openContactModal = function() {
            if (!isContactListPopulated) {
                const uniqueLecturersMap = new Map();
                Object.values(lecturers).forEach(lec => uniqueLecturersMap.set(lec.name, lec));
                const uniqueLecturers = Array.from(uniqueLecturersMap.values());
                
                contactListContainer.innerHTML = '<div class="contact-grid">' + uniqueLecturers.map(lec => {
                    const initials = lec.name.split(' ').slice(0,2).map(n => n[0]).join('').replace(/[^a-zA-Z]/g, '').toUpperCase();
                    const photoHtml = lec.photo ? `<img src="${lec.photo}" class="contact-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : '';
                    
                    return `
                    <div class="contact-card-mini">
                        ${photoHtml}
                        <div class="contact-avatar" style="${lec.photo ? 'display:none;' : ''}">${initials}</div>
                        <div class="contact-info">
                            <span class="contact-name">${lec.name}</span>
                            <a href="mailto:${lec.contact}" class="email-link contact-email">✉️ ${lec.contact}</a>
                        </div>
                    </div>
                `}).join('') + '</div>';
                isContactListPopulated = true;
            }
            contactModal.classList.add('active');
        };

        window.closeContactModal = function() {
            contactModal.classList.remove('active');
        };

        // --- Task Modal & Admin Panel ---
        const taskModal = document.getElementById('task-modal');
        const taskList = document.getElementById('task-list');
        const adminModal = document.getElementById('admin-modal');
        
        let tasks = JSON.parse(localStorage.getItem('polibatam_tasks')) || [];
        
        // Inject default TP304 assignments if they haven't been added yet
        // Inject default TP304 assignments if they haven't been added yet
        const defaultTasks = [
            { 
                id: 'pbo_teori_1', 
                course: 'TP304 - PBO',
                type: 'Teori',
                title: 'Algoritma Level Up',
                text: "Slide 18: Buat algoritma (kalimat deskriptif & flowchart) untuk karakter game naik level apabila EXP >= 100.", 
                done: false, 
                image: "",
                openedAt: "2026-09-08T00:00:00",
                dueAt: "2026-09-16T23:59:59"
            },
            { 
                id: 'pbo_prak_1', 
                course: 'TP304 - PBO',
                type: 'Praktikum',
                title: 'Latihan Mandiri 1-5',
                text: "Kerjakan 5 Soal Latihan Mandiri: Ganjil/Genap, Kelulusan, Level Up, Segitiga Bintang, Item Terbatas. Buat kalimat deskriptif & flowchart.", 
                done: false, 
                image: "",
                openedAt: "2026-09-10T18:00:00",
                dueAt: "2026-09-16T23:59:59"
            },
            {
                id: 'bing_prak_2',
                course: 'PK003TP - Bahasa Inggris Umum',
                type: 'Praktikum',
                title: "Students' Activities (Meeting II)",
                text: "Select a piece of writing (10–20 pages) relevant to PBL project 2. Read using extensive reading technique. Write a report and send learning materials. Prepare for Q&A session.",
                done: false,
                image: "",
                openedAt: "2026-09-23T12:00:00",
                dueAt: "2026-09-30T23:59:59"
            },
            {
                id: 'aset2d_prak_2',
                course: 'TP302 - Aset Gim 2D',
                type: 'Praktikum',
                title: 'Tugas Praktikum 2',
                text: "Rancang satu aset gim 2D orisinal (karakter atau ikon UI) dengan menerapkan kelima prinsip desain. Sertakan lembar justifikasi desain singkat yang menjelaskan pilihan komposisi, warna, bentuk, garis, dan tipografi.",
                done: false,
                image: "",
                openedAt: "2026-09-21T00:00:00",
                dueAt: "2026-09-28T23:59:59"
            },
            {
                id: 'audio_tugas_1',
                course: 'TP306 - Desain Suara Gim',
                type: 'Tugas',
                title: 'Mencari Video Animasi',
                text: "Mencari video animasi durasi 15 detik dan jangan lupa membawa alat yang dibutuhkan untuk video animasi tersebut.",
                done: false,
                image: "",
                openedAt: "2026-09-21T00:00:00",
                dueAt: "2026-09-28T23:59:59",
        {
            id: 'pbo_teori_2',
            course: 'TP304 - PBO',
            type: 'Teori',
            title: 'Tugas Teori: Class, Property, Method',
            text: "Bayangkan Anda sedang mengembangkan game sederhana. Di dalam game terdapat Player, Enemy, Weapon, dan Item. Tentukan mana yang dapat dijadikan class, property yang dimiliki, dan method yang dapat dilakukan. (minimal 3 class).<br><br>Contoh:<br>Player<br>+- Properties: name, health, score, speed<br>+- Methods: Move(), Jump(), Attack()",
            done: false,
            image: "",
            openedAt: "2026-09-22T00:00:00",
            dueAt: "2026-09-29T00:00:00"
        }
        ];
        
        let tasksUpdated = false;
        // If the user already has the old text-only version, we'll replace it
        tasks = tasks.map(t => {
            const dt = defaultTasks.find(d => d.id === t.id);
            if (dt && !t.openedAt) {
                tasksUpdated = true;
                return { ...dt, done: t.done }; // keep completion status but upgrade format
            }
            return t;
        });

        defaultTasks.forEach(dt => {
            if (!tasks.some(t => t.id === dt.id)) {
                tasks.push(dt);
                tasksUpdated = true;
            }
        });
        if (tasksUpdated) {
            localStorage.setItem('polibatam_tasks', JSON.stringify(tasks));
        }

        function saveTasks() {
            localStorage.setItem('polibatam_tasks', JSON.stringify(tasks));
            renderTasks();
        }

        function renderTasks() {
            // Auto delete past due tasks
            const now = new Date();
            let initialLength = tasks.length;
            tasks = tasks.filter(t => {
                if (t.dueAt) {
                    return new Date(t.dueAt) >= now;
                }
                return true;
            });
            if (tasks.length !== initialLength) {
                localStorage.setItem('polibatam_tasks', JSON.stringify(tasks));
            }

            if (tasks.length === 0) {
                taskList.innerHTML = '<p style="text-align:center; color:rgba(255,255,255,0.4); margin-top: 1rem;">Belum ada tugas e-learning. Waktunya bersantai! 🎮</p>';
                return;
            }

            taskList.innerHTML = tasks.map((t, i) => {
                const formatDate = (dateStr) => {
                    if(!dateStr) return '';
                    const d = new Date(dateStr);
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${d.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}`;
                };
                
                const metaHtml = t.dueAt ? `
                    <div class="task-meta">
                        <div class="meta-row"><span>📅 Opened:</span> ${formatDate(t.openedAt)}</div>
                        <div class="meta-row due"><span>⏳ Due:</span> ${formatDate(t.dueAt)}</div>
                    </div>
                ` : '';

                const badgesHtml = t.course ? `
                    <div class="task-badges">
                        <span class="task-badge badge-course">${t.course}</span>
                        <span class="task-badge badge-type">${t.type}</span>
                    </div>
                ` : '';

                const titleHtml = t.title ? `<h4 class="task-title">${t.title}</h4>` : '';

                return `
                <li class="task-item ${t.done ? 'completed' : ''}">
                    <div class="task-header">
                        <div class="task-header-left">
                            <input type="checkbox" class="task-checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask(${i})">
                            <div class="task-content">
                                ${badgesHtml}
                                ${titleHtml}
                                <p class="task-text">${t.text}</p>
                            </div>
                        </div>
                    </div>
                    ${metaHtml}
                    ${t.image ? `<img src="${t.image}" class="task-image" onclick="window.open('${t.image}', '_blank')">` : ''}
                </li>
            `}).join('');
        }

        // Viewer logic
        window.openTaskModal = function() {
            renderTasks();
            taskModal.classList.add('active');
        };
        window.closeTaskModal = function() {
            taskModal.classList.remove('active');
        };
        window.toggleTask = function(index) {
            tasks[index].done = !tasks[index].done;
            saveTasks();
        };


        // Admin logic
        window.openAdminModal = function() {
            document.getElementById('admin-pin').value = '';
            document.getElementById('login-error').style.display = 'none';
            document.getElementById('login-section').style.display = 'block';
            document.getElementById('upload-section').style.display = 'none';
            adminModal.classList.add('active');
            setTimeout(() => document.getElementById('admin-pin').focus(), 100);
        };
        window.closeAdminModal = function() {
            adminModal.classList.remove('active');
        };
        window.loginAdmin = function() {
            if(document.getElementById('admin-pin').value === 'locked&011') {
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('upload-section').style.display = 'block';
                document.getElementById('admin-task-desc').value = '';
                document.getElementById('admin-task-img').value = '';
            } else {
                document.getElementById('login-error').style.display = 'block';
            }
        };

        // Compress image before saving to avoid LocalStorage limits
        function compressImage(file, callback) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(event) {
                const img = new Image();
                img.src = event.target.result;
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 600;
                    let width = img.width;
                    let height = img.height;
                    if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                    canvas.width = width; canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    callback(canvas.toDataURL('image/jpeg', 0.6));
                };
            };
        }

        window.adminSaveTask = function() {
            const text = document.getElementById('admin-task-desc').value.trim();
            const fileInput = document.getElementById('admin-task-img');
            
            if (!text) {
                alert('Tolong isi deskripsi tugasnya!');
                return;
            }

            if (fileInput.files && fileInput.files[0]) {
                compressImage(fileInput.files[0], function(base64Img) {
                    tasks.push({ text, done: false, image: base64Img });
                    saveTasks();
                    closeAdminModal();
                    openTaskModal(); // Show the result
                });
            } else {
                tasks.push({ text, done: false, image: null });
                saveTasks();
                closeAdminModal();
                openTaskModal();
            }
        };

        // Track berry states for smoothing
        allBerries.forEach(b => {
            b.dataset.rx = 0; b.dataset.ry = 0; b.dataset.angle = Math.random() * 360;
            b.dataset.baseX = 0; b.dataset.baseY = 0;
            b.dataset.targetRx = 0; b.dataset.targetRy = 0;
        });

        let mouse = { x: 0, y: 0, px: window.innerWidth/2, py: window.innerHeight/2 };
        let currentMouse = { x: 0, y: 0 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = (e.clientX / window.innerWidth) - 0.5;
            mouse.y = (e.clientY / window.innerHeight) - 0.5;
            mouse.px = e.clientX;
            mouse.py = e.clientY;
        });

        function animate() {
            const time = Date.now() * 0.001;
            currentMouse.x += (mouse.x - currentMouse.x) * 0.05;
            currentMouse.y += (mouse.y - currentMouse.y) * 0.05;

            // REMOVED modelViewer.cameraOrbit override here to allow full 360 manual rotation!

            // Update parallax containers
            berriesFG.style.transform = `translate(${currentMouse.x * 60}px, ${currentMouse.y * 60}px)`;
            berriesBG.style.transform = `translate(${currentMouse.x * -30}px, ${currentMouse.y * -30}px)`;
            leavesBG.style.transform = `translate(${currentMouse.x * -15}px, ${currentMouse.y * -15}px)`;

            // Repulsion and float for berries
            if (!isSwitching) {
                allBerries.forEach((berry, i) => {
                    const berryRect = berry.getBoundingClientRect();
                    const berryX = berryRect.left + berryRect.width / 2;
                    const berryY = berryRect.top + berryRect.height / 2;

                    const diffX = mouse.px - berryX;
                    const diffY = mouse.py - berryY;
                    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

                    let targetRx = 0, targetRy = 0, speedMult = 1;
                    if (distance < 400) {
                        const force = (400 - distance) / 400;
                        targetRx = (diffX / distance) * force * -80;
                        targetRy = (diffY / distance) * force * -80;
                        speedMult = 1 + force * 5;
                    }

                    let rx = parseFloat(berry.dataset.rx) || 0;
                    let ry = parseFloat(berry.dataset.ry) || 0;
                    let angle = parseFloat(berry.dataset.angle) || 0;
                    let baseX = parseFloat(berry.dataset.baseX) || 0;
                    let baseY = parseFloat(berry.dataset.baseY) || 0;

                    rx += (targetRx - rx) * 0.1;
                    ry += (targetRy - ry) * 0.1;
                    angle += 0.2 * speedMult;

                    berry.dataset.rx = rx;
                    berry.dataset.ry = ry;
                    berry.dataset.angle = angle;

                    const dur = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10][i % 9];
                    const phase = (time + i * 0.7) * (Math.PI * 2 / dur);
                    const floatY = Math.sin(phase) * 15;
                    const floatAngle = Math.cos(phase) * 6;

                    berry.style.transform = `translate(calc(${rx + baseX}px), calc(${ry + baseY}px + ${floatY}px)) rotate(calc(${angle}deg + ${floatAngle}deg))`;
                });
            }

            // Update leaves with float
            document.querySelectorAll('.leaf').forEach((leaf, i) => {
                const dur = 10 + i * 2;
                const phase = (time + i * 1.2) * (Math.PI * 2 / dur);
                const floatY = Math.sin(phase) * 20;
                const floatX = Math.cos(phase * 0.5) * 15;
                const floatAngle = Math.sin(phase * 0.3) * 15;
                leaf.style.transform = `translate(${floatX}px, ${floatY}px) rotate(${floatAngle}deg)`;
            });

            requestAnimationFrame(animate);
        }
        animate();

        // Bubbles Generator
        const bubblesContainer = document.getElementById('bubbles-container');
        function createBubble() {
            if (!bubblesContainer) return;
            const bubble = document.createElement('img');
            bubble.src = 'https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/bubble.png';
            bubble.className = 'bubble-img';
            const size = Math.random() * 20 + 10 + 'px';
            bubble.style.width = size;
            bubble.style.height = 'auto';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.bottom = '-50px';
            bubble.style.opacity = Math.random() * 0.4 + 0.1;
            const duration = Math.random() * 6 + 4;
            bubble.style.animation = `floatUpImg ${duration}s linear forwards`;
            bubblesContainer.appendChild(bubble);
            setTimeout(() => bubble.remove(), duration * 1000);
        }
        
        if (window.innerWidth > 1024) {
            setInterval(createBubble, 400);
        }





