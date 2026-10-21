# PT → Codex #812: kartan 3D-maamerkit, 3 kokeilua (havainnekuva + Tripo) (21.10.2026 klo 14.23)

OMISTAJAN PÄÄTÖS klo 14.21 (KK:n välittämä), sanatarkasti: "voisi kokeilla muutaman että codex tekisi havainne kuvan ja sitten
tripolla 3d:n. speksaa vain tyylin ja koon yms." + kortti "Kolmella (Suositus)".
LUPA: Colosseum, Matterhorn ja Kinderdijkin mylly; kustakin 1 havainnekuva + 1 Tripo-malli (yhteensä 3 kuvaa + 3 Tripo-kutsua).
Uusinta on uusi otto ja vaatii uuden luvan.

## Miksi
Kartan maamerkit tehdään nyt koodissa yksinkertaisista muodoista, ja omistajan mielestä niissä on vielä ongelmia. Kokeillaan,
saadaanko havainnekuva → Tripo -putkella parempia. Vertailuarkki (nykyiset + yhtenäistetty sarja):
/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/kartta-arkki/arkki-10g-galleria-nyt-yhtenainen.png (alaosa = tavoiteltu tyyli).

## Tyyli (kaikki kolme)
- Tyyli on arkin 10 alaosan yhtenäinen sarja: seepiaramppi vaaleasta hiekasta tummaan ruskeaan, mattapinta, ei tekstiä eikä
  valokuvapintaa. Yksi tunnusmerkki tunnistetaan sekunnissa: mahdollisimman yksinkertainen, silti tunnistettava (omistaja 09.38).
- Havainnekuva: kohde kolmen neljäsosan kulmasta yläviistosta, tasainen vaalea tausta, ei maapohjaa eikä varjoja maahan.
  KK hyväksyy kuvan ennen Tripo-kutsua (PT tuo sen KK:lle).

## Kohteet
1. Colosseum: soikea kaarikerroksinen kehä, jonka ulkoseinä on toiselta puolelta korkeampi ja toiselta vajaa (kuten oikeassa).
2. Matterhorn: pystysuora pyramidihuippu, jonka koukistuva kärki on lumilakin kohdalla vaaleimmalla seepialla.
3. Kinderdijk: yksi kahdeksankulmainen olkikattoinen mylly, jonka neljä siipeä ovat kiinni lakissa.

## Tripo-malli
- GLB, kevyt iPadin kartalle: LOD0 enintään 3 000 kolmiota (Matterhorn enintään 2 000), ei luita eikä animaatiota.
- Yksi seepiamateriaali (baseColor 512², ei normaalikarttaa ellei välttämätön), opaakki.
- Origo pohjan keskellä maan tasalla, +Y ylös, todellinen pohjoinen +Z, metreinä: pohjapinta-ala sama kuin sarjan naapureilla ja
  korkeus sarjan suhteessa (Colosseum leveä ja matala, Matterhorn korkein, mylly pieni ja korkeampi kuin leveä).
- Ei maapohjaa. Pelin oma pieni maavarjo lisätään pelissä.
- Toimitus `codex-3d-toimitus.md`-pohjan mukaan (SHA256SUMS, tarkistus tools/codex-3d-tarkistus.mjs).

## Toimitus
`posti/kartta-maamerkit-812-20261021/` → 01-colosseum.png, 02-matterhorn.png, 03-kinderdijk.png (ensin, KK:n hyväksyntään);
sen jälkeen GLB:t + esikatselut + R2-kuitit. Huom: Chrome-vientieste (Tripo-GLB-lataus) on edelleen auki; kerro heti, jos se estää.
Pelikoodari kytkee mallit, ja omistaja näkee vertailuarkin nykyisten rinnalla ennen junaa.
