# 3D Showroom

Web aplikacija za prikaz i pozicioniranje 3D modela automobila u realnom vremenu napravljena sa Next.js, TailwindCSS i Three.js tehnologijama. Modeli se mogu pomjerati i rotirati, a sve se automatski čuva u bazu.

## Funkcionalnosti

- Učitava dva 3D modela automobila u scenu
- Mogućnost prevlačenja i rotacije
- Automobili se ne mogu preklapati (detekcija kolizije)
- Pregled se može birati između 3D i 2D perspektive.
- Sve pozicije i rotacije se čuvaju u Firestore bazu (Čuvanje nako refresha)

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

U Firestore konzoli treba omogućiti bazu

## Kako koristiti

1. Klikni na vozilo za selekciju
2. U donjem baru odaberi **MOVE** ili **ROTATE**
3. Prevuci model mišem po sceni
4. Klikni **TOP VIEW** u headeru za pogled odozgo
5. U panelu desno možeš resetovati rotaciju na 0°

GLB fajlovi za modele idu u `public/models/` kao `car1.glb` i `car2.glb`.
