# Natiivi-UI: luovutus 11.11.2026 klo 08.45 (kontekstivahti 26 %; korvaa -0835:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS (Karttaseppä) local_7b57e35a-3a8e-4943-aba1-c960b9eb4671,
NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a.
TYÖTAPA: näkyvän työn tallenteet suoraan KK:lle, PT kopiona; junaan vasta KK:n katsottua. Tallenteesta ei leikata tunnettua vikaa.
Koodi: worktree /Users/Shared/Claude/wt/proto-nui-paisuu, haara natiivi-ui/napautus-lento (push: natiivi-backup), pohja juna-224 a4ef0d609.
HUOM: haaran upstream on natiivi-backup/julkaisija/juna-224 – älä pushaa sinne; push aina `git push natiivi-backup HEAD:refs/heads/natiivi-ui/napautus-lento`.
tyokalut/tarkista.sh päivittää tyylikirjan (Tyylikirja.uss/.cs, tyylikirja.json) → git checkout ennen committia; POHJAVAHTI-rivit pohjassa jo.

## Commitit haarassa (järjestys)
- f2a844889 napautus yhtenä lentona (kuva heti pieni, lähin vapaa, 60°, jatkuva kierto); 50565c427 kohde ruudun keskelle.
- 8eb544f7c TYÖ B: esityksen kohdelukko (PalloKierto.EsitysKohde; vasen tappi vain zoom, oikea kiertää kohteen ympäri). Mac sauva-1 ✓
  (/Users/Shared/Claude/proto-3d/lokit/nui-napautus-sauva-1-8eb544f7c: c0=c1, kiertopiste pysyi 99/huti 0). Lähetetty KK:lle 08.4x.
- 9c24daf3e TÄYSI YMPYRÄ (OMISTAJAN PÄÄTÖS 08.35 + 08.37 KK:n kautta): kierto 5 °/s samaan suuntaan noston ajan, ei ±90°-kaistaa, ei
  kiinteää kaistaa, ei väistöä, ei talojen peittotarkistusta; suunta vuorottelee nostoittain; kertoja ei pysäytä, noston sulku hiivuttaa.
  PalloLiike 23/23, unity 0. (Heiluri ja TaloKorkeudet-peittotarkistus tehtiin ja poistettiin ennen committia – omistaja kumosi.)

## Odottaa
- JU: Mac-ajo nui-napautus-lento-3-9c24daf3e (sk-napautus-lento-3.txt: Sainte-Chapelle, Eiffel, Louvre, nosto 26 s). Katso: kierto näkyy
  koko ajan, lento liukuu kiertoon ilman notkahdusta (KK: Sainte-Chapellessa notkahdus 3,0–3,2 s ja lähtö 0,8 s myöhässä; notkahdus oli
  kiinteän kaistan vastakääntö, nyt poissa), sulku hiivuttaa. Sitten tallenteet KK:lle (kopio PT).
- KS: seinänpalat (Palais de Justicen pihat) korjattu palaan 15_16597_11273, Mac-pari KJ33 JU:lla → KK → talopaketti v12. Ei NUI:n työtä.

## SEURAAVA TYÖ (KK 08.37: "Sainte-Chapelle: kappeli keskellä ja selvästi suurempi kuin nyt, vaikka talot peittäisivät alaosan")
- Epäily: esittelyn katsepiste (PalloKierto pituus/leveys, korkeus = etäisyys) on ellipsoidilla, Pariisin maa ~90 m ylempänä (mallin "maa 90 m").
  169 m:n etäisyydellä kamera on siksi liian matalalla suhteessa maahan, rajaus dy kyllästyy −0,500:aan ja malli jää ylös
  (lento-2: mitattu ylä −0,044, ala 0,621). Eiffel 825 m:ssä ok (vaikutus pieni). Katso PalloKierto "katseKorkeus" (Kelvollinen) ja
  "KIERTOPISTE MAAN PINNALLE" (KiertoKorkeus) – onko esittelyn ajolla katsepisteen korkeus; NahtavyysRajaus.Etaisyys/Dy sylinteri(maa, huippu).
- Lähtöviive 0,8 s (Sainte-Chapelle) vs 0,2 s (Eiffel): mittaa lento-3:sta; smootherstep-lennon alku on hidas.
- Sitten C (sauvat isommiksi, herkkyys alas, liikkumisala), D (Turisti-info Lehden "Matkaopas"-sivuksi; hae vanha toteutus git log -S "Turisti"),
  E (Lehden nappi nostopalkin vasemmalle, koe). Symmetria: KK 08.3x – EI siirretä palkkia/kuvaa, kohde keskelle vapaata alaa (tehty).

## Muuta
- NS kysyi introkuvista 08.4x: vastattu (Introesitys, UiNakymat.Hae().Introesitys, Aloita(sumeaTausta: true), NS kutsuu itse).
- Myöhemmin: iso iPad 0f0f950a6 / KS 599b0150d -ajo JU:n vuorolla; tarinamerkit odottavat Codexia.
