# Natiivi-UI: luovutus 7.11.2026 klo 23.52 (kohta 8 ja kohokartta Mac-ajoissa JU:lla)

Korvaa luovutuksen -2208 (aab93be4f). Kohdat, joita tässä ei ole kirjoitettu uudelleen (muistin vaihe 1, kartan elämä, varjostinselvitys, kyltit, kahdeksan huutoa, junasta kerrottu, opit), ovat ennallaan siinä tiedostossa: lue ne sieltä (git show aab93be4f:docs/raportit/viesti-natiivi-ui-luovutus-20261107-2208.md).
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, NS local_99130238-aa54-4a29-bcc9-7a023584944b, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus on nyt haaralla natiivi-ui/kohokartta (puhdas). Kartan elämän haara natiivi-ui/kartan-elama ebec14c89 on etäpäässä. Kääntö sh Peli-testit/unity-tarkistus.sh, linssitestit sh Linssit-testit/kaanna.sh [nimi], pohjavahti python3 -I tyokalut/pohjavahti.py. Ajoja ei tehdä itse: vuoro JU:lta.

## 1. Pariisi kohta 8: odottaa JU:n Mac-ajoa (jonossa muistijonon jälkeen, JU vahvisti)
Haara natiivi-ui/nimet-reuna, kärki 2c12b920a, pohja 2f64c2eee (juna 220:n kärki). Kääntyy, pohjavahti ok, ei ajettu. Ei junaan ilman PT:n sanaa.
- ffec8fdc4 Nimikerros.cs: kaikki nimet kokonaan tai ei ollenkaan (aiemmin reunasääntö vain suurkaupungeille, alueille ja joille). Tallenteessa "…e Cluny" katkesi vasempaan reunaan levossa ja kierrossa.
- 2c12b920a NostotKartalla.Hae: uusi nosto ei vie elementtiä nostolta, joka on yhä listassa (naytettavatIdt). Tallenne, ruutu 525: Tuileries ja Galerie des Machines katosivat samassa ruudussa ja häipyivät takaisin. Syy päätelty koodista.
Ajo: skenaario _tyo/natiivi-ui/sk-nimet-reuna-1.txt, tulos lokit/nui-nimet-reuna-1-2c12b920a (JU: mp4). Katso: Cluny reunalla ruudut alussa, ruudut noin 520–535 (Tuileries ei katoa), uusi välke reunalla? Kohdistus: lokin "kyltti syy" t − 16,2 = peliaika; ruutu = (peliaika − alku) / 0,02.
Havainnot ja järjestys: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kohta8-auki-20261107.md (osio "Tallenteet katsottu"). Vanha "reuna palauttaa 20–40 ms:ssä" ei ole oma vika. Nimet kulkevat vain tavallisten talojen yli otosruuduissa.
PT:lle raportoitu 22.1x. Työlistan rivi "Pariisin nimet: katoaminen ja rakennusten yli kulku" päivitetty 23.43.

## 2. Kohokartta Topografiaan (OMISTAJAN PÄÄTÖS 23.38/23.40 PT:n kautta 23.5x): odottaa Mac-ajoa
Haara natiivi-ui/kohokartta, kärki b276782bd: pohja 2f64c2eee + KS:n 271ae4e62 poiminta (45c18a1ed: normaali enintään 2 varjostimessa, komento topografia sarja) + oma commit. Testit 2255/2255, kääntyy, ei ajettu. Ei junaan ilman kuittausta.
- Topografia.cs: KohokarttaSarja (null = kytkin piilossa), AsetaKohokartta, kerrokset "topografia" ja "topografia-koho"; vanha pois vasta uuden ollessa Valmis; Luovutti = topokartta jää. Kerroin 15 vain kohokartassa, palaa kytkimellä ja suljettaessa (koukut KerroinNyt/AsetaKerroin LinssiOhjaimessa). Linssi aukeaa aina topokarttana (PT:n viesti; suunnitelman "valinta muistetaan" ei päde).
- LinssiUi: kytkin (Ohjausnappi.Kytkin, Topografian oma ikoni, "Kohokartta") ☰:n vasemmalla karttavalikon ryhmässä.
- KorkeusKerroin.Suurin 15 (KS:n koe 60, juna 3).
- Komennot: linssi topografia koho <url>|pois, linssi topografia kohokartta 1|0.
Ajo: skenaario _tyo/natiivi-ui/sk-kohokartta-kytkin-1.txt (5 kuvaa, KS:n v4-laatat), tulos lokit/nui-kohokartta-kytkin-1-b276782bd; JU:lle kerrottu, että varjostin muuttuu. Kuvat PT:lle (kytkin, molemmat tilat), PT vie KK:lle.
Auki: (a) koko maailman sarjan osoite KS/JU:lta, sitten KohokarttaSarja-oletus koodiin; (b) selite on yhä topokartan, KS antaa kohokartan rivit; (c) MissingReferenceException (PalloKierto.PuoliKulma) linssistä palatessa tutkimatta; (d) esilataus (LinssienEsilataaja) ei hae kohokarttaa; (e) iPad-ajo vasta suunnitelman kohdassa 7.
Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-topografia-reliefi.md.

## Opit (uudet)
- Nosto-merkkien elementit ovat poolissa indeksin mukaan: uusi nosto listan alussa vei ennen kaikkien perässä tulevien elementit (katoaminen + häivytys takaisin).
- Linssitestien tiedostossa on useita luokkia: lisää testit oman apufunktion kanssa, Luo() on yksityinen toisessa luokassa.
- Zsh: "$J:Assets" → kirjoita "${J}:Assets" (muuten :A on muunnos).
