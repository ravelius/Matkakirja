# Linssiseppä 2 – luovutus 10.10.2026 ilta (18.0x, PT:n nollaus)

Rooli, työkalut ja simu kuten aiemmin (viesti-linssiseppa2-luovutus-20261010-paiva.md alkuosa). PT = PÄÄTOIMITTAJA (Opus, max),
Julkaisija jakaa käännös- ja simuvuorot (SendMessage "Julkaisija (Opus, high)"). Proto-worktree `wt/proto-linssiseppa2-muisti`,
skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/`, arkit `docs/raportit/kaappaukset/linssiseppa2-177-20261010/`.

## KESKEN (järjestys)
1. **TAIDEMUSEON LATTIAHEIJASTUS v2** (18.2x): ajo 1 (käännös dfd373c04 = 3de6981d1; todistus-lattia-ipad-20261010-1806,
   -puhelin-1810) toimi (kuvaus 1,3–116 ms, 0 virhettä), mutta parketti sumeni mip 4,25:lle → ero lattiassa keskimäärin 1,3/255 eikä aulan
   kuva osunut lattiaan. Korjaus **50071113d** (karheus² · 2 → mip: marmori 1,3, parketti 2,8 / 7; L 1326/1326, unity 0) + skenaariot
   katse lattiaan (aula 0 −18, KG 90 −22, Yövartio 0 −15). Julkaisija antaa KÄÄNNÖS NYT ~18.35 → `museo-lattia/kaanna-ja-aja.zsh kaanna`,
   sitten simu → `kaanna-ja-aja.zsh aja <käännös-SHA>`. Tulos: pari puhelin pysty + iPad vaaka → PT; sitten iPad Pro 13 Release -mittaus.
   SSR vain jos pari vaatii.
2. **ND v6k14 VIETY** (Julkaisija 18.0x: 41 tiedostoa, portti 0, uusin-4 → v6k14). LR jatkaa v5c:llä → sama arkki (arkit-nd5b.py-malli, vuoro-nd5b.sh-malli; tekijärivi The wub CC BY-SA 4.0
   lisättävä käsin mallit.jsoniin; mittaa-julkisivu.py tavoite L 150–160, mittaa-parvis.py lyijy).
3. **PEKING-PARI ILMAKEHÄ PÄÄLLÄ** kun juna 179 käännetty (Natiiviseppä ilmoittaa; junassa ilmakeha-kaikkialla d3885f6d1 +
   peking-vesivari efc88563c): peking3/ktx + VESI peking1/vesi, vuoro-peking3v.sh-malli junan .app:lla, vs Google-kaupunki
   (lokit/linssiseppa2-peking1-pariisi) → PT arvioi oman vesivärikertoimen tarpeen.

## TÄNÄÄN VALMISTA (iltapäivä–ilta)
- Junaan 179 (PT kuittasi, SHA:t Natiivisepälle): ilmakeha-kaikkialla d3885f6d1 (omistaja 16.4x), peking-vesivari efc88563c
  (ämpäri vesi/vari-v1 0dd206f9). PT:n huomio: Prahan etuala viilenee → jos säädät, vain lähietäisyys.
- Kupola: nykyinen jää (PT 16.1x), haara linssiseppa2/cupola3d-koe 503682973 talteen.
- Peking v3 paketti peking3/ktx (oma maa + vesikaivanto + maahelma N/E 400 m), arkit peking-v3-vs-google, peking-sauma-helma,
  peking-v3-vesi-helma400, peking-vesivari.
- Huom: `opas kamera` -komennon katseKorkeus on ELLIPSOIDIkorkeus (Pariisin maa ≈ 79 m); kamera-vapaa 35 m portaalikulma kääntyy
  → portaalit rajataan f40:stä. kuvat-utu.sh: kaksi kaupunkia samassa ajossa voi jäädä aloitusruutuun → yksi kaupunki per ajo.
