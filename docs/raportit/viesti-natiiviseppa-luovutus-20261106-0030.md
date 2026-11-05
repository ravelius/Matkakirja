# Natiivisepän luovutus 6.11.2026 klo 00.35 (konteksti yli 35 %, 7.37)

Korvaa -2350:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Yötila: omistaja nukkuu, kysymykset PT:lle.

## SEURAAVA TYÖ: ajon c5 tulos
Ajo `natiiviseppa-pariisi-c5-2dfb96273` on pyydetty JU:lta, vuorossa nähtävyyssarjan jälkeen (PT 00.4x, lupa KÄYTETTY). Paikallinen haara natiiviseppa/ajo-pariisi-c4 = c266f6159 + 08a0ec8ea:n komento ja raja (vain Komennot.cs ja LiikeLaatatPaatos.cs), ei viedä. Skenaario `/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/sk-pariisi-c4.txt`, kuvat c1–c4.
Ajo natiiviseppa-pariisi-c4-2dfb96273 oli jo käynnissä 00.30 alkaen: palat vaihtuivat kesken ja kuvia voi olla kolme. Se EI kelpaa aamun kuviin; c5 korvaa sen.
Kun c5 on valmis:
1. Lokista `grep "maasto siirtyma" unity.log`: valinta varjo ja kerroin 4 ennen kuvia. Muuten kuva ei todista tasoja.
2. Kuvat täysikokoisina ajon c3-c266f6159 rinnalla.
3. Laikut ja alueen raja iPadin kaltaisilla tasoilla. Jos raja näkyy: rivi KK:lle ja PT:lle, ei korjausta (KK: pehmennystä ei vielä).
4. Tulos KK:lle, kopio PT:lle. Kelvatessaan c5 korvaa c3:n aamun kuvissa. Uusi korjaus tai ajo vain PT:n sanalla.

## Tila
- KK 00.2x: c3-c266f6159 kelpaa kokeena ja aamun kuviin, ei valmiiksi; KK kertoo viat omistajalle.
- Kärki natiiviseppa/marais-talot 61bd1c678 (peilissä): sama syvyysusva kuin kartalla; vaalea vyö poissa, kaari ei palannut. Ajohaarat c2, c3 ja c4 ovat paikallisia.
- Selvitys: `_tyo/natiiviseppa/pariisi-talot/selvitys-c266f6159.md`. C-sarjan aiemmat kuvat ovat Macin tasoilla, koska 08a0ec8ea ei ollut haarassa.
- PÄÄTÖS (KK, PT 00.4x): maskit sacre-coeur ja montparnasse JÄÄVÄT, kunnes alueet tulevat, eikä OHJELMA-lisäyksiä tehdä. Palat palautettu 00.33: 126 024 taloa, 219 palaa, 360 Mt, 0 virhettä. KK kertoo aukon syyn omistajalle aamulla. KS:lle on lähetetty kumoava viesti: tarkista kuittaus, koska KS kirjasi ensimmäisen viestin luovutukseensa.
- Hautausmaa ei ole vika (KK), kuviota ei selvitetä.

## Auki
- Taloton vyö alueen reunalla: OSM:ssä on taloja kohdalla (c1 17–35, c4 enimmäkseen 27–35 rakennusta 60 m:n säteellä), mutta projisointivirhe on enintään 55 m eli vyön leveyden luokkaa. Syy auki. Skripti scratchpadissa ei säily; pisteet ja tulos KK:n viestissä 00.4x.
- Kyltit usvassa ilman rakennusta: Opéra (c4), Sacré-Cœur ja Metroasema (c2), sama kuin Eiffel ja Riemukaari. Kirjattu, ei korjattu.
- Maskikoodi: ÄLÄ poista ennen kuin laikut on katsottu.
- Aiempi auki -2350:stä: VS:n ensimmäisen erän kohteet OHJELMA-listaan, kun ne ovat pelissä; ODbL ennen julkaisua; suorituskyky isossa iPadissa kohta D; Ateenan ja Tukholman viat odottavat Pariisia (PT kirjaa).

## Työtapa
Ajohaara tehdään työpuuta koskematta: merge-tree tai väliaikainen indeksi + commit-tree. tee-palat.py ajetaan python3.14:llä ilman -I:tä, noin 3 min. Älä tee paloja uudelleen ajon aikana. Pyyntö JU:lle: mitä ratkaisee, sha, kuvat. Palat eivät ole haarassa eivätkä ämpärissä. Ei junaan, ei iPadia.
