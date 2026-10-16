# Pelikoodarin luovutus 17.10.2026 yö (KOVA RAJA 39 %, Postivahti, klo 00.37)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261016-yo: kaikki kohdat tehty (alla).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti, docs/moduulit/yhteiset-pohjat.md (LIIKE- ja ÄÄNI-pohja: ei omia reittejä).
- Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe,
  JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab,
  Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
- Juna 197 (= "juna 198", omistaja 22.24): OMISTAJA PYYSI JULKAISUA 22.45, lukitus ~01.45. Simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19
  vain JU:n "SIMU NYT" -luvalla, "SIMU VAPAA" heti ajon jälkeen.
- Ajot: /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-*.zsh (SHA=… UDID=… zsh …). Skenaario ilman uutta peliä alussa
  KESKEYTYY (mykistystä ei voi varmistaa) → intro videolle `kaynnista-uudelleen aani mykistys;…;uusi-peli …` (sk-intro-museo-korkeus-197.txt).
- Ääniportti: /Users/Shared/Claude/proto-3d/_tyo/venv-aaniluokitin/bin/python -I /Users/Shared/Claude/proto-3d/tyokalut/aaniportti.py <kansio>.

## TEHTY TÄLLÄ VUOROLLA (kaikki peilattu)
1. **Intron mittaus** 9a6aa8ec1 (⊃ abc4accff): GPU 15–16 → 0,9 ms, ruutuväli p50 19,5 → 16,7 ms, p99 33 → ~18 ms. PT kuittasi "mittaus hyvä".
2. **Museo taulun korkeudella + kehys suorakulmainen** pelikoodari/museo-korkeus-197 **8e00df046** (⊃ abc4accff): 613142a21 kävely nousee
   taulun katsekorkeudelle (V2Korkeudet, ovissa SilmaY; LahdonTakaa(v2Kavely) ettei peruutus käännä katsetta 180°), 8e00df046 SilmaAsento
   sekoittaa vain korkeuden (katse aina kohtisuoraan; PT 00.5x i-kortti/suurennus). Testit museo 153/153 (uudet KehysSuorakulmainen…,
   KavelyV2…TaulunKorkeudelta). **VIDEO VALMIS, PT:lle lähetetty 00.37**: lokit/todistus-museo-korkeus-197-20261017-0029 (intro-pariisi.mp4,
   museo-pehmea.mp4, kuvat p1–p8, kaikki OK). JU käänsi d79778a43. Odottaa PT/KK → NS:lle 8e00df046.
3. **ISS-raketti (omistaja 00.09)**:
   - pelikoodari/raketti-pulu-197 **d9fdcbded** (juna-197 5e8e1b853:n päällä): irtoaminen sanan "Heippa" kohdalla (oli 6 s ennen), MECO sanan
     "sammuvat" kohdalla (manifestin tapahtumat_s, puuttuessa RakettiLaukaisu.MecoSanaS / HeippaEnnenLoppuaS), Pulu liukuu narun varaan
     (PulunVaijeri-kuorma Liikepohja.Liulla, testi AsettuuPehmeastiLanganVaraan), manifesti v13 ensin. Oma telakointireitti poistettu (PT 00.2x).
   - pelikoodari/raketti-telakointi-197 **160db49aa** = d9fdcbded + siirtoseppa/aanipohja-197 9db0288e9: telakointiääni AaniPohja.Lahde
     (tehosteet, iss-telakointi) Telakointi.Kiinni-hetkellä, klippi audio/iss-192/telakointi-kolahdus-v1.mp3 (Soundly, PT hyväksyi).
     **JU:n jonossa** → _tyo/pelikoodari/raketti-pulu-197-app. Jos AaniPohja ei mene junaan 197 → NS:lle pelkkä d9fdcbded.
   - Max Livia v4: dialogiraita **audio/raketti-selostus-v8.mp3** + **audio/raketti-aanet-v13.json** VIETY (JU 00.24; Pulun max-Q-otto v4
     v7:n otton paikalle 42,80 s, myöhemmät +3,33 s; ääniportti 0/0; tiedostot _tyo/pelikoodari/raketti-v13).
4. **Cupola "Ohita esittely" (NUI)** pelikoodari/kupoli-ohita-197 **041942137** (juna-197 + aanipohja-197): KupoliAanet.OhitaEsittely(),
   EsittelyKaynnissa, testikomento `linssi raketti esittely ohita`. SHA lähetetty NUI:lle (tekee napin päälle).
5. Karttasepälle vastattu: 51,6° = Cupolan jakso v1-lansi 20,80 s (sanaajat audio/iss-kupoli-v1-ajat/v1-lansi.json); ehdotettu
   KupoliAanet.JaksoNyt/JaksoAikaNyt omaan haaraansa.

## ENSIMMÄISENÄ
1. **Raketin video** kun JU ilmoittaa KÄÄNNETTY 160db49aa + SIMU NYT (PT: "jos ehtii" junaan 197, intro/museo ensin – tehty):
   `SHA=<käännös> UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-raketti-pulu-197.zsh`
   Tarkista lokista: "aikataulu: sammutus raidan 56,29 s ("sammuvat"), irtoaminen 71,47 s ("Heippa")" (manifesti v13), "soi telakointi
   (äänipohja)", kuvat r1–r3. Video + 1 rivi PT:lle, SIMU VAPAA JU:lle.
2. PT:n/KK:n palaute museovideosta ja NUI:n Ohita-nappi (voi pyytää muutoksia OhitaEsittelyyn).

## Avoimet / siivous
- Worktreet: proto-pelikoodari-museo-korkeus-197 (kärki), -raketti-pulu-197, -raketti-telakointi-197, -kupoli-ohita-197 (junaan),
  -intro-tasainen-197, -liikepohja-198, -praha-historia-198 (⊂ museo-korkeus; poista kun NS yhdistänyt), -kori-varjo-197, -kori-koydet-197,
  -iss-revontulet-197, -raketti-kamera-196.
- _tyo/pelikoodari: intro-tasainen-197-app, liikepohja-198-app, kori-varjo-197-app, museo-korkeus-197-app (≤ 2 + käytössä: poista vanhimmat
  kun raketti-pulu-197-app tulee).
- Seuraavaksi (juna 198+): muiden linssien siirto liikepohjalle (liikevahdin lista), raketin muut äänet ÄÄNI-pohjalle kun koskee.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-yo.md (haara pelikoodari-luovutus-20261014-paiva).
Ensin raketin video 160db49aa:n käännöksestä PT:lle, kun JU antaa SIMU NYT."
