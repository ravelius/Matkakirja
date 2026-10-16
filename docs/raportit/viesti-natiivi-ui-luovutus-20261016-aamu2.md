# Natiivi-UI: luovutus 16.10.2026 klo 08.12 (Postivahti: kova raja 35 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; -aamu ja vanhemmat on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-remote natiivi-backup. Ennen käännöstä tyokalut/tarkista.sh (0 virhettä).
Proto-worktree: /Users/Shared/Claude/wt/proto-natiivi-ui-vihjeet-196 (nyt haarassa natiivi-ui/lataus-nimi-196). Ketjut:
proto-3d/tyokalut/natiivi-ui-ajot/ketjut-20261016/*.zsh (käyttö `zsh <ketju> <sha>`; kääntää L2:lla ja ajaa iPhone 123B4B25 + iPad F7513985).
SIMUT 123B4B25 + F7513985 ovat yhä NUI:n varauksessa lataus-ketjua varten → ilmoita Julkaisijalle SIMU VAPAA, kun ajot on tehty.
Julkaisija: saman erän uusintakierrokset saa viedä L2-jonoon kysymättä, kun L2 vapaa ja simut hallussa (uusi erä: kysy/ilmoita).

## VALMIS (tämä sessio)
- SHANGHAI-KELAUS osa 2: natiivi-ui/kelaus-196 9fee43b2d junassa 196 (90e9120e3). KelausOsuus vain lokiin, ehto LaatatValmiit, katto 4 s.
  Valosepän esihaku (6458eb0fb, rajaus ca8aad04e) vie yhä ~10 s → pallo ulos katosta; Valosepän työ.
- Aloitusvihjeiden asettelu: natiivi-ui/vihjeet-196 02729b85d → NS:lle junaan 196 (PT kuittasi, kytkin pois). Kuvat
  proto-3d/_tyo/natiivi-ui/vihjeet-196-kuvat-0700/ (iPhone pysty 9/9, vaaka 8/9 Tripoli, iPad 9/9 + 9/9). Kuvat menivät KK:lle (PT myös).
- Levysiivous: 3 junaan yhdistettyä worktreetä + 6 vanhaa .app-kopiota pois (PT/Postivahti pyysivät).

## JONO (PT:n järjestys, omistajan pyynnöt 16.10.)
1) LATAUSKUVA (omistaja 08.04 "Lataus kuvan teksti saa olla isommalla", 08.05 "Saisi olla myös maan nimi perässä") – junaan 196.
   Tehty: natiivi-ui/lataus-nimi-196 9aec5d3bf (pohja juna-196 432864493, pushattu): mk-astroavaus__nimi 17 px → --tk-koko-arkki 26 px
   + white-space normal + keskitys; Latauskuva.NimiJaMaa/MaaIso3/KaupunginMaa/MaaPisteesta (UI/Latauskuva.cs); raketti "Andøya, Norja"
   (RaketinMaa NOR), museo (MuseoMaa → FRA/NLD), opas (OpasSovitin.NykyinenKaupunkiId), kierros (origon lähin kaupunki ≤ 150 km),
   linna (Olavinlinna → FIN, muut ilman maata). Cupolassa maa oli jo (SijainninNimi).
   KESKEN 08.12: `lataus-ketju.zsh 9aec5d3bf` taustalla (L2-jonossa linssiseppa/reitti-edella-196:n takana; skenaario
   sk-lataus-nimi-196.txt: L1 raketti pysty, L2 raketti vaaka, L3 Cupola). Tulos: proto-3d/_tyo/natiivi-ui/lataus-nimi-196-app/ajo-*.out ja
   proto-3d/lokit/todistus-lataus-nimi-{iphone,ipad}-196-*. Jos ketju kuoli nollauksessa: aja uudelleen. Tarkista kuvista, että
   "ANDØYA, NORJA" mahtuu/rivittyy siististi iPhone pystyssä → kuvat PT:lle (3 riviä) → NS junaan 196 (haara + SHA).
2) ISS-KOHDEVALIKKO LIQUID GLASS (omistaja 08.07 "Pitää olla liquid glass ja vaihda ruskea harmaaseen"; kuva
   /Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261016/iss-kohdevalikko-liquid-glass-0806.png) – junaan 196.
   Paneeli olemassa olevaan Lasipohjaan (mk-lasipohja); ruskeat/kullanruskeat → Tyylikirjan harmaat (pohja, korttien ja nappien reunat,
   otsikko "Kohokohdat"); tarkista muut ISS-ikkunat. LISÄYS 08.08–08.09: "Ja tuossa lapussa saisi olla ne kaikki napit" / "Live yms" /
   "Ja ylimpänä nostot" / "Eli vain yksi lappu joka kattaa kaikki": YKSI harmaa lasipaneeli: ylimpänä nostot (9 kohokohtakorttia), sitten
   kaikki napit (vuorokausi ›, vuodenaika ›, LIVE (palautetaan; poistettu 15.10. 20.42), NIMET ja ISS:n muiden valikoiden toiminnot),
   sitten ISS nyt | Oma sijainti ja kohteet ryhmittäin. Ei erillisiä lappuja; ohjaamon säätimet paikoilleen. Kytkimen takana,
   iPhone + iPad -kuvat PT:lle ennen kytkentää. Ei aloitettu. Koodi: UI/Linssit/IssKohdevalikko*.cs, Linssit.uss, Pohjat (mk-lasipohja).
3) VIHJEIDEN KEVYT KUVAPARI (omistaja 07.55 "Kevyempi versio ensin") – EI junaan. Tehty: natiivi-ui/vihjeet-kevyt-196 279d45f19
   (`ui vihjeet kevyt 1|0`, mk-nappi pois kuvakorteilta kuten ERIKOISNOSTOT-päät; oletus tumma). Ajot valmiit, vertailukuvat koottu:
   proto-3d/_tyo/natiivi-ui/vihjeet-kevyt-pari-0815/ (1–4: nykyinen vasen/ylä, kevyt oikea/ala). LÄHETTÄMÄTTÄ PT:lle (järjestys: 1 ja 2
   ensin). PT vie omistajalle (EI suoraan KK:lle).

## Opit
- Pulu.Laatikko = koko 152 × 304 pt:n alue; esteeksi Pulu.Lintu. PalloKierto.RuutuPiste(..., ulos: true) ruudun ulkopuolisille.
- Todistusajon iPad-vaakakuva voi jäädä kiertämättä (raaka/*.png pystyssä) → sips -r 270.
- Roolit eivät viesti KK:lle (osoitekirja); kuvat omistajalle aina PT:n kautta.
