# Natiivi-UI: luovutus 11.11.2026 klo 13.12 (kontekstivahti 25 %; korvaa -1204:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671, VS local_5ebb0658-96f6-434d-8a38-b122eb53032f. Näkyvät suoraan KK:lle, PT kopiona.
Natiivikoodi: worktree /Users/Shared/Claude/wt/proto-nui-pallo (remote natiivi-backup), nyt haarassa natiivi-ui/lahin-koe.
Tarkistus: `sh Peli-testit/unity-tarkistus.sh </dev/null` (run_in_background). ÄLÄ KOSKAAN pkill -f (12.26 virhe, PT:lle kerrottu).
UUSI SÄÄNTÖ (omistaja 12.21, Raamattu 12.26.5): kaikki ajot Macilla (esikatselu iPad-koossa); laite-iPadilla vain KK:n nimeämä valmis kokonaisuus, ei omia tilauksia.

## 1. JUNAKOKONAISUUS (KK 12.19 + 12.23; omistaja 12.18: Turisti-info Lehden sisälle, nappi pois kartalta)
- b83baccaf PERUTTU (JU MR64 peruttu, PT tietää). Junahaara natiivi-ui/juna-lehti KÄRKI 48532e3fa (unity 0):
  49d03f79f = matkaopas cb8e98001 (katse-2 + Lehti-nappi 569de90bb + työ D 237e44e6f + Matkaopas alasivuna + 1. jakson kuva) + juna-224 17fbf3e35;
  + 359613388/659872d72 = rajaus mallista (cherry-pick 16ed591a7, 919e7e855; KK 12.23 hyväksyi 11 kohdetta, SC odottaa mäkisuunnitelmaa)
  + 48532e3fa = lähin kohteen rajoista kaikille: kamera + lähitaso (PalloKierto.LahitasoM, 50 m) rajapallon ulkopuolella (×1,1 + 5 m),
    täyttö ≤ 2/3 ruudun korkeudesta (pysty, sama mitta kuin rajaus; vaakarajaa EI, koska Louvre ei lähenisi lainkaan; KK:lle kerrottu).
    Loki: "lähin … m (rajoista … m: säde, maa, huippu; rajaus … × 0,7; täyttö ≤ 0,67)".
- juna-lehti-1/2 (49d03f79f, iso + pieni, Mac) KATSOTTU OK ja viety KK:lle 13.1x (yläpalkin rajaukset *-yla.png, Lehti m1/m2/m2b).
- KESKEN: lahin-1 (haara natiivi-ui/lahin-koe 0ca9df559 = juna-lehti 48532e3fa + KS montparnasse-juna a4f6cd17b VAIN KOKEESEEN, ei junaan)
  JU:n jonossa → lokit/nui-lahin-1-0ca9df559 (skripti _tyo/natiivi-ui/sk-lahin-1.txt: Riemukaari, Eiffel, Montparnasse × alku, lähin, lähin+kierto).
  SEURAAVAKSI: katso TÄYSIKOKOISINA (ei leikkautumista, täyttö ≤ 2/3), lokista "lähin … (rajoista …)" ja liiketappi tila "korkeus" → KK.
  Jos Riemukaari leikkautuu yhä: ennen arvio oli, että 90 m:ssä ja 50 m:n lähitasolla kulman syvyys ~55 m ei leikkaisi → tarkista todellinen
  korkeus lokista (EsitysLahin voi vaihtua kohdassa 822 "uusi rajaus") ja LaskeAsento/lähitaso.
- KK:n OK:n jälkeen: sha (48532e3fa tai uudempi) PT:lle "junaan" → pt-ok. Montparnasse ei kuulu NUI:n junaan (KS:n oma ehdokas).

## 2. SULUN LOPUN LIIKAHDUS – korjattu ae72a1a4e (haara natiivi-ui/sulku-katse, pohja b83baccaf; EI juna-lehdessä)
- PalloKierto.SulkuKatse: sulun aikana katse liukuu nollaan Smootherstep(vauhti)-tahdissa, katsepiste katsesuoraa pitkin (LiukuKatse), silmä ajon radalla.
- sulku-katse-1 JU:n jonossa lahin-1:n jälkeen → lokit/nui-sulku-katse-1-ae72a1a4e (skripti sk-sulku-katse-1.txt, tallenne a + b).
- Mittari: python3 <scratch>/kehysero.py <tallennekansio> <alku_s> <loppu_s> (k-*.jpg, 50 fps; kehysero + kirkkaus, 320×240 harmaa). Kopio:
  _tyo/natiivi-ui/kehysero.py. Vanha katse-2 a: piikki 23,86 s ero 3,80 (ympärillä ~0,2). Tavoite: ei piikkiä sulun lopussa (a ~23–25 s, b ~24–26 s).
- OK → KK:lle mittaus; sitten yhdistä juna-lehden päälle (cherry-pick ae72a1a4e) ja unity, KK päättää junasta.

## 3. Muuta
- kohteet-arkki-2 arkit + arvio KK:lle 12.1x → KK 12.23 hyväksyi (kohta 1).
- VS kysyi lähintä (Pariisin piirros): vastattu, KS:n c032134e7 IsoisaLahinLeveys 0.231 (~0,78 km), ei NUI-muutosta.
- KK:n huomio (ei estä): pienellä iPadilla noston valokuva peittää Concorden aukion kyltin alun.
- Remote Control: kytketty (Postivahdin aloitusohje).

## LISÄYS 14.0x: KK:n uusi työ – RAJAUS PÄÄRAKENNUKSEN RUNGOSTA (ei aloitettu)
- KK 14.0x (kopio PT): Sacré-Cœurin pienuuden syy EI ole mäki vaan koodimallin rajat: Muoto = sylinteri koko verkon boundsista
  (NahtavyysEsittely: Muoto/Mitat/Rajat koodimallille), SC:n koodimallissa 118 askelmaa ~147 m rinnettä → sylinteri kasvaa, kirkko ~60 %.
- KORJAUS (yleinen sääntö): esittelyn rajaus, Naytteet-mittaus ja Paisunta lasketaan päärakennuksen RUNGOSTA. KS lisää koodimalleihin
  rungon rajalaatikon (ilman portaita, terasseja, pihoja, aukiota, maata); rajapinnan nimi sovitaan KS:n kanssa suoraan (KS local_7b57e35a-…).
  Ilman rungon rajoja: nykyinen. Oma muutos junahaaran kokonaisuuden PÄÄLLE; junahaaran Mac-kuvat ensin (kohta 1).
- Näyttö: arkki-2:n 12 kohdetta uudelleen Macilla (sk-kohteet-arkki-2 pohjaksi); SC:n kirkko 45–67 % kuvan korkeudesta lähin-kuvassa;
  muut muuttuvat ≤ 5 %, paitsi pihalliset/portaalliset (listaa muuttuneet).
- Tausta: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-saumat-ja-maet.md luku 4 C ja luku 5 osa 1.
- SOVITTU KS:n kanssa 14.1x: `public static Bounds OhjelmaKohteet.RungonRajat(Mesh verkko)` (verkon omassa avaruudessa kuten verkko.bounds; tuntematon
  → verkko.bounds). KS tekee haaran karttaseppa/runko (natiivi-backup, juna-224:n kärjestä) ja kertoo sha:n NUI:lle. NUI vaihtaa verkko.bounds →
  RungonRajat(verkko): NahtavyysEsittely.TaysiMalli, Paisunta.MahtuvaKerroin ja Naytteet, jos sama. Pohja: juna-lehti + merge karttaseppa/runko (commit-pari).
- KS 14.2x: RungonRajat VALMIS 2743a6ebd (natiivi-backup karttaseppa/runko, pohja 613f55c18 = juna-224-ehdokas SC; testit 758/912, unity 0).
  Ulkona: SC:n terassi ja portaat, Louvren kiveys ja altaat, Opéran ja GP:n portaat; muilla = bounds. NUI: oma commit tämän päälle (+ juna-lehti),
  TaysiMalli `b = OhjelmaKohteet.RungonRajat(verkko)`, Paisunta.MahtuvaKerroin, Naytteet → sha KS:lle, sitten KJ arkki-2:lle NUI:n skenaariolla.
