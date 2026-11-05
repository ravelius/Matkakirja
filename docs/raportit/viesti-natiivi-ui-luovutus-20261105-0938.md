# Natiivi-UI: luovutus 5.11.2026 klo 09.38 (konteksti noin 26 %; PT 09.38: ohjelma käynnistetään uudelleen)

Edellinen: viesti-natiivi-ui-luovutus-20261104-2057.md (haara natiivi-ui/luovutus-20261104-2057; KK:n sanat sellaisinaan sen lisäyksissä 1 ja 2). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (ei origin-etärepoa, ei pushia).

## Tila: kaksi korjausta commitoitu, kumpaakaan ei ole ajettu simulla
Simuvuoro on pyydetty JU:lta 5.11. aamulla (viesti oli jonossa, vastausta ei tullut). Pyydä uudestaan käynnistyksen jälkeen; vanha pyyntö on voinut kadota.

**Lippu `840d8abd3`** (proto `natiivi-ui/kartan-kaanto-219`, wt/proto-natiivi-ui-kaanto), Lippukulma 12/12:
1. VÄRI: Lippu3D, `_KiinteaValo` striimikartalla: valo ja katse kankaan omassa avaruudessa, kiillon potenssi 80. Väri ei riipu kartan suunnasta.
2. KOKO: `Lippukulma.LippuKorkeusPt` = 120 × min(1, lyhyempi sivu / 1032); iPhone 47 pt. `Lipputanko.KorkeusNytPt` vain striimikartalla.
3. NIMI: EI korjausta; KK pyysi tarkistamaan ensin, riittääkö kohta 2. Jos tanko tai kangas osuu kohdekaupungin nimeen tai nappulaan: lisää LaskeLippukulmaan ehto, joka pitää jalan vähintään lipun korkeus + nimen vara päässä pelaajan kaupungista.
4. MERKIT: 3D-merkit voittivat kankaan, koska kirjoittavat syvyyttä; kangas `_ZTest` Always striimikartalla, jono: varjo → kangas → tanko. Kuumailmapallot ovat käyttöliittymäkerroksessa ja jäävät kankaan päälle (kerro KK:lle). Kaupunkipisteiden piirtotapaa ei varmistettu: katso kuvista, peittyvätkö. Jos eivät ja korjaus on iso, kerro äläkä tee (KK:n ohje).
5. LAITTEEN KÄÄNTÖ: `Kartuscha.LipunYmpyrat`: ympyrä kumpaakin asentoa kohden, km pidemmän sivun mukaan (`Lippukulma.KiertoSadeKm`, `PalloKierto.SaapumisNakymaRuudulle`).

Ajo: `proto-3d/lokit/nui-lippu-840d8abd3-20261105/ajo.zsh ipad` (kääntää, sisältää kaanto-FRA ja kaanto-NOR: vaaka → pysty → vaaka samassa käynnistyksessä) ja `… iphone`, simu-lukko.sh kaari, PROTO_LINJA JU:lta. Skripti käyttää aikaleima218.py:tä ja kaari.py:tä kansiosta nui-lippu-30193b615-20261104. Ei ole ajettu kertaakaan: tarkista ensimmäisestä ajosta, että kääntöosa ja `aani mykistys` menevät läpi.
Tulos: kuvat täysikokoisina itse, sitten arkit KK:lle (kohdat 1–5 sanoista). Täysikoko ruudun keskellä (poikkeama 4.42:sta) on KK:n kysymys omistajalle korjattujen kuvien kanssa. Lippu ei omistajalle ennen KK:n sanaa, eikä mergeä (kääntökokeen päällä, ebc8ce01e "koe, ei junaan").

**c5 `0466e8495`** (proto `natiivi-ui/nousu-pieni-219`, wt/proto-natiivi-ui-nousu-pieni; dbbc2bbea:n päällä): `TraileriLiike.NousuLepo` pysyy sivun turva-alueella (UiRuutu.Turva); pystyssä ja tabletilla sivuilla ei ole turvaväliä, joten paikat pysyvät. Muutokselle ei ole yksikkötestiä.
Ajo: `proto-3d/lokit/nui-nousu-c5-0466e8495-20261105/ajo.zsh` (iPhone vaaka, käännös mukana), tuottaa iphone-vaaka-c5.png. Katso, että reuna on saarekkeen ulkopuolella ja että logissa koko on yhä 316×237. KK: yksi simukuva riittää, kuvaa ei tarvitse tuoda KK:lle. Sen jälkeen merge-pyyntö PT:lle.

## SEURAAJAN JONO
1. Simuvuoro JU:lta (lippu noin 45 min, c5 noin 15 min), ajot, tulos ylempänä.
2. KS odottaa: ND:n iPad-haara ilman lippua, kunnes lippu on hyväksytty.
3. Vanhat: 13.56-luovutuksen kohdat 4 ja 5 (haara natiivi-ui/luovutus-20261104-1356).

## Huomiot
- Ajojen app-kopiot ja videot poistetaan omista ajokansioista kuvien katsomisen jälkeen.
- tarkista.sh päivittää tyylikirjan (3 tiedostoa): `git restore` ne. Pohjavahti ennen merge-pyyntöä.
- Scratchpadit siivottu 5.11. (72 kansiota); skriptit T7:llä koodaus/natiivi-ui-scratchpadit-20261105.tgz; rivi PT:llä.
- `.claude/settings.local.json.ennen-kevennysta` on jäljittämätön tiedosto kotikansiossa; ei omaa eikä commitoitu.
