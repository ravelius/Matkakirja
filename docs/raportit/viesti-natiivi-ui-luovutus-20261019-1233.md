# Natiivi-UI: luovutus 19.10.2026 klo 12.33 (Postivahti: kova raja 36 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -1110:n (sen "Opit" yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md
(PT local_8d8ebf72-…, JU local_24e63224-…, Valoseppä local_e675f86d-…). Simu VAIN JU:n SIMU NYT -viestistä; ajon jälkeen appit pois +
simu kiinni + SIMU VAPAA. Udidit: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962.

## KÄYNNISSÄ
- **JU kääntää 56d2b0348** (natiivi-ui/lenna-itse-204, pyydetty 12.32) → _tyo/julkaisija/juna204-lenna-itse-app (sama kansio; edellinen
  sisältö = a8dea4e9 / 2fd904f95). Kun SIMU NYT tulee, aja wt/proto-natiivi-ui-lenna-itse-204:stä (--sha = .appin Data/Raw/kaannos.txt):
  `zsh tyokalut/todistusajo/todistusajo.sh --era kippi-napit-204-iphone --udid <iPhone> --app <app> --sha <kaannos.txt> --haara 56d2b0348
  --skenaario tyokalut/todistusajo/skenaariot/kippi-lenna-itse.txt --nyt` ja iPadille sama skenaario ilman `ui kierto pysty` -riviä
  (sed → scratchpad) `--laite ipad`. Tarkista kc-kysy/kd-kysy-vieritetty: 4 kysymystä näkyvissä, alin kurkistaa häivyttyen, vierityksen
  jälkeen ylin häivyttyy; kuvakortti EI listan päällä; lokissa "opas: kippi kysymykset N, näkyvissä 4, korkeus …". Sitten kuva-arkit PT:lle
  (≤ 3 riviä) → PT kuittaa junaan 204 (merge-pyyntö NS:lle).

## KIPIN NAPIT (omistaja 11.40 + 11.43 + 11.45 PT:n kautta, kaikkiin kippeihin) – haara natiivi-ui/lenna-itse-204
wt/proto-natiivi-ui-lenna-itse-204, juna-204:n (866b2a2c7) päällä, kärki **56d2b0348**. Logiikka OpasValikko.Kippi.cs (partial):
- Lento: vain ⏸ (+☰). Tauko: ⏸ → ▶, rivi **Lennä itse | ‹ ■ ▶ › | Kysy** (‹ edellinen kohde KierrosKohteeseen, piilossa 1. kohteella;
  › seuraava; ■ = Poistu linssistä vahvistuksella; Lennä itse ilman kuvaketta). Sivuryhmät yhtä leveiksi kun mahtuu (iPhonella ei
  aivan: keskiryhmä ~10 pt oikealla).
- Kysy tauolla: ‹ mikki näppäimistö vasemmalla, kysymykset irrallisina siruina oikealla (ScrollView "KysyLista", 4 + kurkistus,
  häivytys reunakaistassa), napautus → OpasSovitin.Kysy (PT: "Pulu vastaa", ok).
- Vapaa lento: ohjaimet + ‹ Kysy; ‹ → VAHVISTUS "Lopetetaanko vapaa lento?" Palaa esittelykierrokselle / Lopeta linssi (kierroksen
  päätyttyä "Jatka vapaata lentoa"). Vapaan Kysy: tähtäin + ‹ Mikä tämä on? (MikaTamaNapautaRuutu tähtäimen kohdalta) mikki näppäimistö.
- Liiku ☰:n rivinä. Testi `ui opasvalikko kippi lento|tauko|kysy|vapaa|vapaakysy|auto`. PT hyväksyi omat ratkaisut 12.0x.
- Simu 12.21 iPhone + 12.26 iPad (a8dea4e9): kaikki vaiheet OK, 0 poikkeusta; viat (kaikki 6 kysymystä näkyvissä, kuvakortti
  listan päällä) korjattu 56d2b0348:ssa. Kuva-arkit lokit/todistus-kippi-napit-204-{iphone-…-1221,ipad-…-1226}/kuva-arkki.png.
- Avoin PT:llä: SK:n 8 kysymystä/kohde (main docs/kohtaukset/pallokierros/kysy-*-20261019.json) vaativat workerin /opas/kysymykset (PK)
  + LS1:n rajan 5 → 8 (OpasSovitin.KysyKysymykset). UI ei vaadi muutosta. PT ei vielä vastannut kenelle.

## SEURAAVA ERÄ (PT 12.3x, omistajan pyyntö 12.11, junaan 204)
X-SULKU-POHJA: Pulun kysymyslaatikon X (puoliksi laatikon kulman/reunan ulkopuolella) malliksi KAIKKIIN suljettaviin kortteihin, myös
nostoihin. Tee pohjaan (tyylikirja/USS, UI-POHJAT), sovi nostokortin kytkentä Valosepän (local_e675f86d) kanssa – hän tekee nostokortin
muut korjaukset saman pyynnön kohdista 1–3, 5–9. Kuvapari ennen/jälkeen iPhone + iPad → PT. Koko teksti:
/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/omistajan-pyynnot-20261019-1211.md. Ei aloitettu (aloita: grep Pulun
kysymyslaatikon sulku Assets/Matkakirja/UI/Pulu, sitten Kortti-pohja ja nostokortin ✕).

## Muuta
- C1e 945577013 (aloituslogo) PT kuittasi junaan 204 11.3x; B1 858ee3470 ja B2 98245be43 jo NS:n rungossa.
- Puolikaarikuva (lokit/kippi-puolikaari-kuva-20261019) peruttu, ei KK:lle.
- Worktreet: logo-feidaus-204, iss-otsikot-204, iss-ympyra-204, lenna-itse-204 (poista mergen jälkeen `git worktree remove`, proto-repo).

## Opit
- Kipin todistusajossa `ui kehysnapit 0` heti alussa: himmeät (0,2) kehysnapit eivät näy ui-puussa → tap-teksti ei löydä niitä.
- Pariisin kaupunkitilan 1. kohde saapuu vasta ~150 s kohdalla (avaus 19 s + opastus 13 s + lento): `oleta 240 opas: saapui`.
- ScrollViewin korkeus sirujen todellisista korkeuksista (rivitys vaihtelee); 1. rivin arvio ei leikannut mitään.
- Unityn .meta uudelle .cs:lle samassa muodossa kuin naapurit (tässä repossa vain fileFormatVersion + guid).
