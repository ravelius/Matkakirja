# Natiivisepän luovutus 1.10.2026 klo 07.5x (tilinvaihto, Päätoimittajan käsky)

Luovuttaja: Natiiviseppä (Opus 5.5, high, Macin käyttäjä koodaus). Edellinen: -20260930-b.md (käytännöt voimassa, ellei tässä toisin).
- **proto master 23041f6f = BUILD 91** (TF 1.1 (91)).
- **JONON KÄRKI: 1.1 (92) AUKI = juna/b13 b24c0702** (07.52; BUILD 91 -juna a84f649c + siirtoseppa/linna-vesi 894d16a4:
  ympäristön ensilataus — ympäristö odottaa kuoren kevyen tason, kevyt maasto ensin + oma taso taustalla, puhelimessa
  4k-orto; Siirtosepän mittaus maasto 23,1 → 10,8 s, kuori 12,1 → 8,3 s; kuvapari
  proto-3d/lokit/siirtoseppa-ensilataus2-jalkeen/ensilataus-kuvapari.png; testit 0/414/365/526). EI VIELÄ KÄÄNNETTY
  (vahti kääntää ~20 min avauksesta). Seuraavaksi: KÄÄNNETTY → .app talteen proto-3d/lokit/juna-1.1.92-<käännös>/ →
  savuke Laitetestaajalle (linnan avaus: kuori ja järvi kuten 90:ssä, ei poikkeuksia, `poikki vesi`; ympäristö näkyy vasta
  #3755:llä + regressio) → PASS → BUILD 92 (commit-tree, -p 23041f6f -p b24c0702) → SHA Julkaisijalle.
  .app 1.1.91 kansiossa proto-3d/lokit/juna-1.1.91-f42339ca/ (Pelikoodari todentaa sillä).
kunnan sillä).
- **S2-mosaiikki astronautin kameraan (Linssiseppä 2) KUITATTU lisäysversiona** ehdoin: S2-laatat Laattapalvelimen
  kautta (Kartta/Laattapalvelin.cs, localhost-proxy, LRU valimuistiMt 600, temporaryCachePath/laatat), ei Cesiumin
  omaa välimuistia; ei viidettä porttia (LaattaPortit, iOS:n yhteysraja); S2-alikatto 200 Mt samaan Karsi-kierrokseen
  (S2 karsitaan ensin), ei 600:n nostoa; kevyet laitteet maxLevel z9, GPU ~100 Mt; muisti todennetaan iPad 00008103:lla
  ennen junaa; merge-pyyntöön Laattapalvelimen karsintaloki ylilennon jälkeen.
- Odottaa: Linssiseppä 2:n S2 (yllä).

## YÖN 30.9.–1.10. BUILDIT

75 4f839087 · 76 1a878e67 · 77 58270fef · 78 b33344c7 · 79 1b4e6ed0 · 80 5b3040d2 · 81 d3b76604 · 82 7842b513 ·
(83 FAIL: tupla-humina, ei BUILDia) · 84 753dee43 · 85 603dba72 · 86 87a0f968 · 87 b4435d40 · 88 0d7abab9 ·
89 71229df1 · 90 f89c5c79 · 91 23041f6f. Jokaisen savuke docs/raportit/savukierros-11NN-*.md (Laitetestaajan haara
laitetestaaja-savukierros-b13).

## UUDET OPIT JA SÄÄNNÖT

- **Pariteetti (omistaja 30.9. 22.2x):** web/natiivi-eroon perustuva muutos junaan vain omistajan luvalla
  (merge-pyynnössä mainittu), muuten kysy Päätoimittajalta. Muisti: pariteettimuutos-junaan-luvalla.
- **Juna-tauko** /tmp/matkakirja-juna-tauko pysäyttää vahdin ennen "käännös nyt" -päätöstä; jo päättänyt vahti odottaa
  lukkoa ja kääntää silti. Tauolle aina ajastettu poisto (nohup sleep → rm). Käytetty: kevyt tila, odotetut korjaukset.
- **Kärkeen ennen käännöstä:** tarkista lukko (kuka = juna/b13 → alkoi) ja juna.login viimeinen rivi; vahti lukee kärjen
  vasta lukon vapauduttua. Kiireelliselle erälle tauko ensin, sitten merge + testit.
- **Luokitin estää** minulta: toisen prosessin kill (myös odottavan vahdin), käännöskopion reset --hard/clean ja kuolleen
  lukon rm → Päätoimittaja/omistaja tekee. Yksittäisen jäänteen `git clean -f -- <polku>` onnistui.
- **Burst AotLinkerException** (macOS-isännän .bundle) toistui 00.50 (Failed) ja kirjautuu lokiin myös onnistuneissa
  (virheitä 1–2); vahdin uusinta meni läpi. Ei iOS-vika. Vika-loki talteen ennen seuraavaa käännöstä.
- **Monitor tail -F juna.log ei laukea** luotettavasti → wc -l -pollaus 20 s välein.
- **.app-kopiot:** pidä vain uusin + se, jota joku todentaa; kerro polku, jos poistat neuvotun kopion.
- **Levy:** tyokalut/vapauta-levy-natiiviseppa-20260930{,b}.sh (koeajo → --aja). dd-sim/iOS-sim jätetään (inkrementaali).
- **TF:n Asetukset.Kehittaja** = Debug.isDebugBuild simulaattorissa aina tosi → kehittäjätilan piilotukset todennetaan TF:ssä.
