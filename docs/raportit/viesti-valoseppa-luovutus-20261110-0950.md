# Valosepän luovutus 10.11.2026 klo 09.50. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261110-0836:n)

Syy: konteksti 25 % (pehmeä raja), luonteva tauko: kolme ajoa JU:lla. Tili sami.reivinen@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Worktreet: k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31` (`linssiseppa2/pallon-elama-224` 62e148dae, puhdas, pushattu), k32 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k32` (nyt `linssiseppa2/eiffel-koodi` 013bf46dd, puhdas, pushattu). Kuvat vain JU:n vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; KS `local_7b57e35a-3a8e-4943-aba1-c960b9eb4671`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`. Työlista: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava VS`.

## ERÄ 1: EIFFEL KOODILLA VERTAILUUN (omistaja 09.36, PT 09.3x) – AVOIN, JU-AJO JONOSSA
- Suunnitelma `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-pariisin-nahtavyydet-koodilla.md` osa 1 (kolme ensimmäistä paria: Riemukaari, Notre-Dame, Eiffel; VS:lle PT antoi Eiffelin).
- Tehty **013bf46dd** (natiivi-backup `linssiseppa2/eiffel-koodi`, pohja palettihaara 4d3b91842): `Assets/Matkakirja/Kartta/OhjelmaKohdeEiffel.cs` (OSM way/5013364 + osat: jalanjälki 123,7 m, jalat 26,4 m, kerrokset 57,63/115,73/276,13 m, huippu 330 m; ristikko sauvoina, kaaret, tasanteet, paviljongit, kivijalat; värit paletin sisällä). Kohde OhjelmaKohteet.KaikkiKohteet: Lat 48.8582606, Lon 2.2944985, Akseli 45.8, MaaH 36.4. Komento `ohjelmakohteet eiffel 0|1` (OhjelmaKohteet.AsetaKoodiEiffel → Nahtavyysalue.KoodillaKorvatut piilottaa Tripo-mallin, pohja ja kyltti jäävät; kohteet rakennetaan uudelleen). Kartta-testit 734/734 (EiffelinMitat), unity 0 virhettä.
- OSM-aineisto ja analyysi: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/eiffel/` (hae-eiffel.mjs, osm.json, analysoi.py). Maa: `ohjelmakohteet/maa/maasto.py` korkeus(...)[0], jalat 36,3–38,7.
- AVOIN: JU ajaa Mac-esikatselun `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/eiffel/sk-eiffel-mac.txt` käännöksellä 013bf46dd → loki `lokit/linssiseppa2-eiffel-mac-013bf46dd` (6 kuvaa: tripo|koodi × lähi 0.00012/45°, viisto 0.00015/75°, kaukaa 0.0006/45°). Katso kuvat (sips -Z 1000 -kopiot), tee parit nykyinen vas | koodi oik kokonaisina, mittaa piirtokuorma: unity.log-rivi "MATKAKIRJA ohjelmakohteet: luotu, N verkkoa, K kolmiota" (Eiffel noin 10–11 t kolmiota) vs Tripo "nähtävyyslataus NotreDameKoe/eiffel" ja kehysajat ennen/jälkeen. Parit + luvut → PT (3 riviä), PT → KK. Laite kerrottava (Mac; iPad vasta pyynnöstä).
- Arvioitavaa kuvista: ristikon tiheys (sauvat 0,5–3 m, voi näyttää harvalta/tummalta kaukaa), kaarien paikka, 1. kerroksen paviljongit, jalan alapää (kulmapalkki 1 m maan alla kivijalan sisällä). Säätö: `EiUlkoH/EiSisaH`, `EiTasot()`, `EiKulma/EiRisti`.
- KS:lle lähetetty 09.4x ehdotus kytkimestä (`Nahtavyysalue.Koodilla(id)` + komento `koodimallit`); vastausta ei vielä. Kun KS:n kytkin tulee, kytke Eiffel siihen ja poista väliaikainen `KoodiEiffel`/`KoodillaKorvatut`, jos se korvaa ne.

## ERÄ 2: KARTTAPALETTI KAIKILLE KOHTEILLE – JUNASSA, ODOTTAA YHDISTÄMISTÄ
- **4d3b91842** (`linssiseppa2/paletti-kaikki`): karttapaletti_koodi.py portti kaikkiin OhjelmaKohde*.cs (glob, nimettömätkin Vari.H), 43 väriä muunnettu (Lontoo + Pompidou), nahtavyys-astc.py:n palettiautomaatti (rajan yli → muunnos ennen ASTC-pakkausta; nykyiset 13 mallia tavu tavulta ennallaan). PT 09.0x JUNAAN; JU 09.2x: MR4 jonossa MR3:n (NS museo 224.13) jälkeen → linkki 224.14.
- AVOIN: kun JU ilmoittaa yhdistäneensä → `tyolista.py valmis "Peruskartan väripaletti kaikille kohteille"` (PT: valmiiksi kun yhdistetty). Pari: `_tyo/linssiseppa2/paletti/paletti-cutty-sark-ennen-vas-jalkeen-oik.png` (PT kuittasi).

## ERÄ 3: PALLON ELÄMÄ JUNAAN (omistaja 08.13 "Kyllä, junaan") – JU-UUSINTA AJOSSA
- MR-haara `linssiseppa2/pallon-elama-224` = **62e148dae** (filmi ja pilvet vain Pariisin kartalla, KarttaPilvet.PariisinKarttaPaino; 6c648af87 EI junaan). Ensimmäinen ajo kaatui (JU: keskeytetyn 6c648-käännöksen jäämät T7-kopiossa, siirretty pois; vanhat kansiot -kaannosvika-0835).
- JU ajaa `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pallon-osat/sk-mr224b-ipad.txt` → `lokit/linssiseppa2-mr224b-ipad-62e148dae` (09.38 ajossa, ipad-yleis.zsh). Tarkista: tila-rivit "päällä kevyt", kartan huippu < 4080 Mt (pino1 3979), gfx-ero oletus vs pois ~ +25 Mt, m-oletus ≈ m-takaisin, m-ulkona (Lyon) ei filmiä/pilviä. Muisti: `muisti-tarkka.log` N-rivit: kenttä 2 = ms alusta, 4 = fp, 12 = gfx; merkit.txt kellonajat → ms = (aika − ALKU). Hyvä → PT:lle 3 riviä (sha, ajo, luvut); JU yhdistää junaan.

## ERÄ 4: PARIISI-PINO, KORTTI 3 MAALATTU TAIVAS – JU-UUSINTA JONOSSA
- Kansio `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/pariisi-pino-20261110/` (pohja `docs/moduulit/tuotantopohjat/kysymys-omistajalle.md`); kortit 1–2 päätetty 08.13.
- Kortti 3 luonnos `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pallon-osat/kortti3-maalattu-taivas-luonnos.md` (päätökset 6.11. 18.49, 22.15, 7.11. 14.46; suositus lopulliseksi). Täytä PERUSTELU_MUISTI, AIKA, MUISTI ajosta.
- JU ajaa `pallon-osat/sk-pino3-ipad.txt` (22e601e76) → `lokit/linssiseppa2-pino3-ipad-22e601e76` (kaksi kaatumista iPadin käynnistykseen, error 22; käsin toimii nyt). Pari 2000 px vas ilman | oik kanssa nimellä `3-maalattu-taivas-ipad-ilman-vas-kanssa-oik.png` + `3-maalattu-taivas.md` kansioon → polku PT:lle ja KK:lle. Kuvaskripti mallina `pallon-osat/pino1.py`.

## MUUT AVOIMET (ennallaan)
- FPV-vuoret it. 13 0809231b9 omistajan "Kelpaa" (jää FPV-kokeeseen), valmis.
- Merenpohjan syvyyden puristus 97b4f29a9 KS:n koelaatoilla, kun JU on vienyt ne. KS:lle avoin: kohokartan poltetun varjostuksen suunta 315°?
- Kohokartan aurinko (cd74573cd junassa 223): syvyyskuva varmistettava laiteajossa.
- Valovahti: Aurinko.cs vari 4 > 3, KartanElama.cs, KaupunkiPuu.shader ylittävät jo ennestään.
- Remote Control: ei tehdä. Asemataulu jäädytetty (työlista tyolista.py:llä).

## TEKNIIKKA
Numpy/cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I` (myös karttapaletti.py); PIL `/opt/homebrew/bin/python3 -I`. `sh ./unity-tarkistus.sh` kansiosta `Linssit-testit/` (~2 min); `sh Kartta-testit/kaanna.sh` (geometriatestit, uusi .cs lisättävä listaan). zsh: `$R:t…` ja `echo ==` rikkovat komennon (käytä lainausmerkkejä/'--'). Muokkaukset python-skriptillä (.tmp + os.replace + copymode). Luovutus plumbingilla origin/mainin päälle omaan haaraan.
