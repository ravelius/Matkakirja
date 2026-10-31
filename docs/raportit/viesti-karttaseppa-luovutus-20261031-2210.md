# Karttaseppä: luovutus 31.10.2026 klo 22.10
Edellinen luovutus: 2968cec51 (21.54). Nollaus PT:n pyynnöstä: viikkokäyttö 90 % (raja 92 %). Vuorossa vain uusi koepala;
muu tila ennallaan (kohdat 1–6 edellisestä luovutuksesta alla).

## UUSI KOEPALA (tehty 22.04, odottaa PT:n kuittausta)
- `pariisi-pohja/renderoi-g2.py` (uusi; renderoi-g.py jäi vertailuksi): kadut levennetään (w·1,3+5 m) ja talot
  leikataan niitä ja vettä vasten; talo pursotetaan rasterina (numpy) → mustekehys joka talolle, kermajulkisivu
  ikkunariveineen ja kivijalkoineen, vaalea mansardikatto sinkkikansineen ja kattoikkunoineen, korkeus vaihtelee
  talosta toiseen (KORKEUSKERROIN 1,5). Turkoosi Seine, kivilaituri ja aaltoviirut; saaret = sisärenkaat jäävät maaksi.
  Puurivit kaduille, joiden perusleveys ≥ 13 m (9 m välein molemmin puolin).
- AJA ILMAN -I:tä (numpy on käyttäjän site-packagesissa): `G_MAAMERKIT=1 G_ULOS=koepala/r3-c4-g2-v2.png python3
  renderoi-g2.py tarkkuus 2 rajaus 9150 4500 10686 5524` (~1 min). G_MAAMERKIT=1 piirtää maamerkit tavallisina
  taloina (Notre-Dame nyt laatikkona, kunnes Codexin sprite tulee; tilaus 88455ded8, ei vielä toimitettu 22.05).
- Kuvapari PT:lle lähetetty 22.04 (jonossa): `pariisi-pohja/koepala/r3-c4-g2-v2-vs-G.jpg`.
- SEURAAVA: v3 (alla) → PT:n kuittaus → koko kaupunki renderoi-g2.py:llä. renderoi-g-laatat.py kutsuu vielä
  renderoi-g.py:tä: vaihda skriptiksi renderoi-g2.py ja poista -I, sitten 55 laattaa (4 rinnakkain), kokoa-g.py. Talomassat yhä laattamaisia.
- **CODEXIN 9 MAAMERKKIÄ 184ecedad** (posti, SHA256 9/9 täsmää; ei vielä kytketty). Kuvat vain postin commitissa:
  `git show 184ecedad:proto-3d/_tyo/codex/pariisi-spritet/maamerkki-<nimi>.png`, ankkurit posti/codex-pariisi-spritet-
  maamerkit-20261031/manifest.json. Kytke kokoa-g.py:llä v3-koepalaan (ilman G_MAAMERKIT=1). Hahmoerä tulossa.

## PT:N PALAUTE v2:STA (22.1x): TEE v3 ENNEN KOKO KAUPUNKIA
Korjaukset (katot, korttelien yleistys ja korkeus ×1,5, isot puut, laiturimuurit, lämpimät julkisivut ja vahva muste):
`docs/raportit/viesti-karttaseppa-pariisi-v3-korjaukset-20261031.md`. Kuvapari v3:sta PT:lle; koko kaupunki vasta uudella tilillä.

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
3. **Koepala v1** (koepala/r3-c4-vs-G.png) hylätty; v2 ja v3 yllä. G-alkuperäinen: posti 1d986baa7 (owner-style-G-confirmed.jpg).
4. **Natiivikerros** (proto, paikallinen repo, ei pushia): haara `karttaseppa/piirros-pariisi-216`, kärki **c7700d99c** (sisältää NUI:n Suorista-napin, merge natiivi-ui/suorista-216).
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
