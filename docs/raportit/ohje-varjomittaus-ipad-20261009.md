# Ohje Laitetestaajalle: omien mallien varjot, A/B-mittaus iPad Pro 13:lla (Linssiseppä 2, 9.10.2026)

PT 9.10. ilta: varjojen oletus kytketään päälle vasta tämän mittauksen jälkeen. Raja on enintään +1,5 ms. Laite on iPad Pro 13
00008103 (omistajan lupa 30.9.). Aloita vasta Julkaisijan NYT-vuorolla.

## Appi
Käytä junan 173 käännöstä, jossa on `linssiseppa2/varjot-173` (9acc8d4a7 tai sen merge). Varjot ovat oletuksena pois, ja asetus `omavarjot 1`
kytkee ne päälle. Mobiilissa varjokartta on 2048² ja 2 kaskadia, varjomatka 1000 m. Kun varjot kytkeytyvät, stdout-lokiin
tulee rivi `omat varjot päälle: varjomatka 1000 m, kartta 2048², kaskadit 2 (mobiili)`.

## Kulku
1. Tuore asennus, kehittäjätila (`linssi-komento.txt`: `kehittaja 1`), uusi peli ja `opas kaupunkitila tukholma`. Odota rivi `siirtymä valmis`.
2. `opas kori 0`, sitten kiinteä kamera: `opas kamera 59.32706 18.07138 420 64 0 50` (Kuninkaanlinna, omat mallit kuvassa). Odota 25 s, että laatat latautuvat.
3. Asetustiedosto `Documents/kaupunki-kuva-asetukset.txt` (luetaan 1 s välein). Ensimmäinen rivi aina `vuorokausi 1`, toinen `tunti 13`, kolmas:
   - A = `omavarjot 0`
   - B = `omavarjot 1`
4. Järjestys ABAB ABAB (8 jaksoa), kukin 30 s. Ensimmäiset 5 s jokaisesta jaksosta jätetään pois (vaihto).
5. Toista sama Pariisissa: `opas kaupunkitila pariisi`, kamera `opas kamera 48.854489 2.346340 320 62 200 95` (prefektuuri).

## Mittari
`Documents/kehysajat.jsonl` (KehysMittari, 5 s:n rivit, kehittäjätilassa) ja stdoutin rivit `MATKAKIRJA kehysajat {...}`:
`gpuMs` (FrameTimingManager) sekä `lepo`/`liike` p50 ja p95. Kirjaa jokaisesta jaksosta keskiarvo `gpuMs`, p95 ja `thermal`.
Sama lämpötila molemmille: aloita, kun `thermal` on 0, ja ABAB-järjestys tasaa lämpenemisen (muisti: laite-A/B lämpö).

## Tulos
Taulukko B − A (gpuMs ja p95) kaupungeittain ja parien hajonta. Raportti tiedostoon `docs/raportit/varjot-ipad-ab-<pvm>.md`
ja yksi rivi PT:lle sekä Linssiseppä 2:lle. Raja on +1,5 ms (gpuMs) Tukholmassa ja Pariisissa.
