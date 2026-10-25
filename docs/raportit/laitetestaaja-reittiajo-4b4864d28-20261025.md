# Reittiajo rungosta 4b4864d28 (iPad Pro 13, 25.10.2026 klo 13.46–13.59): lukitusmittarit VIHREÄT, mutta PIILOSSA-ruutuja 10× enemmän ja 31 venynyttä ruutua

NS asensi 13.46 (PK:n räystäs- ja aukiokamera, LR tausta-v50, rakennukset-v42); app käynnistyi 13.46.27. Skriptit 60e92b7a7. Aineisto: proto-3d/_tyo/linssiseppa2/varjot-koko/r4b48-1ja/ ja r4b48-2reitit/.

## Lukitusmittarit (vihreät)
- GPU: J 9,48 ms / A 11,52 ms (raja 14); ruutuja > 17,5 ms: 0.
- Aukio 180 s: käännösnykäykset 0, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0 (suurin 27 ms).
- Sisätila 120 s: käännösnykäykset 1, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0 (suurin 19 ms).
- Alkulento puhdas (KAMERAHYPPY + hyppysuoja-rivejä 0).

## Huomiot (uutta edellisiin ajoihin: 0ef01ab91, 719cefaaa)
- **PELAAJA PIILOSSA -ruutuja: aukio 563 (aiemmin 33–37), sisätila 402 (aiemmin 56–65);** kääntyilyt 3 / 2 (aiemmin 1 / 1). Suurin yksittäinen jakso: 183 ruutua t 108,4 s, syy "näkölinja peittokartan massassa: este (81,6; 2,9; −521,0) huippu 5,1, ei kattoa", kamera (81,6; 7,1; −524,6), Puyi (81,6; 0; −519,4) – kamera 5 m Puyin takana ja 7,1 m korkealla, este 5,1 m korkea. Muut jaksot 8–20 ruutua, esteet huippu 2,6–5,1 m. Todennäköisesti uusi räystäs-/aukiokamera (PK) tai LR:n kujien levennyksen rakennukset/katoserä; PK tarkistaa.
- **VENYNYT RUUTU 31 kpl** (20,2–27,2 ms, kaikki "ei nykäys"), aiemmin 2–6. Kasautuvat: t 155,0–155,5 s (8), 160,0–160,2 s (7), 183,7–184,3 s (14). Lähes kaikissa "ulkona" 14–23 ms ja Update 1–4 ms → venymä pelin ulkopuolella (GPU/OS), ei pelikoodia; mukana 1 GC. Aukion loppuosa (t 155–185 s) on GPU-raskaampi kuin aiemmat rungot.
- Verrattuna 719cefaaa: J 10,03 → 9,48, A 11,52 → 11,52, käännösnykäykset 3/2 → 0/1.
- Juna 210 julkaistaan nyt ilman lisätestejä (omistaja 13.56); 85d4ca9c4:n reittiajo peruttu.
