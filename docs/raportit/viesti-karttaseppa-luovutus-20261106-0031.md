# Karttaseppä: luovutus 6.11.2026 klo 00.31 (KS)
Syy: konteksti yli 25 %, luonteva tauko (7.37). **Voittaa -0015:n ja -0012:n ristiriidassa; niissä W, testit ja tausta.** W:n kärki 00e433aca (haara karttaseppa/nahtavyydet-219, natiivi-backup). Kaikki kokeena, ei junaan. KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe (globaalin CLAUDE.md:n d5f31591 ei löydy; korjaus vain omistajalta).

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.

## KK:N SANAT 00.2x (sitovat)
1. **Leijuminen valmis kokeena:** 3834ea09b jää. EI häivytyksen aikaistusta: ND seisoo näkyvällä kartalla, omistaja valitsi 21.28 "Kelpaa". 21.30:n sanat ovat vain "Horisontti on vähän turhan jyrkkä"; älä käytä niitä pitkän liu'un kieltona (-2354:n rajaus on väärä).
2. **Tasainen kartta:** omistajalle aamulla KK:n kortilla. Oletus pois. Älä muuta nimien maastonäytettä ennen hänen vastaustaan. Kortin rivit on annettu KK:lle 00.31 (mäet: skripti scratchpad/maet.py, tulos viestissä; maasto https://media.matkakirja.app/julisteet/maasto/2026-10-29-maailma/).
3. **Katto v5 kelpaa kokeena;** v6 (reunajuova kiveksi) asennettu 00e433aca, EI nähty. Skripti `sarja24-asennus/riemukaari-katto-kaide.py`, `alustat-24p/riemukaari-v6-peli.glb`. Ei omaa ajoa.

## SEURAAVAAN AJOON (ei omaa ajoa)
Liitä `_tyo/karttaseppa/sk-seuraavaan-ajoon-kk-0028.txt` seuraavan ajon loppuun (katto v6, Eiffel hor-75-270 ja hor-85-270).
- Vertaa `Matkakirja-fable/scratchpad/keskustelukanava/kuvat/horisontti-7875c668d/` (kortti 21.28). **Jos Eiffel häipyy aiemmin: rivi KK:lle ENNEN korjausta** (3834ea09b siirsi mallien usvaa; kortti ja katoamisten korjaus eivät saa kumoutua). Kortin 75°-kuva on tumma, tummuus on korjattu sen jälkeen, joten vertaa näkyvyyttä, älä väriä.
- Samat kuvat näyttävät 21.30:n horisontin 75°:ssa ja 85°:ssa (9071a381b); KK:lle on kerrottu, että se on korjattu koodissa, vahvistus auki.
- Pari KK:lle: katto v5 | v6 (`lokit/karttaseppa-katto-v5-08e783b96/riemukaari-v5.png`), Eiffel kortti | nyt.

## TYÖJONO
1. Sacré-Cœur pelissä (`sarja24-asennus/sc-suunnitelma.md`), sitten Montparnasse. 2. KK:n ja omistajan sana tasaisesta. Muu kuten -0012.

## Ajot ja kuvat
`lokit/karttaseppa-tasainen-3834ea09b` (12 kuvaa), `lokit/karttaseppa-katto-v5-08e783b96`; parit `_tyo/karttaseppa/parit-3834ea09b/`. Tripolle ei mitään ilman KK:n sanaa.

## Opit
- Veden sävysauma ei ole korkeudesta, koska pysyy tasaisella. Layer.jsonissa on `octvertexnormals`; palakohtaiset normaalit ovat todennäköisin syy, todistamatta.
- Atlaksen väriskripti: tarkista lohkot ensin, sama lohko voi olla jo muutettu (96,0 oli kiveä v5:ssä).
- `python3 -I` ei löydä numpyä tässä koneessa; omat skriptit ilman -I.
