# Builder OS · Version 30

Website ulang tahun dengan konsep AI dashboard, builder mindset, dan Dream Garage 360.

## Cara jalanin di VS Code

1. Extract ZIP ini.
2. Buka folder `builder-os-version-30` di VS Code.
3. Buka terminal, jalankan:

```bash
npm install
npm run dev
```

4. Buka link local yang muncul, biasanya `http://localhost:5173`.

## Password website

Access code: `30`

## Dream Garage 360

Default website sudah jalan tanpa file 3D mobil. Kalau belum ada model `.glb`, sistem menampilkan fallback 3D sementara.

Kalau sudah punya model `.glb`, taruh di:

```txt
public/models/
```

Nama file yang disiapkan:

```txt
public/models/gclass-black.glb
public/models/bmw-silver.glb
public/models/white-premium-sedan.glb
public/models/porsche-silver.glb
public/models/innova-black.glb
```

Lalu buka `src/App.jsx`, cari mobilnya, ubah:

```js
hasModel: false
```

menjadi:

```js
hasModel: true
```

Setelah itu model 3D asli akan muncul dan bisa diputar 360 derajat.


## 360 image sequence installed

The Dream Garage section now uses the uploaded turntable image sequence in `public/turntable/`, replacing the fallback 3D viewer for that section.
