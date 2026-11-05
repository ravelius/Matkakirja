# Natiivisepän luovutus 6.11.2026 klo 00.30 (konteksti 36 %, 7.37)

Korvaa -2350:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Yötila: omistaja nukkuu, kysymykset PT:lle.

## SEURAAVA TYÖ: ajon c4 tulos
Ajo `natiiviseppa-pariisi-c4-2dfb96273` on pyydetty JU:lta, vuorossa nähtävyyssarjan jälkeen (PT:n lupa KÄYTETTY). Paikallinen haara natiiviseppa/ajo-pariisi-c4 = c266f6159 + 08a0ec8ea:n komento ja raja (vain Komennot.cs ja LiikeLaatatPaatos.cs), ei viedä. Skenaario `/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/sk-pariisi-c4.txt`, kuvat c1, c3, c4.
Kun valmis:
1. Lokista `grep "maasto siirtyma" unity.log`: valinta varjo ja kerroin 4 ennen kuvia. Muuten kuva ei todista tasoja.
2. Kuvat täysikokoisina ajon c3-c266f6159 rinnalla.
3. Laikut: näkyvätkö iPadin kaltaisilla tasoilla?
4. Alueen raja: jääkö terävä kuva sumeaa karttaa vasten?
5. Sacré-Cœurin aukko: sulkeutuiko, eikä kohteen oma rakennus näy talona? Painuvatko kukkulan laella talot (pohja rajataan 127 m:iin, tee-palat.py:191)?
6. Tulos KK:lle, kopio PT:lle. Uusi korjaus tai ajo vain PT:n sanalla.

## Tila
- KK 00.2x: c3-c266f6159 kelpaa kokeena ja aamun kuviin, ei valmiiksi; KK kertoo viat omistajalle.
- Kärki natiiviseppa/marais-talot 61bd1c678 (peilissä): sama syvyysusva kuin kartalla; vaalea vyö poissa, kaari ei palannut. Ajohaarat c2, c3 ja c4 ovat paikallisia.
- Selvitys KK:n kysymyksistä: `_tyo/natiiviseppa/pariisi-talot/selvitys-c266f6159.md`. C-sarjan aiemmat kuvat ovat Macin tasoilla, koska 08a0ec8ea ei ollut haarassa.
- Palat tehty uudelleen samaan kansioon: 126 319 taloa, 219 palaa, 361 Mt, 0 virhettä. Maskit sacre-coeur ja montparnasse pois (EI_ALUETTA tee-palat.py:ssä), kohteiden omat rakennukset OHJELMA-listassa (1 + 1 poistui).
- MASKIT PALAUTETAAN, kun KS asentaa alueet (alustat 24p); samalla rivit pois OHJELMA-listasta. Rivi KS:lle lähetetty jonoon, kuittausta ei vielä ole.

## Auki
- Sumean vyön talottomuus alueen reunalla: syy auki, keskipistepoisto se ei ole (4/1 073). Vaatii rajausten projisoinnin koordinaateiksi.
- Pohjan reunan pehmennys (NotreDamePohja.shader, noin 70 m), jos raja jää iPad-tasoilla: ei tehty eikä kokeiltu.
- Hautausmaan yläosan kuvio: OSM:ssä ja IGN:ssä 0 rakennusta, kuviota ei ole varmistettu kartan laatasta.
- Kyltit usvassa ilman rakennusta: Opéra (c4), Sacré-Cœur ja Metroasema (c2), sama kuin Eiffel ja Riemukaari. Kirjattu, ei korjattu.
- Maskikoodi: ÄLÄ poista ennen kuin laikut on katsottu (kohta 3).
- Aiempi auki -2350:stä: VS:n ensimmäisen erän kohteet OHJELMA-listaan, kun ne ovat pelissä; ODbL ennen julkaisua; suorituskyky isossa iPadissa kohta D; Ateenan ja Tukholman viat odottavat Pariisia (PT kirjaa).

## Työtapa
Ajohaara tehdään työpuuta koskematta: merge-tree tai väliaikainen indeksi + commit-tree. tee-palat.py ajetaan python3.14:llä ilman -I:tä, noin 3 min. Pyyntö JU:lle: mitä ratkaisee, sha, kuvat. Palat eivät ole haarassa eivätkä ämpärissä. Ei junaan, ei iPadia.
