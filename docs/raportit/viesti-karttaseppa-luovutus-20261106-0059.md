# Karttaseppä: luovutus 6.11.2026 klo 00.59 (KS)
Syy: konteksti yli 25 %, luonteva tauko, kun Mac-ajo on JU:lla (7.37). **Voittaa -0045:n ja -0031:n ristiriidassa; niissä W, testit ja tausta.** W:n kärki 0e054ad1b (karttaseppa/nahtavyydet-219, natiivi-backup). Kaikki kokeena, ei junaan. KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.

## KK:N SANAT 00.4x (sitovat)
- Eiffel kunnossa, kortti 21.28 ei kumoudu.
- **Katto v6 kelpaa kokeena, ei Tripolle:** mallista ei ole omistajan sanaa. **Katon reunan tumma viiva on varmistamatta.**
- Tasaisen kartan parit menevät aamun korttiin; KK kertoo talojen ja nimien korkeuden siinä. Oletus pysyy pois.

## SACRÉ-CŒUR 0e054ad1b, AJAMATTA
JU:lta pyydetty: `_tyo/karttaseppa/sk-pariisi-sc.txt`, 8 kuvaa, tulos `lokit/karttaseppa-sc-0e054ad1b`. Tiedostot `sarja24-asennus/`: `sc-maasto.py`, `sc-maki.py 186`, `sc-asenna.py`, `sc-katso.py` (Blender), kuvat `sc-otto1/katso-*.png`.
- **Muutos suunnitelmaan:** Montmartre on maastossa ruudulla 160–261 m, joten pinta on 186 m, ei 90. Lattia 261 m (harja), portaiden pää 186 m, rinne alla 170 m. Syvyystestiä maastoa vasten ei ole selvitetty; malli on maaston yläpuolella, joten kuva ratkaisee.
- **Mäki** on oma malli `sacre-coeur-maki` ilman nimeä ja varjoa: hyväksytyn kuvan kapseli, korkeus ratkaistu kirkon alapinnasta maaston tasoon, reuna 0,5 m maaston alla. 13 440 kolmiota. Terassin alla pinta riippuu vain z:sta, koska kaarien lait tekivät piikkejä.
- **Pohja** Codexin 24p kokeena; nurmen poikkeama ei KK:n kuittaama. `PohjanKorkeudet` (uusi kenttä, 9 × 9) seuraa maastoa, muuten kadut eivät kohtaa rinteellä. Muut alueet ennallaan.
- Kirkko: Suunta −4,4, Savy kuten Louvre, Qid Q28785 (pelin oma tieto, muodot-pariisi.json). Nimettömät mallit eivät piilota naapurien nimiä.
- Testit 13/13. Blenderissä lounaasta ja idästä näyttää hyväksytyltä; vaalea läikkä terassin vieressä lienee Blenderin valoa, katso pelikuvasta.

## AJON JÄLKEEN
Katso kuvat täysikoossa: kirkko näkyy ja on mäen päällä, mäen reuna, portaat, kirkon vaaleus ja nurmi hyväksyttyä `tripo-syote/tarkistus/viisto-lounas.png` vasten, pohjan kadut. Säädä Savy mittaamalla. Sitten kuvat ylhäältä ja 45° KK:lle + 24p:n poikkeama. Ei kuittauksia Codexille tai Tripolle ennen KK:n sanaa. **Jos omistaja valitsee tasaisen kartan: `PohjanKorkeudet` ja mäki tarkistettava reiän reunalla.**

## TYÖJONO
Sacré-Cœurin ajon tulos, sitten Montparnasse (torni oikeista mitoista ilman Tripoa, 87575ff09). Tarkista sen maaston korkeus samalla `sc-maasto.py`:llä ennen 90 m:ä. Muu kuten -0045.

## Opit
- Yhteinen MaanpintaH 90 ei päde mäellä: mittaa maasto pelin paloista ennen mallin paikkaa.
- Tripon malli on sisältä ontto: alin pinta ruudussa voi olla katto tai kaaren laki, joten rajaa mäki lattiaan.
- Älä jätä komentoon lukemaan stdiniä (`cat > tiedosto` ilman syötettä jumittaa ajon).
