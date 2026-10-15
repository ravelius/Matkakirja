# Natiivi-UI: luovutus 15.10.2026 klo 18.5x (PT: konteksti 33 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261015-ilta3.md (Opit, säännöt).
Viestit send_messagella id:llä (/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-worktree
/Users/Shared/Claude/wt/proto-natiivi-ui-aloitus-195 (haara natiivi-ui/aloitus-195, remote natiivi-backup). Ennen käännöspyyntöä:
sh Linssit-testit/unity-tarkistus.sh + python3 tyokalut/kielivahti.py + tyokalut/pohjavahti.py. Asettelutesti (Julkaisijan ASETTELU NYT):
`MATKAKIRJA_ASETTELU_KOOT="iphone,ipad" MATKAKIRJA_ASETTELU_NAKYMAT="…" MATKAKIRJA_ASETTELU_KUVAT="…" zsh tyokalut/ui-asettelutesti.sh <sha> linna`
(HUOM: `zsh` eteen, tiedostolla ei suoritusbittiä; kuvat <loki>-kuvat/, polku .out-tiedoston alussa).

## TEHTY (natiivi-ui/aloitus-195, pushattu)
- 2c17dd18b + a9fb28fe5 ISOISÄN UNI kytkimen IsoisanUni.Kaytossa (false) takana: Aloita seikkailu / Uusi matka → tumma ruutu, teksti
  avauksen kirjoituskoneella alareunaan (UniText / paketin ISOISAN_UNI), unikuvat (StreamingAssets/mukana/isoisan-uni-*.png, reunat
  tyokalut/unikuva.py:llä) häivyttyvät sanojensa kohdalla eri kohtiin, Kolme veljestä keskelle; napautus ohittaa vintti-avaukseen.
  Luenta IsoisanUni.Puhe (isoisan-uni-alkusoitto.mp3) vasta kun teksti hyväksytty + äänitetty. Testi `ui aloitus uni|uni-kuva`, asettelu
  "isoisän uni" (osa linna). PT: järjestys ja tausta OK; omistajalle kerrottu kollaasi tarkoitukselliseksi.
- 5a57a7114 + 70c6c4f76 aloituskaupunki ilman isoisää samalla kytkimellä: PeliOhjain.PeruLykattyLuenta (uusi, PK tietää),
  LivianPaljastus.IlmanLuentaa: tuuraus-1, ui.livia.sahke (omistaja hyväksyi 18.44, äänite aanet/pulu/tuuraus-v2/livia-sahke.mp3),
  tuuraus-3, aarre-1, tuuraus-4, aloitus-ohje; tuuraus-2 pois.
- 7fde1f63a + f5f3d3c5b + 2fd8da388 ISS-kohdevalikko (omistaja 18.28 "Kyllä, kaikki kuvaruuduiksi"): kaikki ryhmät kuvaruuduiksi 3/rivi
  (Ruutu/PaataRivi), revontulten mustat kulmat rajattu (TaivasPaikka.Rajaus/Y), vuodenaika nimellä ("Syksy") myös nykyhetkessä.
- 0f9ff4693 IssKohdevalikko.Ryhmat = true (PT: junaan 195) + eteläisen valtameren rajaus 1,6× pystykohta 70 %. Kuvatarkistus ajossa:
  proto-3d/lokit/nui-asettelu-ryhmat-paalle-20261015.out (kuvapolku sen alussa) → tarkista, että Eteläinen valtameri näyttää revontulet
  ILMAN oikean yläkulman mustaa kiilaa (jos kiila näkyy: Y pienemmäksi tai Rajaus isommaksi IssKohderyhmat.Taivas), ja lähetä polku PT:lle.

## AVOIMET (järjestyksessä)
1. SIJAINTI-LCD VALKOINEN ASETTELUKUVISSA (omistaja 18.28/18.40 haluaa pois; laitteella TF 194 näyttää "SUOMI" oikein = vain
   testikuvan vika). Selvitetty: LCD-alueella (mk-issohjaamo__lcd, bg läpinäkyvä) ei ole MITÄÄN UITK-elementtiä taustavärillä tai kuvalla
   missään 17 dokumentissa; alla vain paneelin pohja.png, joka on LCD:n kohdalla tumma (16,25,20, alfa 255). Kuvan pikselit 255,255,255.
   Epäily: AsetteluTesti.Kokoa yhdistää esikerrotulla alfalla (lähde + kohde × (1 − a)); jokin piirtää LCD:n kohdalle pienellä alfalla
   mutta suurella RGB:llä (tekstin/LCD-fontin materiaali, Kirjasin.Mittari tai VT323, kohde/maa-labelit) → summa > 1 → valkoinen.
   Seuraava askel: debug-haaraan (natiivi-ui/debug-lcd d6d132b98, LcdDump AsetteluTesti.cs) RT:n pikselit LCD:n keskeltä per dokumentti
   (c.rgb, c.a), ja kokeile kohde.text/maa.text = "" ennen kuvaa. Korjaa testin kokoaminen tai syyllinen; uusi kuvapari PT:lle.
2. Isoisän uni päälle vasta kun: teksti isoisan-uni-alkusoitto hyväksytty + äänitetty, Codexin 3 kuvaa (#281 naamio, #282 jadesinetti,
   #283 Kolme veljestä) → `python3 tyokalut/unikuva.py <kuva> naamio|jadesinetti|kolme-veljesta` + .meta + LAHDE.txt, ja omistajan OK.
   Silloin IsoisanUni.Kaytossa = true (myös aloituskaupungin polku vaihtuu samalla).
3. Tyylikirjan synkka PT 18.38: webin PR #4639 (karttapaletti) mergen jälkeen `node tools/tyylikirja.mjs --natiivi <proto-worktree>`
   webin mainin checkoutista (tools/uusi-worktree.sh natiivi-ui tyylikirja) → Tyylikirja.uss/.cs/json natiivin haaraan. Ei testiajoja junaan.
4. Debug-haara natiivi-ui/debug-lcd (36e372498, d6d132b98) EI junaan; poista kun SIJAINTI selvä.
5. Edellisten luovutusten avoimet (intro-pehmennys laitteella, lasipohjan riskit, levyn app-kopiot) ennallaan.

## Opit
- Unen kuva pyydettiin samassa kehyksessä kuin kerros tuli näkyviin (layout.width 0) → kuvat näytetään kellon tahdissa (NaytaVuorossa).
- Aloituskaupungin aarrekorvauksen pelkkä ohitus palauttaisi kaupungin oman isoisän luennan: lykätty luento pitää perua (PeruLykattyLuenta).
