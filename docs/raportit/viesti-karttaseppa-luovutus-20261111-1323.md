# Karttaseppä: luovutus 11.11.2026 klo 13.23 (KS)
Syy: konteksti pehmeällä rajalla (25 %). Korvaa -1223:n; taustat ja ketju: `git show 621b77e8d:docs/raportit/viesti-karttaseppa-luovutus-20261111-1223.md`
(ja sen -1201 / -1142 / -1104 / -1027 / -1000 / -0926: tyyliohje, testikomennot, zpiirra.py, raivausputki, talot_paketti.py, pallo, Overture).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, VS local_5ebb0658-96f6-434d-8a38-b122eb53032f,
Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, nyt haarassa karttaseppa/runko (2743a6ebd), puhdas, pushattu natiivi-backupiin.
HUOM: ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`. Tämän repon luovutukset: `git push origin HEAD:refs/heads/karttaseppa-luovutus-<aika>`.
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
K = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna (T7-symlinkki: find tarvitsee -L).

## Tehty 12.25–13.23
- Talot v16 KOOTTU: K/talot-paketti-pariisi-v16 (palat-v41-pp, 219 palaa, päivitys v15 → v16: 1 pala 0,4 Mt). Ämpäriin vasta KK:n OK:lla PP-junaehdokkaalle (PT 13.0x vahvisti).
- Overture-mittaus (jono 4) valmis: docs/raportit/karttaseppa-overture-mittaus-pariisi-20261111.md (621b77e8d). Pariisissa 98,7 % OSM → ei käyttöön. PT:lle ilmoitettu.
- VS:n kysymys striimikartasta vastattu (pohja Z0–Z10 jpg, elävä Z11–Z17, paperi/varjo Z10:stä 101 m/px). KK päätti suunnitelmassa: ei esipoltettua Z12/13-pohjaa.
- PETIT PALAIS: KK 13.0x MUOTO HYVÄKSYTTY. Kaarisyvennys tummennettu (varjostimessa ei omia varjoja): 4b8ae2d47 (karttaseppa/petit-palais). JU 13.1x: KJ42 = 4b8ae2d47, ajetaan KJ37:n jälkeen Macilla, "KJ42 LOPPU" -rivi tulee KS:lle.
- JU 13.08: 224.66 (Orsay + talot v13) jakelussa; MR60 v14 → 224.67 seuraavaksi.
- SAUMAT JA MÄET (KK 14.0x, suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-saumat-ja-maet.md luvut 3–6):
  TYÖ 1 RUNGON RAJAT VALMIS: 2743a6ebd (natiivi-backup karttaseppa/runko, pohja 613f55c18). `Bounds OhjelmaKohteet.RungonRajat(Mesh)`, Rakentaja.Ulko / Verkko.Ulko;
  ulkona SC terassi+portaat, Louvren kiveys+altaat, Opéran ja GP:n portaat. Testi RungonRajatIlmanPortaitaJaKiveysta. 758/912/unity 0.
  NUI:lle rajapinta + sha ilmoitettu; NUI tekee parin päälle (TaysiMalli :807, MahtuvaKerroin :290, Naytteet) ja arkki-2-ajon. Junaan KK:n katsottua arkin.
  HUOM: Petit Palais (karttaseppa/petit-palais) ei ole runko-haarassa; PP:n portaat merkitään Ulko-lipulla, kun ne yhdistetään (PpPortti: portaat + patsasjalustat).
  TYÖ 2 MONTMARTRE: viisi riviä lähetetty KK:lle 13.2x, ODOTTAA KK:N PÄÄTÖSTÄ (RGE ALTI + tarkempi maasto vai ensin z12-parit). Ei koodia ennen sitä. Ydin:
  - Talon pohja on jo verteksissä (MT02 normaali.w = talon pohja palan maasta, IGN altitude_minimale_sol; TaloKerros.shader vert: y = pohja + … + tasaus·(_maaTasaRajat.z − _PalaH − pohja)).
    Poltettu 2×-kaavalla tee-palat.py:315– (2·(maa+15) − LAKI_LASKU). Talokone: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/tee-palat.py.
  - Kaava (a): ruutu = 90 + (1 − w)·(h − reunaH), w = KartanTasaus-paino; mäkialuelista (keskus, säde, liuku, reunaH) KorkeusKerroin-tasolle (nyt TasaReika* -vakiot :132–135).
  - Maasto: z12 Montmartren laatta 4149/3160 = 336 kärkeä (~216 m väli), maxzoom 12 → ei riitä ≤ 2 m:iin. Ehdotus: z13–z15 IGN RGE ALTI 5 m alueelle + sama DEM taloille, kirkolle, portaille, nimille.
  - Rikkoutuvat: kartan laattavarjostin (tee_tileset.py KORKEUS_RUNKO), TaloKerros, KorkeusKerroin.Sovita, MontmartreKorkeus, SC MaaH 130,5 + ScRinne (Tripo-mäestä), Tripo-mäki Nahtavyysalue.cs:329.
  - EI JUNAAN: omistajan kortti kuvaparista (Raamattu 2.206). Parit Macilla: esityskamera 4 suuntaa, Place Saint-Pierre ylös, 5 km, lähin; mitat raporttiin.

## Jono
1) KJ42 (JU, 4b8ae2d47) → parit (ennen | koodi, esityskamera 4 suuntaa ~120 m) SUORAAN KK:lle, kopio PT. Katso itse: kaarisyvennys syvä (portti erottuu),
   takaosan "pinnan alla" (rotundat ~5 m maaston alla, syvyysveto 60 m piirtää ne maan päälle – näkyykö virheenä takasuunnasta). KK OK → junaehdokas:
   613f55c18 (tai MR61:n kärki) + PP-commitit (182edf30c, eab6f7ad2, 4b8ae2d47) + "petit-palais" Koodimallit.Oletukseen + talot v16 (ämpäriin).
2) KJ37 pallo (JU) → KK:n 4 kohtaa (ks. -1027 jono 1) + esityskamera; parit SUORAAN KK:lle (kopio PT), ajon kansio NUI:lle.
3) Rungon rajat: NUI:n sha → KK katsoo arkin → junaan (yhdessä NUI:n kanssa, JU).
4) Montmartre: KK:n päätös → toteutus kuten yllä.
5) Junaehdokas 613f55c18 (MR61 → 224.68) JU:n jonossa. Ei tekemistä, ellei JU kysy.
Koehaarat (ei junaan sellaisenaan): karttaseppa/sc-osm-paikka 35c1dd1a1, karttaseppa/kohteet-arkki-syvyys 42e9543f7, karttaseppa/pallo-koe 2cf7b7e48, karttaseppa/petit-palais 4b8ae2d47, karttaseppa/runko 2743a6ebd.
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty, talot-paketti-pariisi-v15-v39-ALA-VIE. Ämpärin versionumeroa ei käytetä uudelleen (seuraava vapaa = v17).
Isolla iPadilla vain KK:n nimeämä valmis kokonaisuus (omistaja 12.21); kaikki kokeet Macilla.

## LISÄYS 13.3x: KJ37 katsottu (JU 13.28: rc 0, 12/12, kansio proto-3d/lokit/karttaseppa-pallo-kj37-2cf7b7e48)
Parit KK:lle (kopio PT): K/parit-kj37/ (pari-yleis, -ita, -louvre, -lahin-pelikamera, -lahin-rajaus.jpg). NUI:lle kansio + kysymys varjon omistajasta.
Löydökset: (1) yleisnäkymässä pallo ei erotu, kyltti kantaa; (2) pallon alla iso vaalea kermakiekko erottuu oliivipuistosta → pois tai kartan oliivi;
(3) KAKSI VARJOA: ruskea soikio kiekon vasemmalla = sama kohta kuin ennen-kuvan UI-pallon varjo (jää, vaikka UI-pallo piiloutuu) + koodipallon oma; (4) vanha UI-pallo ei näy ✓.
SEURAAVA: odota KK:n linja → korjaa karttaseppa/pallo-koe (2cf7b7e48; KpLaikka = tallattu ympyrä) + vanha varjo piiloon (NUI:n vai KS:n koodi?) → uusi KJ JU:lle.
KJ42 (4b8ae2d47) alkaa JU:lla KJ37:n jälkeen.

## LISÄYS 2, 13.3x: KK:N PÄÄTÖS TYÖHÖN 2 (MONTMARTRE), aloita tästä
Lue /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-saumat-ja-maet.md luvut 4–8 (luku 8 = päätös).
- Tarkempi maasto mäkialueelle IGN RGE ALTI 5 m -mallista, EI koeajoa z12:lla. Tasot 13–15, kärkiväli rinteessä enintään noin 10 m.
- YKSI korkeuslähde (RGE ALTI): maasto, talot v17 (vain Montmartren palat), kirkon lattia, portaat, nimet ja merkit.
- Kaava hyväksytty: ruutu = 90 + (1 − w)·(h − reunaH), w = nykyinen tasauspaino; reunaH = ulkokehän mediaanikorkeus, ei leikkausta alapäästä.
- Järjestys: maastolaatat ja kaava → talot v17 → kirkko, portaat ja nimet → Mac-parit.
- Näyttö: lähin-kuvassa ei särmiä rinteessä; mäkialueen reunalla ei porrasta eikä rakoa karkeampaan laattaan; talon pohja ≤ 2 m, portaat ≤ 1 m, nousu 0,9–1,2 × kirkon korkeus.
- Lisenssi Licence Ouverte (kuten BD TOPO), lähdemaininta IGN tekijälistaan (PT kirjaa). Ei ostoja. robots.txt ennen skriptattua hakua.
- EI junaan ennen omistajan korttia kuvaparista (Raamattu 2.206).
- Maastoputki: Rakennus.MaastoUrl julisteet/maasto/2026-10-29-maailma (quantized-mesh, EPSG:4326, octvertexnormals, maxzoom 12, available-listat layer.jsonissa);
  Montmartren z12-laatta 12/4149/3160 (336 kärkeä). Tarkemmat tasot = uusi maastoversio ämpäriin (JU) + layer.json available z13–15 vain alueelle (MaastoLaatat.cs:63–100 lukee available).
Työ 1 (2743a6ebd) KK kuitannut: KK katsoo NUI:n arkki-2-ajon, sitten junaan.
