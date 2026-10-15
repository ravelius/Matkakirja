# Natiivi-UI: lisäluovutus 15.10.2026 klo 21.17 (Postivahti: nollaus)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. LUE ENSIN tämä, sitten viesti-natiivi-ui-luovutus-20261015-ilta6.md (ddbfe5d6b).
Viestit send_messagella id:llä; PT:lle ≤ 3 riviä. Proto-worktreet ja remote natiivi-backup kuten ilta6:ssa.

## KÄRKI: ISS-kohdevalikko (omistaja 21.03 + 21.07, PT)
- Tehty natiivi-ui/nimet-196: 493dc6243 tumma teema (tk-teema-tumma) + lasi Lasipohja.Kiinnita(paneeli, null, Tyylikirja.Harmaa.Pinta),
  kuvaruutu: kuva täyttää ruudun 3:2 (GeometryChanged → korkeus), nimi alareunassa kaupunkikortin LIUSKA-pohjalla
  (mk-liuska__nimivarjo + mk-liuska__kuvanimi, Koko.Leipa), Asettele uusii ennen kerroksen asettumista + maxWidth.
  0e26d1dee: "yöllä" PALAUTETTU (omistaja 21.07 peruu kohdan 3). Pushattu natiivi-backup.
- Kuvapari PT:lle lähetetty: proto-3d/lokit/kaannospalvelu/20261015-211133-testit-tuntematon-linna-kuvat/ (493dc6243: Bagdad ilman "yöllä").
- AVOIN: omistajan kuvan viat (docs/raportit/kaappaukset/omistaja-20261015/iss-kohdevalikko-iphone-2057.png Fable-checkoutissa):
  oikea reuna leikkautuu ja "/c"-pala (ruskea laatikko kermatekstillä paneelin PÄÄLLÄ, ei valikon osa; ilmoitusta ei ollut). Editorin
  asettelutesti EI toista vikoja. LIVE omistajan kuvassa = vanha build (nimet-196:ssa IssParasHetki.Kaytossa = true piilottaa LIVEn).
- SIMUAJO: Julkaisija loi natiivi-ui-iPhone16 = 123B4B25-36B7-4A76-B677-905621CD8F5A (393 pt). Käännös 0e26d1dee jonossa L2:lla:
  proto-3d/_tyo/natiivi-ui/kohdevalikko-196-app/kaannos.out (viimeinen rivi KÄÄNNETTY … tai VIKA; jos puuttuu eikä pgrep -fl proto-kaanna
  näytä 0e26d1dee:tä, aja uudelleen PROTO_LINJA=2 PROTO_APP_KOPIO=<kansio> nice -n 15 zsh proto-3d/tyokalut/proto-kaanna.sh 0e26d1dee).
  Kun KÄÄNNETTY → Julkaisijalle "käännös valmis" → odota SIMULAATTORI NYT 123B4B25 → `zsh /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ajo-kohdevalikko-iphone-196.zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kohdevalikko-196-app`
  (skenaario sk-kohdevalikko-iphone-196.txt: P0 Cupola, P1 eka avaus, P2 NIMET). Kuvat PT:lle; jos vika toistuu, korjaa ja uusi kuva.

## Isoisän uni -video (ilta6:n 1. tehtävä)
- Käännös 2cd6b6428 oli pudonnut jonosta (ei prosessia) → käynnistetty uudelleen 21.14 samaan kansioon isoisan-uni-196-app/kaannos.out.
  Muuten ilta6:n ohje ennallaan (SIMU F7513985).

## Muuta tehty
- natiivi-ui/aloitus-195: KS:n 5 Codex-vihjekuvaa mergetty (8027364e0) + LAHDE.txt (e51b351d5), pushattu. Kaikki 9 vihjettä kuvalla.
- Linssiseppä: kohokohtien korttikuvat valmiit _valmiit/iss-kohokohdat-kortit-20261015/ (revontulet, kiinan-muuri); odottaa ämpäriä +
  SS:n kohokohdat.json "kuva"-kenttiä → sitten ilta6:n avoin 2 (merge nimet-196:een, asettelukuva).
- 21.2x Linssiseppä: korttikuvat ÄMPÄRISSÄ (200 OK) https://media.matkakirja.app/kuvat/iss/kohokohta-revontulet.jpg ja
  …/kohokohta-kiinan-muuri.jpg → vie kohokohdat.json "kuva"-kenttiin (Assets/Matkakirja/Linssit/Resources/IssParasHetki/kohokohdat.json,
  data on Siirtosepän: tarkista ensin, tekeekö SS sen omaan haaraansa) → asettelukuva "iss kohdevalikko kohokohdat" → PT.
