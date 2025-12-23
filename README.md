# Joc 2D Side-Scroller în JavaScript 🎮

Acest proiect este un joc 2D de tip "endless runner", construit de la zero folosind **HTML5 Canvas, CSS3 și JavaScript pur (vanilla)**. A fost dezvoltat ca parte a unui proiect universitar, cu scopul de a implementa un joc 2D interactiv și de a demonstra înțelegerea conceptelor fundamentale de game development în browser.

*(Sugestie: Poți înlocui imaginea de mai jos cu un GIF al jocului tău, creat cu un tool precum [ScreenToGif](https://www.screentogif.com/) sau [LICEcap](https://www.cockos.com/licecap/)).*

## 🕹️ Gameplay & Controale

Jocul este un side-scroller infinit în care controlezi un personaj care aleargă constant. Obiectivul este să supraviețuiești cât mai mult timp și să obții un scor cât mai mare prin eliminarea inamicilor.

- **Săritură:** Apasă `Săgeată Sus` pentru a sări peste inamici.
- **Atac (Rostogolire):** Apasă `Enter` pentru a intra într-o stare de atac (rostogolire). Doar în această stare poți elimina inamicii la contact.
- **Aterizare Rapidă:** Apasă `Săgeată Jos` în timp ce ești în aer pentru a anula săritura și a ateriza mai repede.

Jocul se termină dacă un inamic te atinge în timp ce **nu** ești în starea de atac.

## ✨ Funcționalități Implementate

- **Game Loop Complet:** Jocul rulează într-o buclă `animate` controlată de `requestAnimationFrame` pentru o performanță fluidă.
- **Motor de Fizică Simplu:** Personajul este afectat de gravitație, poate sări și are detecție de coliziune cu solul.
- **Player State Machine:** Personajul are mai multe stări (alergare, săritură, cădere, atac), fiecare cu propria sa animație și logică, implementate printr-o mașină de stări.
- **Animații Sprite Sheet:** Animațiile personajului și ale inamicilor sunt realizate prin parcurgerea unor sprite sheets, o tehnică standard în jocurile 2D.
- **Parallax Scrolling:** Fundalul este format din mai multe straturi care se mișcă cu viteze diferite, creând o iluzie de profunzime.
- **Sistem de Inamici:** Inamicii sunt generați procedural la intervale de timp, menținând provocarea constantă.
- **Detecție de Coliziuni:** Logica jocului verifică constant coliziunea dintre jucător și inamici pentru a determina dacă un inamic este eliminat sau dacă jocul s-a terminat.
- **Scor și Interfață:** Scorul se incrementează pentru fiecare inamic învins, iar interfața afișează starea curentă și un mesaj de "Game Over".
- **Funcție de Restart:** Un buton de "Restart Game" permite rejucarea imediată, resetând toate variabilele jocului.

## 🛠️ Tehnologii Folosite

- **HTML5**
    - **Canvas API** pentru randarea grafică.
- **CSS3**
    - Stilizare și centrarea elementelor pe pagină.
- **JavaScript (ES6+)**
    - **Programare Orientată pe Obiecte (OOP)** cu clase (`Player`, `Enemy`, `Background`, `InputHandler`).
    - **Game Loop** (`requestAnimationFrame`).
    - **Manipularea DOM-ului** pentru interfață și butoane.
    - **Gestionarea Evenimentelor** (`keydown`, `keyup`) pentru a capta input-ul de la tastatură.

## 🚀 Rulare Locală

Proiectul este complet static și nu necesită un server sau un proces de build.

**Clonează Repozitoriul**
```bash
git clone https://github.com/sergiurst1/javascript-game.git
```
