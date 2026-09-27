# Julkaisukierros TF 1.0.33 (Laitetestaaja, 27.9.2026 klo 23.0x)

Fablen julkaisulippu `/tmp/matkakirja-julkaisu` päällä ajon aikana. Juna/b13 508761e8, käännös
3d0c663a. Ancestor OK (`merge-base --is-ancestor 508761e8 3d0c663a`). iPhone 18 Pro (1572C658).
**0 poikkeusta.**

## Kohdat

1. **Luenta ilman ohituksia, ei taukoa lyhyen otsikon jälkeen: PASS.** `ui nosto
   skandaali:shakkiturkkilainen` (säilötty teksti), kaiutin. Loki: otsikko ja ensimmäinen virke
   YHDESSÄ pyynnössä (`kertoja||1.15|Shakkiturkkilainen — kone joka voitti Napoleonin. Kone
   kumarsi...`) — ei erillistä taukoa otsikon jälkeen. Palat: `pala 1/2 189 mrk soi 10,8/10,9 s`,
   `pala 2/2 127 mrk soi 7,9/7,9 s`, molemmat verkko/levy 200, siirtyi saumatta seuraavaan
   kappaleeseen välimuistista (17 ms). Luenta jatkui koko artikkelin loppuun asti keskeytyksettä.
2. **Ateenan kuvakortti pysyy paikallaan, ei välky levossa: PASS.** Kaksi kuvakaappausta 4 s
   välein levossa: pieni "Ateena"-kortti pysyi samassa kohdassa merkin vierellä molemmilla
   kerroilla, ei sijainnin/koon muutosta.
3. **Kartta näkyy heti päivityksen jälkeen (1.0.32 → 1.0.33 päälle): PASS.** Asennettu
   juna-4be1a696 (1.0.32), käynnistetty, asennettu juna-508761e8 (1.0.33) päälle (vanha prosessi
   kaatui hiljaisesti asennuksen yhteydessä, odotettua). Uusi käynnistys: pallo/pohjakartta
   valmis 100 % 7,6 s:ssa, verho pois 6,6 s, 0 poikkeusta.
4. **Lukijan äänen vaihto ottaa valinnan vastaan: PASS.** Ratas-paneelista vaihdettu "Aino
   (oletus)" → "Aamu". Seuraava lukupyyntö vaihtui välittömästi tunnisteesta `kertoja||1.15|...`
   (oletus, tyhjä ääni) tunnisteeseen **`kertoja|aurora||1.15|...`** — valinta vaikutti oikeasti
   puhepyyntöön, ei jäänyt vain UI:n näyttötekstiksi.

## Yhteenveto Natiivisepälle ja Fablelle: **PASS 4/4, 0 poikkeusta.**
