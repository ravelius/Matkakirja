# Natiivisepän luovutus 10.11.2026 klo 13.42

Edellinen: -1250 (c7b913f03), käsitelty (kohdat alla). Syy: kontekstivahti 26 % (7.37). Kansio Matkakirja-3d-selvittaja. Älä poista mitään.
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/, lokit /Users/Shared/Claude/proto-3d/lokit/. Repo proto-3d/Matkakirja-proto, remote natiivi-backup.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (ohje -1250). Vahti: Monitor JU:n ajoille (iPad konsoli.txt hiljaa > 60 s, .ajo.log VALMIS).
Iso iPad toimii taas 13.25 (omistaja käynnisti käsin, PT). Viestit PT:lle ≤ 3 riviä; syyt ja versiot KK:lle PT:n kautta (roolit eivät viesti KK:lle).

## 1. ISS + PARIISIN PALLO "SISÄÄN ULOS LEVOTON ZOOMAUS" (omistaja 13.14, PT 13.1x) – KORJAUS JU:N iPad-JONON KÄRJESSÄ
- SYY: kamera etenee ruudun ajan mukaan, GPU ei pysy tavoitteessa → ruudut vuorottelevat (iso iPad ISS, lokit/natiiviseppa-iss-muisti-a-0fc5b9a73:
  tavoite 60, ruudut 41,7/50 ms, gpuMs 78–88) → eteenpäin liikkuvassa kuvassa edestakainen zoomaus. Sama kaava kuin juoksupelin 1e (JuoksuTahdistus, juna 224).
  Pallolle ei iPad-mittausta (päätelty: sama ketju PalloKierto.Kuvaa). Omistajan "iPad-simu" ei ollut JU:n ajo (ei lokia).
- KORJAUS natiivi-backup natiiviseppa/lento-tahdistus 06ac958d1 (wt /Users/Shared/Claude/wt/proto-selvittaja-lentotahdistus, 941dd597f:n päällä =
  ISS-kehyskello af969f31a + kupolin FSR): Kartta/LentoTahdistus(+Paatos).cs; 4/30 myöhässä → näytön tasajakaja alas (120 Hz 60→40→30→24→20), ei ylös
  lennon aikana, ruudun aika päivitysväliin. RakettiLaukaisu Kello = LentoTahdistus.Aika + Pyyda; OpasSovitin silmukka.Paivita(LentoTahdistus.Dt) + Pyyda;
  Ruudunpaivitys min-katto. QA `komento ruutu tahdistus 0|1|<fps>|tila`. Loki "MATKAKIRJA tahdistus: alkaa/porras/jakso/loppui".
  Kartta-testit 738/738 (5 uutta), unity-tarkistus 0.
- AJO: _tyo/natiiviseppa/lento-tahdistus/ajopyynto-1.md + sk-tahdistus-ipad-1.txt → lokit/natiiviseppa-lento-tahdistus-ipad-1 (JU kirjasi kärkeen).
  LUE: grep "tahdistus: jakso" A (tila 0) vs B (tila 1) ISS:ssä ja pallossa: B:ssä min ≈ max, myöhässä ≈ 0, katto; + kehysajat p50/p95, näytön tallenne.
  → pari/luvut PT:lle, syy + versio KK:lle PT:n kautta. Ei junaan ilman paria.
## 2. PARIISIN PANOROINNIN TÖKKIMINEN (omistaja 13.00, Tekninen kunto) – ENSIN tahdistus-A/B:n jälkeen (PT 13.5x)
- PE-ajot kaatuivat 13.18 virheeseen 22 (iPad), kansiot natiiviseppa-kehys-pe-* TYHJIÄ. JU ajaa PE:n alusta (ohje -1250 LISÄYS kohta 2; skenaario ja lukijat
  _tyo/natiiviseppa/vieritys-pe/). PT: voi olla sama ruutuvuorottelu → vertaa PE:n ruutuaikoja (vuorottelevatko 2/3/4 päivitysväliä?). Panorointi ei kutsu
  LentoTahdistus.Pyydaa (pelaajan liike) → jos sama syy, korjausehdokas C = sama tahdistus vieritykselle (Pyyda PalloKierron Ohjaa-polulta); C:n sha JU:lle.
## 3. KERTOJAN VIIVE – SYY LÖYDETTY, KORJAUS TEKEMÄTTÄ (PT 13.5x: tee nyt, panorointi ensin jos A/B tulee)
- Syy: 1. valmisluento haetaan verkosta vasta napautuksella (Louvre 5,3 s verkko, Eiffel 1,0 s, Louvre uudelleen 0,19 s välimuisti; PCM 20–70 ms; ääniputki ok).
  Kirjaus _tyo/natiiviseppa/kertoja-viive/tulos.md (loppu).
- TEHTÄVÄ: esilataaja hakee kaupungin nähtävyyksien valmisluennat (manifestin mp3:t) välimuistiin MATALALLA PRIORITEETILLA vasta kun kaupungin laatat/talot
  on ladattu (PT:n ehto: ei kilpaile kartan kanssa) + yhteyden lämmitys käynnistyksessä. Koodi: Puhe.cs (LataaJaSoita, valmisluennat), esilataaja
  ("esilataaja: joutilas/tehtävä"), NahtavyysEsittely.cs. Oma haara juna-224:n päälle, unity-tarkistus sh:lla, Mac/iPad-mittaus JU:lla (kertoja-viive/ajopyynto-1.md kopio).
## 4. LONTOON TYHJÄ KARTTA – KUITATTU PT:lle 13.5x
- 9d5be8823 (lokit/natiiviseppa-lontoo-opas-ipad-9d5be8823): ei toistunut, JUMI 0, purku alku→loppu, GBR 374 (0421af91a: 1). Korjaus junaan PT 13.1x luvalla (JU).
  NUI kuitattu: kuuntelijaheittoja 0, fps 30 = Kuuma (thermal 2). Jos vika palaa: ehdokkaat ISS/raketti, juoksupeli, taustalle vienti (-1250).
## 5. YKSI TARKKUUS a2 iPad-muisti – lokit/natiiviseppa-yksi-tarkkuus-ipad-a2-1.ajo.log TYHJÄ (13.11, iPad-vika) → tarkista JU:lta uusinta (ohje -1250 kohta 2).
## 6. ISS iPad (tärinä + kupoli) ja PdG – ennallaan JU:lla (-1152 kohta 2, -1105 kohta 1). Tahdistusajo korvaa tärinän iPad-mittauksen (sama haara + kehyskello).

## VIESTIT TÄLLÄ VUOROLLA
PT: ISS/pallo syy+korjaus, Lontoo, kertojan viive (kuitattu 13.5x). JU: ajopyyntö tahdistus (kärkeen kuitattu). NUI: Lontoo-vastaus.
Postivahti pyysi nollausta 3× ennen tätä: vastattu (kesken työn); nyt nollaus tämän luovutuksen jälkeen.
