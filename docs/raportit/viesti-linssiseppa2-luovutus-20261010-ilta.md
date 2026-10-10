# Linssiseppä 2 – luovutus 10.10.2026 ilta (18.0x, PT:n nollaus)

Rooli, työkalut ja simu kuten aiemmin (viesti-linssiseppa2-luovutus-20261010-paiva.md alkuosa). PT = PÄÄTOIMITTAJA (Opus, max),
Julkaisija jakaa käännös- ja simuvuorot (SendMessage "Julkaisija (Opus, high)"). Proto-worktree `wt/proto-linssiseppa2-muisti`,
skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/`, arkit `docs/raportit/kaappaukset/linssiseppa2-177-20261010/`.

## KESKEN (järjestys)
1. **TAIDEMUSEON LATTIAHEIJASTUS** (PT 17.4x, omistaja kysyi; LS1:n suunnitelman kohta 2; LS1 omistaa museon, LR leipoo varjot):
   haara `linssiseppa2/museo-lattia` **3de6981d1** = museo-kombo-178 691969c66 + Ydin/Museo/MuseoLattia.cs (laatikko, projektio,
   Fresnel, mip; testit MuseoLattiaTestit, L 1326/1326) + Unity/MuseoLattiaHeijastus.cs (kuutio 128² ARGBHalf, RenderToCubemap
   osaan tultaessa 0,6 s ja 4 s, sali-GLB:n vaihtuessa uudelleen; QA `linssi museo heijastus 0|1`) + MuseoValaistu.shader
   (_Heijastus > 0 ja n.y > 0,7: laatikkoprojektio, mip = karheus · 1,35, Fresnel F0 0,04) + MuseoRakennus (_Heijastus:
   marmori 1, parketti 0,45) + MuseoSovitin (kytkentä). unity 0. Käännös **käynnistetty 17.5x** (proto-kaanna.sh 3de6981d1,
   PROTO_APP_KOPIO=lokit/linssiseppa2-app-museo-lattia; tulos lokit/kaannospalvelu/*3de6981d1.log) — tarkista KÄÄNNETTY ja ilmoita
   Julkaisijalle "lukko vapaa". Simu jonossa ~18.25 (Julkaisija). Ajo: `_tyo/linssiseppa2/museo-lattia/vuoro-lattia.zsh <SHA> [iPhone-UDID]`
   (LS1:n todistusajo, skenaariot sk-lattia-ipad/-puhelin: aula marmori, Kunniagalleria parketti, Yövartio; heijastus 0 | 1).
   iPhone-simu: oma T7:lle (simusarja.sh) tai LS1:n D0D2CD1E vain LS1:n luvalla. Varjostinta ei ole vielä nähty: jos RenderToCubemap
   ei toimi URP:ssä (loki "lattiaheijastus … EI ONNISTUNUT"), vaihda 6 kasvoa Camera.Render + CopyTexture. Tulos: pari puhelin pysty
   + iPad vaaka → PT; sitten iPad Pro 13 Release -mittaus (muisti + fps) Natiivisepän kautta. SSR vain jos pari vaatii.
2. **ND v6k14 VIENTI** (omistaja 17.4x hyväksyi v5b:n): pyydetty Julkaisijalta 18.0x (nd3/v6k14, LAHTEET.md tehty). Varmista
   uusin-4 → v6k14. LR jatkaa v5c:llä → sama arkki (arkit-nd5b.py-malli, vuoro-nd5b.sh-malli; tekijärivi The wub CC BY-SA 4.0
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
