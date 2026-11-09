# Natiivi-UI: luovutus 9.11.2026 klo 16.16 (kontekstivahti 27 %; korvaa -1545:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd. Kuvat ensin PT:lle (3 riviä).
Lokit /Users/Shared/Claude/proto-3d/lokit/, skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/. Esikatseluajot pyydetään JU:lta.
Arkki: kopioi /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/7f2356d1-d016-4ad2-9683-d7bab2cf1c74/scratchpad/arkki.py
omaan scratchpadiin (python3 -I arkki.py ulos.jpg sarakkeet otsikko kuva1 nimi1 …; ei ▾-merkkiä nimiin, Arial ei piirrä sitä).
Tarkistus worktreessä: `sh Linssit-testit/unity-tarkistus.sh` ja `python3 -I tyokalut/pohjavahti.py` (suora Color → vari-virhe: käytä Tyylikirja.*).

## 1. ETUSIJA (PT 16.1x, juna 223, pieni iPad): TEMPLE-TORNIN ORBIT – KESKEN, EI KOODIA VIELÄ
OMISTAJA 16.12: "templetornin piste ja teksti liikkuvat kartalla, vaikka niiden pitäisi pysyä paikallaan orbit-kerron aikana. Ja tuossa
varmaan pitäisi näkyä se kolmiulotteinen tähti, kun on unohdettu aarre." Kuvat Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261109/
1612-temple-orbit-kuva1.png ja -kuva2.png (pieni iPad, Temple-torni 1/2 palkkina, orbit käynnissä).
Haara: natiivi-backup natiivi-ui/temple-orbit (julkaisija/juna-223 d273729e2:n päältä), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-temple.
Kärki a73c5c202 = vain kohta 2 (valikko). Tee Temple samaan haaraan.

Selvitetty (Sonnet-Explore, ei vielä varmistettu ajossa):
- Merkki: Kohdenostot.Ruudulla (UI/Kohdenostot.cs ~99–113) → s.Lat/Lon = OmaLat + (kuvapiste − OmaLat) × PiirrosKerros.Nakyvyys,
  korkeus MaanPinta.Nosto (Kartta/MaanPinta.cs 66–97: KorkeusKerroin.Sovita, tasaisella ~90 m, × (1 − Nakyvyys)) →
  PalloKierto.RuutuPiste (NakyvaLat-siirto). NostotKartalla.Paivita (LateUpdate) + SeuraaKameraa (KameranJalkeen, vain liikkeessä)
  siirtää elementtiä Ankkuri-erotuksella; kyltin kylki/Sovita vain levossa.
- Orbitin keskus: NostotKartalla.AvaaNosto (~768) → merkin napautuksella m.Lat/m.Lon (sekoitettu), viuhkalla OmaLat; NahtavyysEsittely
  Mitat() voi vaihtaa 3D-mallin jalkaan (Templellä tuskin malli); AjaKiertaen kiertää lat/lon maan pinnalla ilman pinta-korkeutta.
- Kuvissa merkki pysyy samassa ruutukohdassa ja kartta kiertää sen ympäri → keskus ≈ merkki. Epäilyt: (a) merkin korkeus (Sovita ~90 m)
  ≠ näkyvä maa (piirroslaatat) → kallistuksen/etäisyyden muuttuessa merkki irtoaa maasta pystysuunnassa; (b) Nakyvyys-sekoitus
  vaihtaa lat/lon/korkeutta kesken lennon; (c) SeuraaKameraa-kehysviive. SEURAAVA ASKEL: Mac-ajo (pieni iPad -koko) Temple-torni
  napautuksella, 3–4 kuvaa orbitin aikana + lokiin merkin Lat/Lon/pinta ja kierron keskus → vertaa, kumpi liikkuu suhteessa maahan.
- 3D-tähti: Kartta/PiirrosKerros.Tahdet.cs piirtää 9 pyörivää tähteä (Temple-torni ensimmäisenä, 48.865195, 2.360455) VAIN
  PiirrosKerroksen (vanha litteä piirros, alfa = Nakyvyys) näkyessä; orbit-näkymässä (piirroslaatat) tähteä ei ole. Tarvitaan tähti
  myös kartalla ilman PiirrosKerrosta (esim. sama 72 ruudun PNG-silmukka billboardina kadonneen merkin kohdalle, kytkin Kadonneet).
  Tarkista ensin KS:n/Valosepän tekemät tähdet (grep tahti muiden haaroista) ja kysy PT:ltä, jos tekijä on toinen rooli.
- Valmis: korjaus + pieni iPad -arkki orbitista (2 kuvaa eri kulmissa) PT:lle → junaan 223.

## 2. VALIKKO (OMISTAJAN PÄÄTÖS 16.13) – KOODI VALMIS a73c5c202, AJO PUUTTUU
KaupunkiNostovalikko.KaupunginNahtavyydet: kadonneet (Kohdenostot.KadonnutKyltti; muun kaupungin kartalta hahmotelma-nosto) pois
Nähtävyydet-listasta. Odotus Pariisissa: "Nähtävyydet (12), Kadonneet ihmeet (9)" (ennen 21 + 9, lokirivi "ui nostovalikko: pariisi,
kategoriat …"). Kuva valikosta pieni iPad, Pariisi, Kadonneet-kytkin päällä → PT. Aja samassa skenaariossa kuin kohta 1.

## 3. FPV-KOE: PALLON NIMI + VALKOINEN TIETORIVI – AJO JU:LLA (EO2, pid 93239)
Haara natiivi-backup natiivi-ui/fpv-napit = 14f9398b8 (88954ff55 nimi pallon alle → c143a7064 lihava + tumma varjo, pitkä nimi
kutistuu, HUD varaa nimelle tilan → 14f9398b8 OMISTAJA 16.10 tietorivi ja nimi valkoisiksi). Skenaario sk-fpv-nimi-1.txt.
Lokit lokit/nui-fpv-nimi-1-{iphone,ipad}-14f9398b8. KATSO: nimi valkoinen, luettava vaalealla taivaalla, KÖÖPENHAMINA ei ylitä
HUD-kaarta (k-2), tietorivi "FPV · m · km/h" valkoinen, punainen piste ennallaan, HUD-kaari ei liian pieni → arkki PT:lle
(sama kuin lokit/nui-fpv-nimi-1-ipad-88954ff55/arkki-fpv-nimi-1.jpg). KOE, ei junaan.

## 4. NÄHTÄVYYSPALKIN SELAUS + KAUPUNKINIMI – iPhone katsottu ok, iPad ajossa (JU EL)
Haara natiivi-backup natiivi-ui/palkki-aina = aa46f41db (0bf9cd57d + Kohdenostot.Naapuri, Nahtavyysarkki Askel/VoiAskeltaa;
palkin alla arkin oma ‹ › piiloon). sk-palkki-nahtavyys-1.txt. iPhone ok: ‹[Marseille]›, b-1 › katedraali, b-3 arkki vaihtuu
Saint-Victoriin palkin alla, b-4 Marseillen valikko, b-5 ‹ takaisin; arkki lokit/nui-palkki-nahtavyys-1-iphone-aa46f41db/
arkki-palkki-nahtavyys-1-iphone.jpg (kuvateksti "Marseille □" = Arialin puuttuva ▾, tee uudelleen ilman merkkiä).
JÄLJELLÄ: iPad lokit/nui-palkki-nahtavyys-1-ipad-aa46f41db → yhteisarkki iPhone + iPad PT:lle (PT vie junaan).

## 5. Vahti
Taustavahti pysäytetty. Käynnistä oma: odota lokit/nui-fpv-nimi-1-*-14f9398b8 ja nui-palkki-nahtavyys-1-ipad-aa46f41db (rivi "valmis N s").
