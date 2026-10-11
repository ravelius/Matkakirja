# Siirtosepän luovutus 11.10.2026 aamu ~10.00 (Opus 5.5, high; konteksti 60 %, PT:n nollausraja 50 %)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): Olavinlinnan historiamoottori ja pelattava pala (natiivi proto). Lue tämä, CLAUDE.md ja Raamatun
Ydinajatus kohta 2. Edellinen luovutus (yön tausta): docs/raportit/viesti-siirtoseppa-luovutus-20261011-aamuyo.md (PÄIVITYS-osiot).
Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello, haara **siirtoseppa/laituri-varoitus**, kärki **e1ad179e5**.
Proto-git on paikallinen (ei pushia). Simu 8362879F = siirtoseppa-iPad13. Simuvuorot Julkaisijalta (SIMULAATTORI NYT), ilmoita aina
"SIMU VAPAA". Raskaat Olavinlinna-ajot yksi kerrallaan (PT).
**OLAVINLINNA-VAHTI (Julkaisija 09.3x):** jokainen commit linnahaaroihin käännetään automaattisesti → app
/Users/Shared/Claude/proto-3d/lokit/olavinlinna-uusin/Matkakirja3D.app (tila lokit/olavinlinna-tila.txt, ristiriidat
lokit/olavinlinna-ristiriita.txt, haaralista julkaisija-tyokalut/olavinlinna-haarat.txt). ÄLÄ committaa keskeneräistä.
Paketti kiinnitetään omassa haarassa: **siirtoseppa/v47g 53c3ec890** (worktree /Users/Shared/Claude/wt/proto-siirtoseppa-v47g,
PelattavaPala.Hash fef286897291691f, esittely 0a36f8bea046b953). v47h tulee LR:ltä → kiinnitä samalla tavalla (uusi haara
siirtoseppa/v47h v47g:n päälle, PelattavaPala.cs + kultaiset olavinlinna-v47h-*.json; ks. 53c3ec890 ja 09c6d28eb) ja kerro Julkaisijalle.

## SEURAAVAT TEHTÄVÄT (järjestys)
1. **Botti-osat-ajo** heti, kun Julkaisija antaa SIMULAATTORI NYT (pyydetty 7. kierroksen jälkeen; olavinlinna-uusin sisältää e1ad179e5):
   `perl -e 'use POSIX "setsid"; fork and exit; setsid; exec @ARGV' zsh /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/ajo-botti-osat.sh > <scratchpad>/bo.out 2>&1 < /dev/null`
   → raportti <todistuskansio>/botti-osat/RAPORTTI.md. Ensimmäinen OIKEA ajo aloituskohdille ja osa-ajolle (kumpaakaan ei ole ajettu
   laitteella). Jos `aloitus` ei onnistu, korjaa (Ydin Aloituskohdat.cs, DioraamaSovitin.cs aloitus-haara) ja aja uudelleen. Tulos PT:lle rivillä.
2. **Laitetestaajan 7. kierros** (v12 + piste 20 + v47g, olavinlinna-uusin) → PT jakaa löydökset; tee ne (apuagentit Opus).
3. **v47h kiinnitys** LR:n ilmoituksesta (pisteet 8, 16, 20 mallissa; ovi:paaovi 120°). Sen jälkeen poista KavelyPaikat v47h:lle
   (KavelyPielet.PaikatPaketit-listassa vain b257…/fef2…, joten v47h:ssa ne jäävät pois itsestään — tarkista loki "kävelypaikat pois").
4. **Keittiö B** (PT): LR poistaa vanhan dioraamakeittiön ja leipoo keittio-g102:n ulkopinnat. Kun paketti tulee, tarkista keittiö ja
   pihat; KavelySisatila (9280d4a30) voidaan poistaa, jos ulkopinnat näkyvät oikein.
5. Editoriajuri (tyokalut/botti-osat.sh <haara>, Assets/Matkakirja/Editor/BottiOsatAjo.cs): ajamatta; vaatii käännösvuoron + oman kopion
   (Natiiviseppä: batchmode ilman -nographics luo Metal-laitteen; PlayMode vain Test Frameworkilla tai AsetteluTesti-tyyliin).

## TILA: siirtoseppa/laituri-varoitus (Linssit 1404/1404, tarkista.sh 0)
| Commit | Sisältö | Todennettu |
|---|---|---|
| d3e44804e…d289911c7…fd4c127e4 | tyrmän ovi näkyy, oviaukko 1,2 s, katse ovelle 4× | v8 ✓ |
| d87c3f836 / 972857148 | tyrmän alarajavalo (oven kajo, kuunsäde) | v8 ✓ |
| bf1938773 | hälytys ratkeaa (luovutus ulottumattomissa) | v8 ✓ |
| de081936a / d238b68be | anteeksianto tyrmän jälkeen; vesiportin pielet + kynnys | v9 ✓ |
| 1b33ed485 | paluussa katse vaakaan kulkusuuntaan | v11 ✓ |
| dbd7256e0 | SILMISTÄ LÄHITASO 0,05 m (DioraamaNayttamo pakotti 0,5 m) | v11 ✓ |
| 47e55d4ba | NUI: kynttilä tyrmään | v11 ✓ |
| be3a8bdf1 | tyrmä m3 oven vihje, kivi lukon jälkeen | v10 ✓ |
| 0eef98927 / 9a8e0ddbe | vapautus + turva 60 s, helpotus portaittain, varoitus 3 s; katse varoittajaan vain 1. kerralla, kosketus keskeyttää | v11 ✓ |
| 41e1f55a9 | SilmaVara (holvi oviaukossa), lukko 45 s, avaimet astumalla | v11 ✓ (ulos 9 s / 55 s) |
| 9280d4a30 | keittiö sisätilana (KavelySisatila), vihje yhdestä lähteestä, AukkoVeto, SilmaVara.Taakse, turva 60–150 s, vapautus historian jälkeen | EI vielä (7. kierros) |
| e2c0b3e98 | monimesh (dc53ccd54 cherry-pick; oli jo 181k:ssa) | – |
| 3dccfed20 | KavelyPaikat 8/16/20 + leikkauslaatikon kiertosuunta c = cos k (LR) | EI vielä |
| 209fffc21 | kappelin pääoven lukko vasta kappalaisen lukitessa (piste 20, PT b) | EI vielä |
| d0bab0fe2 / a49f57205 | pielet vain b257…; kävelypaikat b257… + fef2… (v47g) | EI vielä |
| e1ad179e5 | aloituskohdat + botti osa + musta ruutu (simuskenaario botti-osat.txt) | EI vielä |

## TODISTEET (proto-3d/lokit/)
todistus-laituri-a1-20261011-0822 (v11), todistus-tyrma-ovi-20261011-0831, todistus-pisteet-20261011-0835, todistus-botti-kavely-20261011-0715
(v10: 67/94; jumit 8, 14–19, 20–38, 49–64, 83–94). Laitetestaajan raportit: …-viides-, …-kuudes-20261011.md (Laitetestaajan haara).

## AVOIMET / HUOMIOT
- Laiturin "Fogg" = vesiportin osan hahmo 2,5 m aloituspaikasta (−62,6/−22,5), ei pelaajan malli (PT:lle kerrottu).
- LR odottaa laituri-a1:n a1-02-paikkaa + `kavelyosat 0` -kuvaa mustista lohkoista (skenaariossa valmiina) — v47g:n laatikkonormaalikorjaus
  poistanee ne; tarkista seuraavassa laituri-a1-ajossa ja kerro LR:lle.
- Pikkupihan rajojen korkeus 0 → voittaa osavalinnan keittiön alueella (aloituskohta-agentin löydös) → LR:lle (ei vielä lähetetty).
- Laaja testi OLAVINLINNA_LAAJA=1 KiinniJokaPisteessa kohta 57 (82 s > 80 s) hylkää myös vanhalla koodilla (ennestään).
- Skenaariot: proto-3d/tyokalut/siirtoseppa-ajot/skenaariot/ (laituri-a1, tyrma-ovi, halytys, pisteet, botti-kavely, botti-osat).
  laituri-a1: `poikki vartijat tila` (ilman "tila" käynnistää vartijat uudelleen!).

## OPITTUA
- Tarkista ensin TODELLINEN arvo ajossa (lähitaso 0,5 m oli DioraamaNayttamossa, ei linssissä) — kolme "vikaa" sama juurisyy.
- Agenttien analyysi lukee OMAA haaraa: varmista, että yhdistetyn käännöksen commitit (esim. dc53ccd54) ovat haarassa ennen analyysiä.
- Sokea HID-skenaario ei todista näkyvyyttä; oleta heti tapahtuman jälkeen, muuten koko ajo epätahtiin.
- printf + %-merkki commit-viestissä katkaisee viestin → käytä `git commit -F tiedosto`.
