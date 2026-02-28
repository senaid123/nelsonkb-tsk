# 3D Showroom

Web aplikacija za prikaz i pozicioniranje 3D modela automobila u realnom vremenu. Modeli se mogu pomjerati i rotirati, a sve se automatski čuva u bazu.

## Šta radi

- Učitava dva 3D modela automobila u scenu
- Možeš ih prevlačiti po podu i rotirati
- Automobili se ne mogu preklapati (detekcija kolizije)
- Pogled se može prebaciti između 3D perspektive i pogleda odozgo
- Sve pozicije i rotacije se čuvaju u Firestore bazu, pa ostaju i nakon refresha

## Tech stack

- Next.js 16 + React 19 + TypeScript
- Three.js + React Three Fiber + Drei
- Firebase Firestore
- Tailwind CSS

## Kako pokrenuti lokalno

```bash
npm install
npm run dev
```

Aplikacija se otvara na `http://localhost:3000`.

## Firebase setup

U projektu treba kreirati `.env.local` fajl i dodati Firebase konfiguraciju:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

U Firestore konzoli treba omogućiti bazu (test mode je ok za razvoj).

## Kako koristiti

1. Klikni na vozilo da ga selektuješ (pojavi se crveni prsten)
2. U donjem baru odaberi **MOVE** ili **ROTATE**
3. Prevuci model mišem po sceni
4. Klikni **TOP VIEW** u headeru za pogled odozgo
5. U panelu desno možeš resetovati rotaciju na 0°

GLB fajlovi za modele idu u `public/models/` kao `car1.glb` i `car2.glb`.
