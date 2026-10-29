# Karttaseppä: luovutus 29.10.2026 klo 15.35

Seuraava Karttaseppä jatkaa tästä. Muisti: karttaseppa-tila-20261010-ilta.md (UUSIN). Syy: konteksti pitkä.
Edellinen luovutus: viesti-karttaseppa-luovutus-20261029-1357.md (PR 5591). Taustaajoja ei ole; simu DA0AAEEA ja L2 vapautettu JU:lle.

## Valmista tässä vuorossa
- SÄVYTYS 3 OLETUKSEKSI (omistaja 14.03 "Kyllä"): savytys-214 ae45e5de9 (RakennusTila 2, ElavaTyyliVersio e13) → junassa 214 (NS 78085850d).
- JOKINIMET (PT): joet-214 b37689c73 → junassa 214 (NS 1121a8866). NimiLadonta.Ehdokas.Ryhma/RyhmaVali: sama joki enintään
  ~1 per näytön kolmannes (Nimikerros.JokiValiOsuus 1/3), jokinimi vain kokonaan ruudulla. Parit _tyo/karttaseppa/joet-214/pt/ (Seine 6 → 2).
- LIGURIANMERI (PT): web PR 5597 mainissa (tools/vie-aluenimet.mjs SIIRTO_ENINTAAN_M 250 km; Ligurianmeri pois z4:ltä, oli 278 km
  Sardinian länsipuolella; Egeanmeri 217 km ja Lioninlahti 200 km ovat omilla merillään ja jäivät), paketti v904 ämpärissä (JU).
  Natiivin piilotus pois merinimet-214 ed103c2be: PT kuittasi, viety NS:lle junaan 214. Parit _tyo/karttaseppa/merinimet-214/pt/.
- MERKITTÄVYYS: jo TF 213:ssa (merkittavat-213 f5ea99f7f, omistaja 21.40 "Kelpaa", loki 3134; 18.42 kohdenimet vasta striimikartassa,
  loki 3122). Työlistan rivi "ei aloitettu" oli vanhentunut; PT:lle kerrottu. Ei tehdä uudelleen ilman uutta omistajan sanaa.

## Odottaa
- SAUMA 8,5: siirtyma-sse-214 5767441da (siirtymäalueen oletus SSE 8 → 5, kerroin 4). Syy: SSE 8 karkea ruudun alaosassa, ei latausaika
  (pallo lepo 100 % myös 100 s). PT kuittasi, KK:n kortilla omistajalle. Junaan vasta omistajan OK + pienen iPadin mittaus.
  Parit _tyo/karttaseppa/savytys-214/pt/sauma-taso8-5-sse8-vs-sse5.jpg + -alaosa-2x.jpg (yksi pieni vaalea pala rajaviivan kulmassa jää).
- Pieni iPad saa version vasta, kun sävytys, saumat ja merkittävyys ovat valmiit (omistaja 13.22).

## Seuraavaksi
1. ALPPIEN SAUMA TORINON YLLÄ: tasolla ~6 Torinon eteläpuolella (Monferrato/Roero) rinnevarjostus katkeaa suoraan pystyreunaan
   (sileä länsipuoli, kohokuvioinen itäpuoli) = poltetun pohjan palojen ero, ei Cesium-valinta. Kuvat
   _tyo/karttaseppa/merinimet-214/pt/alppien-sauma-torino-M2.png + -rajaus.jpg (rajauksessa x ≈ 380 px). Selvitä, mikä pala
   ja mikä poltto (tasangot-214-delta vs perus?), sitten korjaus ja pari PT:lle.
2. Salamasymboli Pariisissa pyramidin vieressä (väistö ei laukea).
3. Elävien nimien kaksoisrivit (sama nimi ~10 riviä): kuvaus epäselvä, jokinimien osalta harvennus hoiti näkyvän puolen; kysy PT:ltä,
   onko jotain jäljellä.

## Työkalut
- Kartta-testit: `sh ./kaanna.sh` (EI zsh: -r-lista hajoaa). PIL: /opt/homebrew/bin/python3 -I.
- Ajot: _tyo/karttaseppa/<erä>/ajo.zsh <app-kansio> <era> (skenaario sk-*.txt). Käännös: PROTO_LINJA=2 PROTO_APP_KOPIO=<kansio>
  zsh proto-3d/tyokalut/proto-kaanna.sh <haara> DA0AAEEA-B29A-46EE-BD82-DA314CF21BF8 (vuoro JU:lta; asentaa simuun → ennen-ajo ensin).
- Proto-worktree: git -C proto-3d/Matkakirja-proto worktree add ../../wt/proto-karttaseppa-<aihe> -b karttaseppa/<aihe> <juna-214-peili>;
  peili: git push natiivi-backup HEAD:refs/heads/peili/proto/karttaseppa/<aihe>.
- Maastodiagnoosi: komento `pallo lepo` (latausaste), `maasto siirtyma tila|<sse>`.
