# Suunta: ääni (A) — miltä pelin pitää kuulostaa

*(Äänittäjä 21.10.2026, studiojako Raamattu 4.21. Laatutaso hyväksytyin ja hylätyin esimerkein; käytännön tekotapa: `docs/tuotanto/tekotavat/aani.md`; luvat ja vaiheet: tuotannonohjaus (D). Tähän on koottu vain voimassa olevat linjaukset ja luovutusten opit.)*

## Perusajatus

Peli kuulostaa rauhalliselta, lämpimältä ja tarkalta: ääni palvelee kertojaa ja tapahtumaa eikä koskaan kilpaile niiden kanssa. Keveä, harva ja luonnollinen voittaa runsaan, koska pelaaja kuuntelee kertojaa ja katsoo maailmaa. Jokaisen äänen pitää olla sitä, miltä se näyttää (askel kivellä kuulostaa kivestä, ei puusta; parkettia ei kuulu korkokengillä, jos hahmo kävelee pehmeästi).

## Kertoja ja puhe

- **Omistajan suunta 18.12.2026:** kaikessa kertojaääni on William; ainoa poikkeus on isoisä, jolla on oma ääni. (Pulu on hahmo, ei kertoja: Pulun omat repliikit ja chat-vastaukset pysyvät Pulun äänellä, kunnes omistaja toisin sanoo.)
- **Kertoja William:** rauhallinen, selkeä, tasainen; ei tunnetageja, nopeus vain ElevenLabsin `speed`-asetuksella (enintään 1,2). Teksti sanasta sanaan; arvottavia pulmia ei lueta.
- **Isoisä:** lämmin, hieman vanhahtava; erillinen malli ja resepti. **Pulu:** lämmin ja iloinen, vähän kujeileva; ei haikeaa (`[softly]`/`[whispers]` kuulostivat liian surullisilta).
- **Huudot ja hahmot:** lyhyitä, hauskoja ja selkeitä. Puyin ääni on nuori ja kirkas (Kavya); huudon alut ("Oho!", "Auts!", "Hoplaa!", "Noin!", "Katos vaan!", "Hups!", "Soriii!") kuuluvat heti. Kaksi huutoa samassa kohdassa tehdään kahdella eri henkilön äänellä (vanha eunukki + nuorempi), ei samalla äänellä kahdesti.
- **Ei jälkisäätöjä puheeseen:** nopeutus `atempolla` ja venytys kuulostavat huonolta. Nopeus ja tunne tulevat asetuksista ja tageista.

**Hyväksyttyjä:** Williamin kaarilukemat (−14,6 LUFS), Pulun lämmin kutsu, Puyin huudot 03 ja 06 v4 ("Hoplaa! Linnut karkasivat, niin minäkin!" tahdilla `[rushed]`), eunukkien "Majesteetti!" vanhalla ja nuorella äänellä.
**Hylättyjä:** koeäänet, jotka kuulostivat liian vanhoilta (Puyi); iloinen lause paniikkitagilla tai huutotagilla (tuotti ylimääräisen "Aaa!"-kiljahduksen); ranskalainen aksentti suomessa (kielen pakotus puuttui); kone kuulostava kertoja.

## Musiikki

- Keveä, harva sovitus (2–3 soitinta), ei kasvua, leikkisä tai tunnelmallinen; taustamusiikki selvästi kertojan ja Pulun alla (musiikki noin −20 LUFS, puhe −17…−20).
- Jokaisella kohtauksella oma kappale; kartalla vain kaupungin oma. Musiikki on aina Lyria-generoitua.
- **Hyväksytty:** juoksupelin avauksen erhu-kappale (Lyria a): lyyrinen melodia, huilu ja harppu taustalla.
- **Hylätty:** Freesoundin erhu avaukseen ("ääni oli huono"); musiikki, joka nousee ja täyttää kertojan tilan.

## Tehosteet

- Valmiit yksittäiset äänet, joiden kuvaus vastaa tarvetta; yksi tapahtuma = yksi selvä ääni (läpsäys, isku, läikähdys), ei pitkän nauhoituksen paloja.
- Lyhyet kertaäänet pitävät samaa kuuluvuutta (perheen sisällä ±3 dB); huutoja kovempia ei ole.
- **Hylättyjä virheitä:** puuaskel, joka kuulosti korkokengiltä; jade-esine, joka kuulosti lusikalta kivimukissa; posliini, joka oli lasia; napsahtava marmoriaskel.

## Askeleet ja äänimaisemat

- **Askeleet:** pehmeitä ja matalia, ei kopinaa; lattia kuuluu (parketti, marmori, kivi/hiekka, sora). Taso noin −34 LUFS; kävelysykli ja kuulumisetäisyys datasta.
- **Salin äänimaisema:** hiljainen hälinä salikoon mukaan (kabinetti, keski, suuri, aula, ulko), kaiku tilavuuden mukaan, taso noin −34 LUFS (kabinetti −37). Ei lentoääntä hiljaiselle kameralle.
- **Hyväksytty:** pehmeä parkettikävely (matala, hiljaisempi kuin vanha); kiinteä hälinä, joka ei toista huomattavia tapahtumia.
- **Hylätty:** kuuluvasti toistuva yksittäinen tapahtuma silmukassa (kurkunselvitys), mekaaninen humina, tuuli tai vesi väärässä paikassa.

## Mittarit lyhyesti

| ääni | taso |
|---|---|
| kertojan kaari | −14,6 LUFS |
| fokus ja Pulu | −17 LUFS |
| musiikki | noin −20 LUFS |
| askeleet, salit | noin −34 LUFS (kabinetti −37) |
| kertaäänet | huippu −6,5 dBFS, true peak < −1 dBTP |
