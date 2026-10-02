# Laitetestaajan luovutus 2.10.2026 klo 22.1x (viikkoraja 92 %, Postivahdin/Päätoimittajan ohje)

Haara `laitetestaaja-savukierros-b13`. Kärki = tämän päivityksen commit (savukierros 1.1 (129) -commit **9873cbef5** on
sitä edellinen). Ei avoimia PR:jä (rooli committaa raportit suoraan omaan haaraansa). Ei ajastuksia (loop/cron/Monitor)
käynnissä. Repossa on muiden roolien untracked-tiedostoja (`tools/.natiivi-ui-*.mjs`, `tulokset/`) — älä koske.

**Ei käynnissä olevia ajoja.** Simulaattori iPhone 18 Pro `1572C658-6455-4E55-8C05-3F88CB3C32F6` Shutdown, app poistettu
(iPad `3B4CDACB-CCBE-42EC-809D-FB4D0B43CC7D` Shutdown). Tarkista `xcrun simctl list devices | grep -E "1572C658|3B4CDACB"`.

## Viimeisin valmis kierros: 1.1 (129) 745d8ff0 — PASS (TF-ehdokas 8/12)
Yläpalkki (saari ommeltu, "1 pv £400"), nostoselain yhdellä rivillä, valikko V2 siisti, kipsipäät nimien alla, ROOMA-nimi,
linna ennallaan, 1128b karttanappi. Raportti `docs/raportit/savukierros-1129-20261002.md`.
Tämän päivän (2.10.) kierrokset raportoitu: 1.1 (119) … (129) + (128b): `savukierros-11NN-20261002.md`
(120 Pulu-chat teemat + linna; 121 ISS-kilvet EI MAATA/VAIN EUROOPPA + ✕; 122 harmaa ✕ + kehittäjä-rivi; 123 kiilto + linnan
puhevuoro; 124 nostorivi + puheet; 125 kipsipäät + Ajattelijat; 126 £-muoto + luento loppuun + kertojan tekstilaatikko;
127 linnan valikko/Muurinharja; 128/128b Linssit-karttanappi, V2, galleria, Live).

## Avoimet "todentamatta"-kohdat
- Linnan "kertojan alku katkaisee linnan puheen" (ei komentoa), Pulun chat-vastauksen automaattinen ääni `ui chat <q>`.
- Linnan latauspiikki `raskas kuori Huippu LoadImage` ~370 ms simulaattorissa (JPEG-varapolku, ASTC pois): todennettava laitteella.
- Pariteettiero: ✕ on pehmeä pyöristetty neliö (Ajattelijat/vertailu/galleria), ei ympyrä (127–128).
- Live-nappi näkyy vain kehittäjätilassa kun POLLO-kehittäjäkoodi on asetettu (simulaattorissa ilman koodia ei näy;
  `ui chat realtime-nappi` toimii).
- Aiemmat 1.1 (83)/(88)/(85) -kohdat (kaupungit ilman luentakuvia, Pulun Ihmisen matka -reitti jne.) ennallaan, ks.
  luovutus `viesti-laitetestaaja-luovutus-20261001.md`.

## Protokolla tiivistettynä (muutokset 1.10. luovutukseen)
1. Julkaisija: "LAITE NYT" → boot → md5 vs `proto-3d/lokit/juna-1.1.NNN-<sha>/Matkakirja3D.app` + `kaannos.txt` → `simctl launch
   --console-pty` konsoli → `puhe pois`, `uusi-peli 5 ateena`, `odota-tila Kartta 30`, `aani mykistys 1`, `kehittaja 1`.
2. **Attach ensin ja uudelleen jos toinen rooli detachaa** (detach irrottaa kaikkien paneelit; "Simulator panel opened"
   = oli irti, tapit katoavat hiljaa irrotettuna).
3. **Vaakatilassa sim-työkalun tapit ovat laitteen PYSTYkoordinaatteja:** vaakapiste (x_v,y_v) → tap (402−y_v, x_v)
   (esim. Linssit-nappi vaaka (727,28) → (374,727)). `ui kierto vaaka|pysty`.
4. Lyhyet komennot: `ui linssitnappi [napauta|sulje]` (tila), `ui linna valikko|huoneet|aanet|lahteet|sulje`, `ui julisteet 10`,
   `ui chat realtime-nappi`, `ui chat teema lasi|lasi-avaruus`, `ui chat lukija`, `ui nosto kohde:<id>@<ISO>`, `ui laukku esimerkki`,
   `ui ylapalkki teksti`, `ui valikko [tasot]`, `aja <lat> <lon> <z> 2` (komento.txt), `astro kyyti vertailu …`, `poikki kertoja`.
5. Raportti `docs/raportit/savukierros-11NN-<pvm>.md` + kuvat JPEG `docs/raportit/kuvat/*NN-<pvm>*`, commit+push omaan haaraan
   (Co-Authored-By: Claude Sonnet 5.5), viestit Natiiviseppälle ja Julkaisijalle (nimellä), sitten `simctl terminate` +
   `uninstall` + `shutdown`.
6. Muisti ≥30 % vapaana (memory_pressure), yksi simulaattori kerrallaan, ei Macin oletusulostuloon koskemista.

## Tarkista aina näin uudessa sessiossa
1. `ls /Users/Shared/Claude/proto-3d/lokit/juna-1.1.*` — uusin juna/SHA.
2. `cd /Users/Shared/Claude/Matkakirja-laitetestaaja && git fetch origin && git log --oneline -5`.
3. `xcrun simctl list devices | grep -E "1572C658|3B4CDACB"` — Shutdown kierrosten välissä.
4. Odota Natiiviseppän tarkistuslista + Julkaisijan LAITE NYT.
