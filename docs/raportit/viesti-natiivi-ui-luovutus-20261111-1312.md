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

## LISÄYS 2 (PT, KK 13.2x): junakokonaisuuden UI HYVÄKSYTTY Mac-kuvista (49d03f79f). Junasha 48532e3fa junaan VASTA kun KK on katsonut
lähin-kuvat (nui-lahin-1-0ca9df559, JU ajaa) → KK:n OK → sha PT:lle → pt-ok. Laite-iPad vain KK:n iPad-erässä.

## LISÄYS 3 (KS 14.3x): UI-pallon varjo jää näkyviin, kun UI-pallo piiloutuu KS:n koodipallon tieltä (KJ37 2cf7b7e48,
lokit/karttaseppa-pallo-kj37-2cf7b7e48). NUI:n koodia: KaupunkiPallot.SarjaVarjo on erillinen elementti, PallonVarjoVaistaa (~975) asettaa
visibilityn joka kehys. KS:ltä kysytty, millä kutsulla/lipulla UI-pallo piiloutuu → sama piilotus SarjaVarjolle (display None tai ohitus).
- KS 14.3x vastasi: piilotus on KS:n haarassa karttaseppa/pallo-koe 2cf7b7e48 (KaupunkiPallot.cs): lippu `PalloMalliPiilottaa` (oletus true),
  `PalloMalliAvain = "kuumailmapallo"`, `PalloMalli(Pallo p) = OhjelmaKohteet.KoodimallinNakyvyys(...)` (vain Pariisin kaupunkipallo) → `Pallo.Malli3D`,
  UI-kuvan alfa 1 − Malli3D. KORJAUS: SarjaVarjon opasiteetti × (1 − p.Malli3D) PallonVarjoVaistaa-kohdassa, KS:n haaran päälle.

## LISÄYS 4 (PT, KK 13.30; ei kiire, junakokonaisuuden JÄLKEEN): työlistarivi "Kuumailmapallon kyltti peittää ankkurin lähikuvassa":
kyltti "Kuumailmapallo £200" peittää pallon ankkurin ja kentän etureunan → kyltti kentän viereen tai ylemmäs. Mac-pari (ennen/jälkeen) KK:lle.
- LISÄYS 3 TEHTY 14.4x: 81ac33721 (natiivi-backup natiivi-ui/pallo-varjo, KS:n a20c6cb98:n päällä, unity 0): VarjonPeitto(p) = perus × (1 − Malli3D)
  rivillä ~850 ja SarjaVarjo():ssa (joka kirjoitti peiton yli). Sha KS:lle; KS pyytää JU:lta ajon ja KK:n parin. Ei NUI:n junassa (KS:n koe).

## LISÄYS 5 (16.0x): lahin-1 VALMIS ja katsottu → KK:lle 16.0x (lokit/nui-lahin-1-0ca9df559, arkki-lahin-1-1000.jpg).
Riemukaari lähin 113 m (rajoista 95), ~62 %, ei leikkautumista; kattoreunan kolmiokolo = MALLIN reikä (lähitaso 50 m, lähin pinta ~77 m).
Eiffel 676 m ~½, Montparnasse 397 m ~0,7. SEURAAVAKSI: KK:n sana → "48532e3fa junaan" PT:lle → pt-ok. sulku-katse-1 JU:lla seuraavana.

## LISÄYS 6 (16.1x): KK 15.58 hylkäsi Riemukaaren lähin-kierron (01-riemukaari-3-lahin-kierto.png, rajaus 1000×700+900+650: kulma leikattu
kolmioksi). Minun "mallin reikä" -arvioni oli VÄÄRÄ: alkukuvassa 121 m katto ehjä, kolmio = taso leikkaa laatikon kulman → LÄHITASO.
- Päätös B (KK:n ehdollinen, omistaja 15.3x "Lehti ja Matkaopas pian peliin"): Lehti + Matkaopas IRROTETTU: 63f86d189 (natiivi-ui/lehti-juna =
  17fbf3e35 + cherry-pick 237e44e6f, 569de90bb, cccae5d87, 23f6f6d07, cb8e98001; unity 0, EI ajettu tällä pohjalla) → PT:lle junaan 16.1x.
- SEURAAVA TYÖ: napautuslennon (48532e3fa) leikkaus korjattava: kohde ei saa leikkautua MISSÄÄN kierron kulmassa lähimmällä etäisyydellä;
  yleinen lähin 0,231 ei muutu. Selvitä, miksi 113 m:ssä leikkautuu, vaikka PalloKierto lähitaso max(50, 1 %) → mahdollisesti toinen kamera
  (CesiumKaupunki.cs:144 lahi-kamera, ElavaKerros/LiikeLaatat kopioivat near), linssiK tai kaytetty==0 → 100 m. Lisää lokiin todellinen
  kamera.nearClipPlane ja etäisyys lähin-kuvan hetkellä (esim. liiketappi tila). Todiste: Riemukaari lähin-kierto puhdas + Eiffel/Montparnasse.

## LISÄYS 7 (16.1x): KK 15.59 SANA = A (48532e3fa kokonaisena junaan, kolo ei haaran tuoma). PT 16.0x pyysi B:n juna-224 df0f36c4b:n päälle.
- B VALMIS: 484d48fd9 (natiivi-ui/lehti-juna, rebase 17fbf3e35 → df0f36c4b ilman ristiriitoja; unity 0 vain vanhalla pohjalla 63f86d189).
- A:N ESTE: 48532e3fa + df0f36c4b → ristiriita KaupunkiPallot.cs ja KaupunkiPalloMitat.cs (oma d5c003d92 pallon ankkuri vs junan pallo-maa-3,
  224.69). Ratkaisematta. PT:lle ja KK:lle kerrottu; PT valitsee (B heti tai A ratkaisun jälkeen). Jos A: merge df0f36c4b haaraan juna-lehti,
  ratkaise pallo-tiedostot junan hyväksi (pallo-maa-3 on uudempi, omistajan katsoma) ja tarkista ankkurin tarve, unity, sha PT:lle.
- KOLOTESTI (KK 15.59, junan jälkeen): toista 01-riemukaari-3-lahin-kierto Macilla, kokeile yksi kerrallaan: lähitaso puoleen, paisunta pois,
  esittelyn rajaus pois → yksi rivi KK:lle, mikä poisti kolon, ENNEN korjausta. Jos mikään ei: kuva samasta kulmasta mallin esityskameralla KS:lle.
- KK 16.00: B VAHVISTETTU, A (15.59) PERUTTU. PT:lle 484d48fd9 (= 63f86d189:n sisältö df0f36c4b:n päällä). A:n ristiriita ei enää koske junaa.
  Napautuslennon korjauksen näyttö (KK): Riemukaari 2-lahin ja 3-lahin-kierto samoista kulmista + yksi leveä matala kohde (Louvre tai Invalidit);
  sitten napautuslento junaan KK:n sanalla (tällöin ratkaise pallo-ristiriita kuten yllä).

## LISÄYS 8 (nollauksen jälkeen, 16.xx): napautuslennon korjaus 313e15b1a
- KOLON SYY: varjostimien syvyysveto 60–63 m (OhjelmaKohde/NotreDameKirkko/TaloKerros). lahin-1:n koepohjasta (0ca9df559) puuttui KS:n e75ff1dae
  (vetoraja lähitason taakse, junassa 224.70) → 78 m:n kulma vedettiin ~15 m:iin, lähitason (50 m) eteen. e75ff1dae litistää alle lähitaso+63 m:n
  syvyydet lähitasolle (Cull Off: etuosan pinnat sekaisin) → NUI:n korjaus: PalloKierto.EsitysLahitaso = min(50, (etäisyys − EsitysRajaSade − 63)/1,02),
  väh. 1 m; NahtavyysEsittely.LahinRajoista = RajaSade + 63 + 5,1 (Riemukaari 113 m ennallaan, lähitaso ~5 m). Vertailu `ui nahtavyysesittely lahitaso 0`;
  tila-komento näyttää etäisyyden, todellisen lähitason ja katon. KK:lle kerrottu (kolotestin rivi = analyysi, ei vielä ajoa).
- HAARA natiivi-backup natiivi-ui/napautus-224: bbdc9184a = 48532e3fa + merge juna-224 2882f055a (pallo-tiedostot --theirs: ainoa oma muutos d5c003d92
  on junassa bd7f0ea44:nä + pallo-maa-3) + 313e15b1a korjaus. unity 0. (Huom. vanha natiivi-ui/napautus-juna = b83baccaf, peruttu; älä käytä.)
- AJO JU:lla: sk-napautus-224-1.txt (proto-3d/_tyo/natiivi-ui) → lokit/nui-napautus-224-1-313e15b1a: Riemukaari a (lahitaso 0) / b, Louvre b.
  SEURAAVAKSI: katso täysikokoisina (b: ei kolmiota eikä sekaisin meneviä pintoja; a näyttää litistyksen, jos se näkyy), lokista "lähitaso … (esityksen katto …)"
  → KK:lle pari a/b + Louvre, PT kopio. KK:n sanalla 313e15b1a PT:lle junaan.

## LISÄYS 9 (KK 16.20): ehdokas nyt 41b9c5965 (= 313e15b1a + lukonVersio: lukko vapautuu, vaikka uusi esittely ei ota omaansa)
- KK:lle vastattu koodista: palautuspolut, D32_SFloat_S8 + käänteinen Z, Louvre (rajapallo 417, lähin 766, lähitaso 50) ja Invalidit (230, 407, 50) ennallaan,
  tavallinen kartta: 124 m kiertopisteestä (620/5), Riemukaari ~89 m, Eiffel ~0 m → litistys jo 224.70:ssä; KK päättää yhteisestä paikasta, EI laajennusta ennen sanaa.
- JU:lle: aja 41b9c5965, skripti lisätty Invalidit + lopuksi 5 s tallenne e-riemukaari-b-lahin → lokit/nui-napautus-224-1-41b9c5965.

## LISÄYS 10 (KK 16.26): syvyysvedon raja korjataan VARJOSTIMESSA (KS: v × min(1, 0,8 × raja / 60)), ei esityksen lähitasolla
- 41b9c5965:n ajo (JU) valmistuu ja kuvat KK:lle, mutta napautuslento EI junaan ennen ajoa B.
- AJO B: haara napautus-224 + KS:n varjostinsha (KS:ltä pyydetty 16.2x) → skripti valmiina proto-3d/_tyo/natiivi-ui/sk-napautus-224-2-b.txt
  (Riemukaari lahitaso 0 / 1 samoista kulmista; täydennä sha otsikkoon) → JU. Kytkin `ui nahtavyysesittely lahitaso 0|1` on jo koodissa.
- Jos kaari ehjä katto pois → poista EsitysLahitaso/EsitysRajaSade/kytkin haarasta (LahinRajoista palaa? päätä: 63 m:n veto ei enää rajaa lähintä
  KS:n muutoksella → palauta vanha r + LahitasoM). lukonVersio jää joka tapauksessa.
- 16.3x: B-ehdokas 2f4c0a80f (napautus-224 = 41b9c5965 + merge KS 03ad357fb, vain varjostimet) pushattu; ajo B JU:lla samaan Mac-ajoon KS:n A:n
  kanssa → lokit/nui-napautus-224-2-b-2f4c0a80f. Ajo 1 (41b9c5965) käynnissä 16.26 → lokit/nui-napautus-224-1-41b9c5965 (katso, kuvat KK:lle).

## LISÄYS 11 (16.5x): AJO B KATSOTTU → LÄHITASOKATTO POISTETTU (KK 16.26:n ehto täyttyi)
- lokit/nui-napautus-224-2-b-2f4c0a80f (KS:n veto 03ad357fb): Riemukaari katto pois (lähitaso 30 m, 113 m) ja päällä (5 m) → molemmat ehjät
  täysikokoisina (2-lahin kulma + 3-lahin-kierto). Kulmat eivät vieläkään samat (pois −42°, päällä 34°; JU ajoi ilmeisesti ennen suunta 0 -lisäystä).
- Ajo 1 (41b9c5965): a/b ehjät, erokuva k120/121 ilman välkettä (lokit/nui-napautus-224-1-41b9c5965/ero-k120-k121.png), Louvre/Invalidit 50 m ennallaan.
- Haaraan napautus-224: revert 313e15b1a (katto, SyvyysVetoM, LahinRajoista palaa 48532e3fa:n muotoon, kytkin pois), lukonVersio JÄÄ,
  tila-komennossa etäisyys + todellinen lähitaso = d520120aa (unity 0, pushattu). Seuraavaksi: sha KK:lle + PT:lle; junaan vasta KK:n sanalla
  YHDESSÄ KS:n 03ad357fb:n kanssa (napautuslento ilman vetokorjausta leikkautuisi e75ff1dae:n litistykseen).
- 16.5x: d520120aa KK:lle ja PT:lle. AVOINNA: KK:n sana junasta (suositus yhdessä KS:n 03ad357fb:n kanssa); jos KK haluaa vielä puhtaan parin
  samoista kulmista, skripti sk-napautus-224-2-b.txt (suunta 0 lisätty) on valmis. LISÄYS 4 (kuumailmapallon kyltti) yhä jonossa junan jälkeen.
- Luovutus nollausta varten (kontekstivahti 26 %).

## LISÄYS 12 (KK 16.47): NAPAUTUSLENTO JUNALUPA → d520120aa PT:lle junaan (sisältää KS 03ad357fb; juna-224:n kärki oli yhä 2882f055a). Uutta Mac-ajoa ei
ennen junaa; KK katsoo junan Mac-kuvan Riemukaaren lähimmästä kierrosta. KK:n löydös: kierron parit kuvataan lukitulla kulmalla (ei ajan mukaan).
Seuraava NUI-työ: LISÄYS 4 (kuumailmapallon kyltti ankkurin päällä, Mac-pari KK:lle).
- 17.14 (JU): 224.74 = 2882f055a (Lehti + Matkaopas) LINKISSÄ. Junan Mac-kuvat sk-juna-lehti-1 → proto-3d/lokit/nui-lehti-junakuvat-2882f055a
  → KATSOTTU 17.3x (6/6 ok, arkki-1000.png) ja viety KK:lle. Seuraava työ: LISÄYS 4.
