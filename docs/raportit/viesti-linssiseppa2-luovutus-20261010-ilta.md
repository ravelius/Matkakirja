# Linssiseppä 2 – luovutus 10.10.2026 ilta (18.0x, PT:n nollaus)

Rooli, työkalut ja simu kuten aiemmin (viesti-linssiseppa2-luovutus-20261010-paiva.md alkuosa). PT = PÄÄTOIMITTAJA (Opus, max),
Julkaisija jakaa käännös- ja simuvuorot (SendMessage "Julkaisija (Opus, high)"). Proto-worktree `wt/proto-linssiseppa2-muisti`,
skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/`, arkit `docs/raportit/kaappaukset/linssiseppa2-177-20261010/`.

## KESKEN (järjestys)
1. **LATTIAHEIJASTUS SIIRTYI LS1:LLE** (PT 18.2x: LS1:n peilikamera 45e35e9e6 kytketty v2f-varjojen kanssa). Havainnot lähetetty LS1:lle
   (karheus² → mip, katse lattiaan, skenaariot museo-lattia/sk-lattia-*.txt). Oma haara linssiseppa2/museo-lattia 50071113d (kuutio kerran
   per huone, ~0,9 Mt) talteen varaksi, jos peili on iPadilla liian raskas. Käännösvuoro peruttu.
2. **ND v6k14 VIETY** (Julkaisija 18.0x: 41 tiedostoa, portti 0, uusin-4 → v6k14). LR jatkaa v5c:llä → sama arkki (arkit-nd5b.py-malli, vuoro-nd5b.sh-malli; tekijärivi The wub CC BY-SA 4.0
   lisättävä käsin mallit.jsoniin; mittaa-julkisivu.py tavoite L 150–160, mittaa-parvis.py lyijy).
3. **PEKING-PARI ILMAKEHÄ PÄÄLLÄ VALMIS** 18.33 (junan 179 .app lokit/juna-1.1.179-75fcc2b1, kuvat lokit/linssiseppa2-peking179):
   arkki kaappaukset/linssiseppa2-179-20261010/peking-179-ilmakeha.jpg → PT. Vallihauta 27/47/60 (ennen 17/38/35, oikea 54/80/68):
   ilmakehä sinistää. PT päättää oman vesivärikertoimen tarpeesta.

4. **SIMUKETJU ODOTTAA JULKAISIJAN JATKA-RIVIÄ** (Siirtosepän KIIRE 20.10): `skriptit-20261009/jatka-nd-maa.zsh` (perl setsid) =
   ND v5d -pari (nd3/v6k16 = v6k14 + LR:n v5d, KTX2, portti 0; aja-nd5d.zsh, arkit-nd5d.py → nd-v5d-edesta-ylha.jpg) ja sitten
   pyörimislinssi k2 käännöksellä def917449 (= linssiseppa2/maa-ei-pyori 8cb2928fe: PT 20.0x sedimentti, korkokuva 35×, turkoosi,
   heijastus pois, NUI:n yläpalkki a9a528145; sk-maa-*: 100/50/0/150/200 % + Eurooppa 0 % + Tyynimeri; maa-ei-pyori/arkki-maa.py
   lisää 200 + Eurooppa-rivit) → molemmat PT:lle. Lopuksi "SIMU VAPAA" Julkaisijalle.
5. **PEKING KIERROS 3** (PT 20.1x, ND:n ja pyörimisen jälkeen): puut ×1,4 + kaikki 67 000 (kaupunki-puut **c8dde7a17**, 39 Mt GPU), LR:n
   v5 (LOD2-katot + kultakatto R ×0,88 G ×0,85; syy punaiseen: LOD2:sta puuttuvat katot, mittaa-katot-lod.py) → paketoi kuten
   paketoi-peking4.zsh (peking5) + vienti-v6k15.py-malli → käännös c8dde7a17 → aja-pekingpuut.zsh (OMAT → peking5) → arkki → PT.
   Valmista jo: v6k15 (Peking v4) viety, osoitin ennallaan; puudatan vienti _valmiit/puut-vienti-20261010b odottaa PT:n kuittausta.

## TÄNÄÄN VALMISTA (iltapäivä–ilta)
- Junaan 179 (PT kuittasi, SHA:t Natiivisepälle): ilmakeha-kaikkialla d3885f6d1 (omistaja 16.4x), peking-vesivari efc88563c
  (ämpäri vesi/vari-v1 0dd206f9). PT:n huomio: Prahan etuala viilenee → jos säädät, vain lähietäisyys.
- Kupola: nykyinen jää (PT 16.1x), haara linssiseppa2/cupola3d-koe 503682973 talteen.
- Peking v3 paketti peking3/ktx (oma maa + vesikaivanto + maahelma N/E 400 m), arkit peking-v3-vs-google, peking-sauma-helma,
  peking-v3-vesi-helma400, peking-vesivari.
- Huom: `opas kamera` -komennon katseKorkeus on ELLIPSOIDIkorkeus (Pariisin maa ≈ 79 m); kamera-vapaa 35 m portaalikulma kääntyy
  → portaalit rajataan f40:stä. kuvat-utu.sh: kaksi kaupunkia samassa ajossa voi jäädä aloitusruutuun → yksi kaupunki per ajo.
