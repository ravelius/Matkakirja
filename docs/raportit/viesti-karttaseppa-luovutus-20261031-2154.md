# Karttaseppä: luovutus 31.10.2026 klo 21.54

Edellinen luovutus: cd80af79a (PR 5695, 31.10. 01.40). Nollaus PT:n pyynnöstä (konteksti 75 %, kova raja ylittyi).

**Miksi konteksti kasvoi 75 %:iin:** eniten söivät kuvat. Ne olivat vertailukuvia, simukuvia, G-referenssejä ja koepaloja,
noin 40 kpl täysikokoisina luettuina. Toiseksi eniten söivät pitkät koodilukemat natiivista (PalloKierto, NostotKartalla,
Komennot) ja testitulosteet. Seuraavalla kerralla kuvat luetaan pieninä yhdistelminä ja koodista vain haetut rivit.

## Valmiit tässä vuorossa (kaikki mainissa ja viety, JU)
- PR 5708 (tasaus 125 kaupunkia, 958 piirrosta), PR 5716 (Mustapäät, Vilna), PR 5720 (ihmeet 1–2 + Sibeliuksen
  puisto), PR 5727 (ihmeet 3–4, kaikki 43, Radialsystem V, Templen uusi kohtaus, kainalot Moskova/Bukarest/Pietari
  + aiemmat Istanbul/Lontoo). PR 5712 suljettu päällekkäisenä. Työkalut: proto-3d/_tyo/karttaseppa/ihmeet-kytke.py,
  ihmeet-kohteet.json, miniatyyrimanifestit.py.

## PARIISIN PIIRROSKARTTA (juna 216 odottaa tätä: omistaja 21.08 "julkaise juna, kun Pariisin uusi kartta valmistuu")
Kaikki tiedostot ovat kansiossa `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/`.

1. **Lukittu pohja** (postilaatikko 1af3ccf98): koko kaupunki (OSM relation 7444, 276 649 rakennusta). Projektio on sovitettu
   G-kuvaan: X = E, Y = −0,85 N − 0,527 h, pohjoinen ylös ja kamerakulma 58,2° alas (natiivissa 31,8° pystystä).
   Skriptit: hae-osm.py, piirra-pohja.py → tulos/ (manifest.json, palat 5×7, maski). OSM-data osm/ (459 Mt).
2. **Hybridi** (PT 21.2x). Codexin kuvageneraattori ei lukitse geometriaa (posti 1d986baa7), joten:
   - Karttaseppä renderöi tavallisen kaupungin G-tyyliin: renderoi-g.py (tarkkuus 2 = 1 m/px; korkeuskerroin 2,6;
     talot sisennetty 1,5 m; puut bulevardeilla, laitureilla ja puistoissa; kattoikkunat; maski häivyttää rajan ulkopuolen).
     Koko kaupunki on renderöity: tulos-g/laatat-x2/<r>-<c>.png, 55 laattaa à 2048 px (renderoi-g-laatat.py, 4 rinnakkain;
     ÄLÄ käytä .sh-versiota, sen rinnakkaisrajoitin ei toimi ja se käynnisti kaikki 55 kerralla).
   - Codex tekee 9 maamerkkiä ja elävät hahmot läpinäkyvinä (tilaus 88455ded8: Eiffel, Notre-Dame, Louvre, Sacré-Cœur,
     Riemukaari + Sainte-Chapelle, Garnier, Invalides, Panthéon; puut, ihmiset, autot, veneet, koneet, kahvilat).
     Maamerkkien alla olevat OSM-talot jätetään renderöinnistä pois (MAAMERKKI_ID). Ei vielä toimitettu.
   - Kokoaja: kokoa-g.py sijoittaa maamerkit ankkureihin (leveys × liioittelu, jalusta ankkurissa) → kokoelma/G/natiivi/
     <r>-<c>.jpg + -maski.jpg + natiivi.json ja web-5184.webp. Hahmojen sijoittelu puuttuu vielä: lisää renderoi-g.py:n
     maalausjonoon (ihmiset jalkakäytäville ja laitureille, autot kaduille suunnan mukaan, veneet Seinelle).
3. **Koepala r3-c4** PT:lle: koepala/r3-c4-vs-G.png (v1, 2 m/px). **PT:n palaute** (21.4x): viivatyö, vaaleus, talot
   pienoismalleina, Seine, puut, valo. **SEURAAVA ON UUSI KOEPALA** palautteen mukaan, 1 m/px ja mieluiten Codexin
   Notre-Damen kanssa, ENNEN koko kaupungin uusintaa. Komento: `python3 -I renderoi-g.py tarkkuus 2 rajaus 9150 4500 10686 5524`
   (Cité ja Saint-Louis). Vertailu G:hen: G-alkuperäinen on postissa 1d986baa7 (owner-style-G-confirmed.jpg).
4. **Natiivikerros** (proto, paikallinen repo, ei pushia): haara `karttaseppa/piirros-pariisi-216`, kärki **c7700d99c**
   (sisältää NUI:n Suorista-napin, merge natiivi-ui/suorista-216).
   - Kartta/PiirrosKerros.cs + Resources/PiirrosKerros.shader: laatat maanpinnalle (h 80 m ellipsoidista), ZTest Always.
     Häivytys kulman (±3–12°) ja korkeuden (25–60 km) mukaan, kamera kääntyy saapuessa piirroskulmaan, Suorista,
     pehmeä reuna maskista. Laatat ladataan kameran läheltä GPU-pakattuina ja kaukaiset vapautetaan.
   - Pariisin ruudukko on vakioina (20736×9728, 2048, rajat). Aineisto: `media.matkakirja.app/kohtaamiset/piirroskartta/pariisi/`
     <r>-<c>.jpg ja -maski.jpg (vie-assetit-perhe "piirroskartta" pitää vielä lisätä webiin, ks. 5). Kehitykseen
     MATKAKIRJA_PIIRROS=<kansio>.
   - Simu (00b0ac3ac, pienoismallilla): toimii, kuvat proto-3d/lokit/karttaseppa-piirros-20261031-2059/kolmikko.png.
     Simuskripti ajo-simu-piirros.zsh (bundle app.matkakirja.proto3d). Oma simu karttaseppa-iPhone18 D9822C57.
   - c7700d99c:tä (laiska lataus) EI ole vielä käännetty: pyydä JU:lta käännös.
5. **Web**: haara `karttaseppa-pariisi-piirros` **f9657ff11** (5665/0). Kohdekartalla on piirroskartta, miniatyyrit piilossa,
   tähdet ja nimiöt jäävät, merkit ilman hajautusta, pystykerroin 0,85. Kuvana vielä pienoismalli → vaihda kokoelma/G/web-5184.webp
   `assets/kartat/piirroskartta/pariisi-piirros.webp`:ksi. Natiivilaatat: lisää js/media.js ASSET_KANSIOT `piirroskartta`
   ja vie-assetit-vaihtoehto, mutta pidä webkuva kansion ulkopuolella (esim. assets/kartat/pariisi-piirroskartta.webp),
   jotta mediaskeema ei vaadi asset-piirroskartta-lajia. Poista nykyiset koelaatat assets/kartat/piirroskartta/pariisi/.
6. **Valmis-ehto** (PT): webin ja natiivin PR:t, NS yhdistää junaan, ja KK:lle kuvapari pelistä G-kuvan rinnalla samasta kulmasta.

## Muut avoimet
- NS:n muistimittaus juoksupelin haarasta 9287cb95e. Koe D iPadilla, kun LT ilmoittaa iPadin vapaaksi.
- Worktreet: wt/proto-karttaseppa-piirros-pariisi (natiivi) ja wt/karttaseppa-pariisi-piirros (web). Muut ihme-worktreet on poistettu.
