document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const buttonContainer = document.getElementById('button-container');

    const fields = [
        { id: 'judul-scene', label: '1. Judul Scene', type: 'text', value: 'Terminal bus malam' },
        { id: 'deskripsi-karakter', label: '2. Deskripsi Karakter Inti', type: 'textarea', rows: 10, value: 'Seorang vlogger wanita muda asal Minang berusia 27 tahun.\nPerawakan/Bentuk Tubuh: tubuh mungil, tinggi 158cm, bentuk badan proporsional.\nwarna kulit: sawo matang cerah.\nRambut: ikal sebahu, hitam kecokelatan, diikat setengah ke belakang.\nWajah: wajah oval, alis tebal alami, mata hitam besar, senyum ramah, pipi merona, bibir natural dengan sentuhan lip tint.\nPakaian: mengenakan jaket parasut warna kuning mustard dan celana panjang hitam, membawa ransel kecil.' },
        { id: 'detail-suara', label: '3. Detail Suara Karakter', type: 'textarea', rows: 8, value: 'Dia berbicara dengan suara wanita muda yang hangat dan penuh semangat.\nNada: mezzo-soprano.\nTimbre: bersahabat dan enerjik.\nAksen/Logat: logat Indonesia dengan sentuhan khas Minang halus, berbicara murni dalam Bahasa Indonesia.\nCara Berbicara: tempo sedang-cepat, gaya bicara lincah dan ekspresif.\nPENTING: Seluruh dialog harus dalam Bahasa Indonesia dengan pengucapan natural dan jelas. Pastikan suara karakter ini konsisten di seluruh video.' },
        { id: 'aksi-karakter', label: '4. Aksi Karakter', type: 'text', value: 'berjalan di sekitar terminal bus malam sambil melihat-lihat aktivitas penumpang dan pedagang.' },
        { id: 'ekspresi-karakter', label: '5. Ekspresi Karakter', type: 'text', value: 'Karakter menunjukkan ekspresi kagum dan antusias, sering tersenyum sambil melirik kamera.' },
        { id: 'latar-tempat-waktu', label: '6. Latar Tempat & Waktu', type: 'textarea', rows: 4, value: 'latar tempat: di terminal bus antar kota malam hari, terdapat pedagang kaki lima di pinggir jalur keberangkatan, beberapa bus berjajar dengan lampu menyala.\nWaktu: malam hari, hujan rintik-rintik.' },
        { id: 'detail-visual', label: '7. Detail Visual Tambahan', type: 'textarea', rows: 4, value: 'Pencahayaan: natural dari lampu jalan dan lampu bus, pantulan cahaya pada aspal basah.\nGaya Video/Art Style: cinematic realistis.\nKualitas Visual: Resolusi 4K.' },
        { id: 'gerakan-kamera', label: 'Gerakan Kamera', type: 'select', options: [
            { text: 'Static (Statis)', value: 'Static camera' },
            { text: 'Tracking Shot (Tembakan Mengikuti)', value: 'camera tracking shot from behind the character then to the side and front, following her steps cinematically.' },
            { text: '3D Rotation (Rotasi 3D)', value: '3D Rotation' },
            { text: 'Dolly (Gerakan maju/mundur)', value: 'Dolly shot' },
            { text: 'Pan Left (Geser Kiri)', value: 'Pan Left' },
            { text: 'Pan Right (Geser Kanan)', value: 'Pan Right' },
            { text: 'Pan Up (Geser Atas)', value: 'Pan Up' },
            { text: 'Pan Down (Geser Bawah)', value: 'Pan Down' },
            { text: 'Tilt Up (Miring Atas)', value: 'Tilt Up' },
            { text: 'Tilt Down (Miring Bawah)', value: 'Tilt Down' },
            { text: 'Zoom In (Perbesar)', value: 'Zoom In' },
            { text: 'Zoom Out (Perkecil)', value: 'Zoom Out' },
            { text: 'Rotate Clockwise (Putar Searah Jarum Jam)', value: 'Rotate Clockwise' },
            { text: 'Rotate Counter-Clockwise (Putar Berlawanan Jarum Jam)', value: 'Rotate Counter-Clockwise' },
        ], selected: 'camera tracking shot from behind the character then to the side and front, following her steps cinematically.'},
        { id: 'suasana', label: '8. Suasana Keseluruhan', type: 'text', value: 'Suasana sibuk, ramai, dengan kesan perjalanan malam yang hidup dan dinamis meskipun hujan.' },
        { id: 'suara-lingkungan', label: '9. Suara Lingkungan/Ambience', type: 'text', value: 'SOUND: suara mesin bus menyala, pengumuman dari pengeras suara, derai hujan ringan, dan percakapan samar antar penumpang dan pedagang.' },
        { id: 'dialog-karakter', label: '10. Dialog Karakter', type: 'textarea', rows: 3, value: 'DIALOG dalam Bahasa Indonesia: Karakter berkata: "Tiap kota punya terminal kayak gini, dan aku suka banget suasana malamnya… hangat walau gerimis begini. Rasanya kayak perjalanan baru mau dimulai."' },
        { id: 'negative-prompt', label: '11. Negative Prompt', type: 'textarea', rows: 3, value: 'Hindari: teks di layar, subtitle, tulisan di video, font, logo, distorsi, artefak, anomali, wajah ganda, anggota badan cacat, tangan tidak normal, orang tambahan, objek mengganggu, kualitas rendah, buram, glitch, suara robotik, suara pecah.' }
    ];

    fields.forEach(field => {
        const group = document.createElement('div');
        group.className = 'input-group';
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        group.appendChild(label);

        let input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = field.rows;
            input.value = field.value;
        } else if (field.type === 'select') {
            input = document.createElement('select');
            field.options.forEach(opt => {
                const option = document.createElement('option');
                option.textContent = opt.text;
                option.value = opt.value;
                if (opt.value === field.selected) {
                    option.selected = true;
                }
                input.appendChild(option);
            });
        } else {
            input = document.createElement('input');
            input.type = field.type;
            input.value = field.value;
        }
        input.id = field.id;
        group.appendChild(input);
        formContainer.appendChild(group);
    });

    const buttons = [
        { id: 'generate-btn', text: 'Hasilkan Prompt Final' },
        { id: 'new-story-btn', text: 'Buat Cerita Baru' },
        { id: 'next-scene-btn', text: 'Buat Scene Berikutnya' },
        { id: 'change-style-btn', text: 'Ubah Style Visual' },
        { id: 'change-title-btn', text: 'Ubah Judul Halaman' }
    ];

    buttons.forEach(btnInfo => {
        const button = document.createElement('button');
        button.id = btnInfo.id;
        button.textContent = btnInfo.text;
        buttonContainer.appendChild(button);
    });

    const translationMap = {
        'judul-scene': 'SCENE TITLE',
        'deskripsi-karakter': 'CORE CHARACTER DESCRIPTION',
        'detail-suara': 'CHARACTER VOICE DETAILS',
        'aksi-karakter': 'CHARACTER ACTION',
        'ekspresi-karakter': 'CHARACTER EXPRESSION',
        'latar-tempat-waktu': 'SETTING & TIME',
        'detail-visual': 'ADDITIONAL VISUAL DETAILS',
        'gerakan-kamera': 'Camera Movement',
        'suasana': 'OVERALL ATMOSPHERE',
        'suara-lingkungan': 'ENVIRONMENTAL SOUND (AMBIENCE)',
        'dialog-karakter': 'CHARACTER DIALOGUE',
        'negative-prompt': 'NEGATIVE PROMPT'
    };
    
    function generatePrompt() {
        let indonesianPrompt = "PROMPT KARAKTER KONSISTEN VEO3\n\n";
        let englishPrompt = "CONSISTENT CHARACTER PROMPT VEO3\n\n";
        
        const fieldLabels = {
            'judul-scene': 'JUDUL SCENE',
            'deskripsi-karakter': 'DESKRIPSI KARAKTER INTI',
            'detail-suara': 'DETAIL SUARA KARAKTER',
            'aksi-karakter': 'AKSI KARAKTER',
            'ekspresi-karakter': 'EKSPRESI KARAKTER',
            'latar-tempat-waktu': 'LATAR TEMPAT & WAKTU',
            'detail-visual': 'DETAIL VISUAL TAMBAHAN',
            'suasana': 'SUASANA KESELURUHAN',
            'suara-lingkungan': 'SUARA LINGKUNGAN (AMBIENCE)',
            'dialog-karakter': 'DIALOG KARAKTER',
            'negative-prompt': 'NEGATIVE PROMPT'
        };

        for (const id in fieldLabels) {
            const element = document.getElementById(id);
            if (!element) continue;

            const label = fieldLabels[id];
            let value = element.value;

            indonesianPrompt += `[${label}]\n`;
            englishPrompt += `[${translationMap[id]}]\n`;

            if (id === 'detail-visual') {
                 const cameraSelect = document.getElementById('gerakan-kamera');
                 const cameraIndoText = `Gerakan Kamera: ${cameraSelect.options[cameraSelect.selectedIndex].text}`;
                 const cameraEngText = `Camera Movement: ${cameraSelect.value}`;
                 
                 indonesianPrompt += `${cameraIndoText}\n${value}\n\n`;
                 englishPrompt += `${cameraEngText}\n${value}\n\n`;
            } else if (id === 'dialog-karakter') {
                indonesianPrompt += `${value}\n\n`;
                const dialogOnlyMatch = value.match(/"(.*)"/);
                const dialogOnly = dialogOnlyMatch ? dialogOnlyMatch[0] : '""';
                englishPrompt += `DIALOGUE in Indonesian: The character says: ${dialogOnly}\n\n`;
            } 
            else {
                indonesianPrompt += `${value}\n\n`;
                englishPrompt += `${value}\n\n`;
            }
        }

        document.getElementById('indonesian-prompt').value = indonesianPrompt.trim();
        document.getElementById('english-prompt').value = englishPrompt.trim();
    }

    document.getElementById('generate-btn').addEventListener('click', generatePrompt);

    document.getElementById('change-title-btn').addEventListener('click', () => {
        const newTitle = prompt("Masukkan judul baru:", "Veo 3 Prompt Generator by hilvanto");
        if (newTitle) {
            document.getElementById('main-title').textContent = newTitle;
            document.getElementById('page-title').textContent = newTitle;
        }
    });

    document.getElementById('change-style-btn').addEventListener('click', () => {
        const newStyle = prompt("Kombinasikan warna untuk gaya visual (contoh: biru, hitam dan putih):");
        if (newStyle) {
            const visualDetailInput = document.getElementById('detail-visual');
            const currentVal = visualDetailInput.value;
            const styleRegex = /Gaya Video\/Art Style: .*/;
            if (currentVal.match(styleRegex)) {
                 visualDetailInput.value = currentVal.replace(styleRegex, `Gaya Video/Art Style: ${newStyle}`);
            } else {
                 visualDetailInput.value += `\nGaya Video/Art Style: ${newStyle}`;
            }
        }
    });

    document.getElementById('new-story-btn').addEventListener('click', () => {
        document.getElementById('judul-scene').value = "Laboratorium Bawah Tanah";
        document.getElementById('deskripsi-karakter').value = "Seorang ilmuwan jenius bernama Dr. Aris, usia 45 tahun, dengan rambut acak-acakan dan mata yang tajam di balik kacamata tebal. Mengenakan jas lab putih yang sedikit kotor dengan noda kopi.";
        document.getElementById('detail-suara').value = "Suara bariton yang dalam dan tenang, berbicara dengan presisi ilmiah. Aksen Indonesia baku. Tempo bicara lambat dan penuh pertimbangan.";
        document.getElementById('aksi-karakter').value = "Dengan hati-hati menuangkan cairan berwarna biru dari satu tabung reaksi ke tabung lainnya, menyebabkan kepulan asap tipis.";
        document.getElementById('ekspresi-karakter').value = "Ekspresi fokus dan tegang, dengan sedikit senyum puas saat eksperimen berhasil.";
        document.getElementById('latar-tempat-waktu').value = "Latar: Laboratorium canggih di bawah tanah, dipenuhi peralatan futuristik, layar monitor yang menampilkan data kompleks, dan cahaya biru remang-remang. Waktu: Larut malam.";
        document.getElementById('detail-visual').value = "Pencahayaan: Cahaya dari monitor dan lampu LED biru di peralatan.\nGaya Video/Art Style: Sci-fi noir, high-tech.\nKualitas Visual: Resolusi 8K.";
        document.getElementById('gerakan-kamera').value = 'Static camera';
        document.querySelector('#gerakan-kamera option[value="Static camera"]').selected = true;
        document.getElementById('suasana').value = "Suasana tegang, sunyi, dan penuh misteri ilmiah.";
        document.getElementById('suara-lingkungan').value = "SOUND: Dengungan pelan dari server komputer, suara gelembung cairan kimia, dan sesekali bunyi 'bip' dari peralatan.";
        document.getElementById('dialog-karakter').value = 'DIALOG dalam Bahasa Indonesia: Karakter bergumam pada dirinya sendiri: "Hampir... sedikit lagi... dan semua akan berubah."';
        document.getElementById('negative-prompt').value = "Hindari: getaran kamera, gambar buram, artefak digital.";
        generatePrompt();
    });

    document.getElementById('next-scene-btn').addEventListener('click', () => {
        document.getElementById('latar-tempat-waktu').value = "Latar: Koridor panjang dan steril di luar laboratorium. Lampu neon berkedip-kedip. Waktu: Segera setelah scene sebelumnya.";
        document.getElementById('aksi-karakter').value = "Berjalan cepat menyusuri koridor sambil membawa sebuah koper logam dengan hati-hati.";
        document.getElementById('ekspresi-karakter').value = "Ekspresi cemas dan waspada, sering menoleh ke belakang seolah-olah ada yang mengikuti.";
        const cameraSelect = document.getElementById('gerakan-kamera');
        cameraSelect.value = "Dolly shot";
        document.getElementById('dialog-karakter').value = 'DIALOG dalam Bahasa Indonesia: Karakter berbisik ke alat komunikasi di pergelangan tangannya: "Aku sudah dapat. Aku keluar sekarang. Jaga posisimu."';
        generatePrompt();
    });

    // Initial prompt generation on load
    generatePrompt();
});
