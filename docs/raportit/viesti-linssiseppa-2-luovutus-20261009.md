# Linssiseppä 2 – luovutus 9.10.2026 klo 11.3x (kontekstin nollaus, PT)

Rooli: Linssiseppä 2 (Opus, high). Aiempi pitkä historia: `docs/raportit/viesti-linssiseppa2-luovutus-20261005.md` (TILA-osiot).
Proto: `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen git). Worktreet `/Users/Shared/Claude/wt/proto-linssiseppa2-*`.
Testit: `Linssit-testit/kaanna.sh`, `tyokalut/tarkista.sh` (virheitä 0). Käännös vain Julkaisijan KÄÄNNÖS NYT:llä
(`PROTO_APP_KOPIO=… tyokalut/proto-kaanna.sh brA+brB A26BC7D0…`), simu vain SIMULAATTORI NYT:llä, "simu vapaa" heti perään.

## TILA 14.3x
- Juna 173 kuitattu ja Natiivisepällä: pbr-173 86bd795f1 (korvaa 2f641e53c; OmaMalli PBR + VALO KAUPUNGIN AURINGOSTA _IlmAurinko,
  koska URP:n päävalo = kartan kameraa seuraava aurinko → ND harmaa) ja talvi-173 b64cb3b75. 1209/1209.
- PT palautti ND v6 -kuvat: LR korjaa puiston latvuskuvat (oma nurmi tai tiheät puut), sävyt (kalkkikivi ~195/182/158, lyijy ~100/105/112,
  myös prefektuuri) sekä säleaukot ja lasimaalaukset. KL v2b (leikkaus 84 p.) viety → vienti27.
- SEURAAVA: kun LR ilmoittaa → uusi vienti (proto-päächeckout tai pbr-worktree, omat_mallit_tileset.py) → Julkaisijalta KÄÄNNÖS
  (scratchpad kaanna-pbr2.sh → app 173pbr2) + SIMU (kuvat-pbr2.sh, päivitä VIENTI) → ND 3 + KL 2 merkittyinä (merkitse.py) PT:lle.

## TILA 14.1x
- Juna 172: osoitin uusin-2 → v6b (v6 ilman Vasaa, ämpärissä 13.28, URLit 37/37) julkaisussa. v8 ämpärissä, ei käytössä.
- JUNAAN 173 valmiina (SHA:t Natiivisepälle kun 173 avautuu): linssiseppa2/pbr-173 2f641e53c (OmaMalli normal/MR/AO + työkalun
  instanssilaatikko; simu 4ae2d581f ok) ja linssiseppa2/talvi-173 b64cb3b75 (talvi/v1 ISS:iin, talvella S2 vain Euroopassa).
  Worktreet wt/proto-linssiseppa2-pbr ja -talvi.
- Omistajan kuvat: ND v6 valmiit lokit/linssiseppa2-omistaja3-172c/omistajalle/ (PT:llä). KL v2 HYLÄTTY: Googlen telineseinä
  kaakkoissiiven läpi (leikkaus liian tiukka) → LR korjaa → kuvaa KL lähi+yleis (omistaja3-tukholma.txt, kuvat-omistaja.sh, VIENTI uusi).
- Putki: sijainnit.json = ND, KL v2 -leikkaus, prefektuuri, EI Vasaa (varmuudet sijainnit-ennen-*.json). Uusin vienti26.
  v9 (v8 + ND v6 + KL v2 + prefektuuri, ilman Vasaa) vasta PT:n luvalla omistajan hyväksynnän jälkeen.

## TILA 13.3x (iltapäivä)
- omavalo-172 ja laivat-171 ovat junassa 172 (Natiivisepän juna-172 sisältää ne). Tarvearvio on PR #4283 (worktree wt/linssiseppa2-tarvearvio, poisto mergen jälkeen).
- Omistajan kuvat: lokit/linssiseppa2-omistaja2-20261009/omistajalle/ (ND v5c + prefektuuri v1, KL v1.8; app 172c = 3d42614c) ovat PT:llä.
- PT 13.4x: junan 172 mukana osoitin EI vaihdu (uusin-2 pysyy v6:ssa, v8 ämpärissä); vaihto vain PT:n erillisellä päätöksellä.
- Kuvauusinta odottaa LR:n KL-korjausta: scratchpad omistaja3.sh (VIENTI=vientiN), ND lähi + ND 150 m (länsijulkisivu) + ND yleis + KL lähi + KL yleis.
- SEURAAVA: omat mallit v9 = v8 + ND v5c + KL v1.8 + prefektuuri v1, ILMAN vasamuseet (PT: Googlen Vasa parempi). Tehdään VASTA PT:n luvalla
  (ND/KL-tarkistus kesken). Putki: sijainnit.json sisältää prefektuurin (varmuus sijainnit-ennen-prefektuuri.json); työkalu ajetaan proto-päächeckoutista
  (korkeus-worktree poistettu): python3 -I tyokalut/omat_mallit_tileset.py <putki> <putki>/vientiN. Uusin vienti24 (vielä Vasan kanssa).
- Skriptit: scratchpad d1e2a55c (kuvat-omistaja.sh, omistaja2.sh, merkitse.py). Kamera "opas kamera lat lon dist kallistus suuntima katse":
  katse = korkeus ELLIPSOIDISTA (Pariisi maa ~75–180 m, Tukholma ~30–80 m); kaupunki kerrallaan tuoreella asennuksella (toinen kaupunki jäi aloitusvalikkoon).

## TILA 12.2x: omavalo-172 51799391e (juna-172 yhdistetty) + laivat-171 657676845 Natiivisepällä, PT kuittasi 172:een; 172b-kuvat peruttu (PT: ei still-sarjoja)

## OMISTAJAN LINJA: kaikki suunniteltu → yksi iso JUNA 172 (julkaistaan kun valmis)

### Lähetetty Natiivisepälle / kuitattu
| Haara | SHA | Sisältö | Tila |
|---|---|---|---|
| linssiseppa2/muistihata-171 | 9e15ec414 + 7f1a0c6f2 | Muistihätä ilman RecreateTilesetiä (karkea valinta, suspendUpdate tauolla) + lyhyt jatkuva vana | TF 171 julki |
| linssiseppa2/ymparistovalo-171 | b4a393994 | Kaupungin Trilight-ympäristövalo | kuitattu (rungossa) |
| linssiseppa2/mikseri-173 | 2996980aa (ddbee4e70 → 807b14e4e → 8c516911f → 2996980aa) | ISS-äänet mikseriin 8/8 (natiivi-ui/mikseri-173 500126589:n päällä); NUI:n katselmointikorjaus | PT kuittasi 172:een; NUI kuittasi 2996980aa |
| (juna 170) laivat-170 | ea60457f9, 811d26cf8 ym. | yötaivas, Tukholman yö | junassa 170 |

### KESKEN junaan 172 (ei vielä SHA:ta Natiivisepälle; kuvat ensin)
| Haara | Kärki | Sisältö | Mitä puuttuu |
|---|---|---|---|
| linssiseppa2/laivat-171 | b8da55364 (+657676845 vana) | Pariisin jokilaiva (bateau-mouche) ja kiertoajelu tarkkoina (TarkatVeneet) | simukuva: laivat eivät osuneet kuviin → uusi laaja kulma (aja-172b) |
| linssiseppa2/omavalo-172 | c5d86a7e2 (sis. kaukomaa-171b) | OmaMalli-varjostin omille malleille (aurinko+SH+varjot, ilma, ilta: julkisivuvalo + lasien hehku ×5, alfaleikkaus kaksipuolisena); kaukomaa: aluskerros > 1200 m (de07812c1, myös PidaMaskista), yön kaukoutu korkeuden mukaan (c783cc796) | kuvaparit ND v5 / KL v1.7 päivä-ilta omavalo 0/1; aluskerroksen loki 12 km:ssä; yö 12 km |
| linssiseppa2/sade-171 | ad5b874b3 | Sadepilvet, Salama-API, yöpilvet näyttöarvona | LS1 yhdisti kierros-170:een (3fdf75648); konflikti muistihata-171:n kanssa vain testitiedostossa |
| Seinen vaalea läikkä (Pont Saint-Michel) | – | SELVITETTY 9.10. 12.2x kuvista lokit/linssiseppa2-seine-laikka v0/v1: läikkä on Pariisin poliisiprefektuurin kortteli (Quai du Marché Neuf – Rue de la Cité – Bd du Palais – Rue de Lutèce), jonka Googlen 3D-laatat antavat litteänä ja sumennettuna (arkaluonteinen kohde). Se ei johdu meidän vedestä, ilmakehästä tai valosta | ei koodikorjausta; vaihtoehto on LR:n kevyt korttelimalli + leikkaus (PT päättää) |

### SEURAAVA SIMUVUORO (Julkaisijan jonossa ~11.50)
`scratchpad/kaanna-ja-kuvaa-172b.sh` = KÄÄNNÖS juna-171 + omavalo-172 + laivat-171 → `lokit/linssiseppa2-app-172b`, sitten
`aja-172b.sh` (vienti21 Documentsiin): kaukomaa Pariisi 12 km päivä/yö, Seine i1/i0 (ilmakeha), Pariisin laivat 700 m,
ND-valo c0/c1/y1, KL-valo c0/c1/y1. (Scratchpad katoaa nollauksessa → skriptit pitää kirjoittaa uudelleen; malli: kaupunki-vertailu.sh
JALKEEN="opas kamera lat lon dist kallistus suuntima katse" ASENNETTU=1 KAUPUNGIT=…; ennen kuvia lämmityskäynnistys, koska
ensimmäinen käynnistys asennuksen jälkeen epäonnistuu.)
Kuvien jälkeen: SHA:t (laivat-171, omavalo-172) Natiivisepälle, kuvat PT:lle ja LR:lle, lopuksi rivi PT:lle "valmis 172:een".

## Omat mallit (ämpäri)
- v7 (KL v1.6 + ND v4) ämpärissä 11.02. v8 (= v7 + ND v5 korttipuut + KL v1.7, vienti21) paketoitu 12.3x _valmiit/omat-mallit-vienti-20261009h; ämpärissä 12.18 (Julkaisija 41/41, julkinen URL 200), Julkaisijan junalistalla. OSOITIN uusin-2 → v8 (ei v7) junan 172 mukana, koska ND v5:n puut tarvitsevat OmaMalli-alfaleikkauksen; siihen asti v6. uusin.json → v2/mallit-giza.json (vanhat appit).
- Putki: `proto-3d/_tyo/linssiseppa2/concorde-putki/glb/sijainnit.json` → `python3 -I tyokalut/omat_mallit_tileset.py <putki> <putki>/vientiN`
  (worktree proto-linssiseppa2-korkeus). Uusin vienti21 (ND v5 korttipuut 137 k + KL v1.7).
- LR:n jatkolista (PT): ND puut (v5 korttipuut tehty), jokimuurin kiila, KL lämmin rosa (v1.7 tehty); emissive vain lasille (OmaMalli).
- ND:n lähilento kun LR:n malli valmis (omistaja).

## Muuta
- Cupolan radiosilmukka tarkoituksella pois (omistaja 3.10.), ämpärin tiedosto käyttämätön → PT:lle ehdotettu manifestimerkintä.
- Karttasepän index-v4 (vesi ilman altaita) ämpärissä; koodi hakee v4 → v3 → v2.
