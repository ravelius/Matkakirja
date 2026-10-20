# Pelikoodarin luovutus 20.10.2026 klo 18.05 (tilinvaihto KK:n mukaan ~18.10–18.15)

Edellinen: viesti-pelikoodari-luovutus-20261020-1735.md (historia; sen ENSIN-kohdat tehty).
Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia), worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206,
haara **pelikoodari/avaus-208 = 177560643**. Seurannan ulkopuolella vain Peli-testit/Testit/TilapainenVerkkoVienti.cs (EI committia).

## RUNGOSSA (NS)
- Äänikärki ae4c2cdde → runko 208 d6752dca5; laattakorjaus 177560643 → runko 208 **37d8e8507** (NS: KK saa ensin a6d6341aa:n, tämän päivitykseksi ~18.10).
- Avauserä avaus-208: JuoksuAvaus (aikajana, drone, Puyi bottina), avausmusiikki **Lyria a** (JuoksuMusiikki.Avaus = audio/juoksupeli/
  avaus-musiikki-v2/avaus-erhu-lyria-a.mp3; omistaja 17.45 "a versio on oikein hyvä, pidetään se"; Freesound-erhu hylätty 17.38),
  ristihäivytys 4 s tason musiikkiin **Puyin huudolla** (PuyiHuutaa 6,2 s; ohitus laukaisee). Huudot JuoksuAvausHuudot: 01 karkasi 4,2 s,
  03 (avaus-puhe-v2) 4,8 s taustalla 0,45 ilman tekstiä, 02 palatkaa 5,4 s 0,75, 04 Puyi 6,2 s; tekstit tekstit.fi.json juoksupeli.avaus.*;
  ohitettu lento äänetön. QA `ui juoksupeli avaus nyt`, loki "MATKAKIRJA juoksupeli avaus: huuto …" / "musiikki avaus".

## LAATAT (omistaja 17.42 ja 17.5x: vanha vika, ei kiire; KK: ensisijaisesti lähdekorjaus)
- Syy: Lavastajan kielletty-tausta-v4 tyhjensi tarkkojen mallien (A, F, G, L, M, B, C, D) kohdat kokonaisina kolmioina, jotka ulottuvat
  mallin ulkopuolelle → ~25 000 m² aukkoja (suurimmat Meridiaaniportin edessä/pohjoispuolella ja Taihemenin portaiden edessä); aukoista
  näkyy sokkelon horisonttilattia −4,5 m (omistaja: "laattoja näkyy niiden alla"). Ei kauko-/kokoluokkien syy.
- Pelin täyte 177560643: JuoksuKorkeusKartta.MaanAukot (LOD2-peittokartasta lattiattomat ruudut + 1 ruutu, ei vesiin/matalille) +
  JuoksuSokkeloMaailma.LuoMaanTayte (laattojen lattiamateriaali 8 cm aukion alle; QA `ui juoksupeli palatsi tayte 0|1`). Ehjillä
  laatoilla täyte jää tyhjäksi (loki "ei aukkoja").
- Analyysi ja kuvat: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/laatat-208/ (peitto.py, saanto.py, aukot-*.png, tayte-saanto-lod2.png).
- PT:N PÄÄTÖS 18.0x: Lavastaja korjaa lähteen (erä annettu Lavastajalle), PK:n täyte jää varmistukseksi. Laitevahvistus täytteestä puuttuu.
- 18.1x tausta-v5: kärki **pelikoodari/tausta-v5-208 = b4e384537** (37d8e8507:n päällä; TaustaKansio v5 + EstoTiedosto palatsi-esto-v3,
  leivottu v5:stä, paketti _valmiit/juoksupeli-palatsi-esto-v3-vienti-20261020 → JU:lle vientipyyntö). NS:lle tarjottu; VAATII v5 + esto-v3
  ämpärissä ennen käännöstä. v5 tarkistettu: kolmioaukot poissa, korvausalueiden sisään jää aukkoja (Taihemen edessä 176 m², takana 320 m²,
  Meridiaaniportin U-piha) → Lavastajalle kerrottu; täyte peittää.

## AVOIMET
- GPU (juoksu ≤ 14 ms hehkun kanssa) on Valosepällä (PT 17.4x), ei PK:n.
- VS:n AV1/AV2 beige = latausnäkymä (vastattu VS:lle 17.5x); avauslennon 133 ms alku tarkistetaan laiteajossa.
- Puyille ei taaksekatsomisleikettä (Codexilta, jos omistaja haluaa).
- NS:n käännösvaroitus JuoksuLattia.shader(108) SokkelonPinta alustamaton (metal) – VS:n tiedosto.
- Osoitteet: PT local_8d8ebf72…, KK local_8e4fcfed…, NS local_fcc10552…, VS local_e675f86d…, LT local_36a45147…, Äänittäjä local_726ba209….
- Jatko: vasta PT:n viestistä; jono muuten tyhjä.
