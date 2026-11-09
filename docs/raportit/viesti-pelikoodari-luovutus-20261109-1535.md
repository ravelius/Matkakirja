# Pelikoodari: luovutus 09.11.2026 klo 15.35

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (30 %). Edellinen: `git show 17ebfb18d:docs/raportit/viesti-pelikoodari-luovutus-20261109-1514.md`
(sen kohdat 1 ja 3 hoidettu tai alla). Kuvat ≤ 1000 px (PIL-arkki scratchpadiin), laajat haut Sonnet-agenteilla.
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), nyt haarassa pelikoodari/pulu-v2.

## 1. ODOTTAA JU:TA (tarkista lokit/, katso kuvat, sitten rivi PT:lle)
- **Pulu v2 (PT:n päätös 15.3x)**: julkaistua pulu/vastaukset/v1:tä ei ylikirjoiteta → natiivi lukee v2:ta, **8c5328689**
  (natiivi-backup pelikoodari/pulu-v2 = junan 223 kärki 6a2f044b7 + PuluValmiitLataus.Juuri v2, nosto-kysymykset.py/pulu-kultaiset.py v2;
  kaanna.sh Pulu 29/29, unity 0). Paketti /Users/Shared/Claude/proto-3d/_valmiit/pulu-v2-vienti-20261109 (43 maata + maat.json, SHA256SUMS
  juuressa). JU:lle 15.3x: vienti + ajo sk-pulu-v2 (_tyo/pelikoodari/pulu-v2/sk-pulu-v2.txt, iphone) → lokit/pk-pulu-v2-iphone-8c5328689.
  TEE: lokissa "MATKAKIRJA pulun valmiit: FRA <N> kohtaa" ilman latausvirhettä, kuva v-1 → PT:lle 3 riviä: junaan 8c5328689 + vienti tehty.
- **Pulun lähteet + tappi-kierto 8841fd32f** (natiivi-backup pelikoodari/pulu-lahteet): ajot sk-pulu-lahteet iphone+ipad ja sk-tappi-kierto
  iphone pyydetty 14.4x → lokit/pk-pulu-lahteet-{iphone,ipad}-8841fd32f, pk-tappi-kierto-iphone-8841fd32f (15.32 ei vielä). TEE: p-3 Eiffel
  keskellä → "pulu: lähde 2/…" keskikohde; tappi-kierto "kohde …" eikä "maa keskellä". Riski: kohdenoston Kohta null → kytke kohde:<id>-avaimeen.
  Kelpaa → PT:lle junarivi (8841fd32f yhtenä). HUOM: v2 tuo kaupunki:/maa:-kohdat, joita lähteet 3–4 (PuluChat.Lahteet.cs:66–69) käyttävät;
  ennen v2:n vientiä p-4/p-5 näyttävät generoidut.
- **1d alkuvarjo d58806806** (natiivi-backup pelikoodari/juoksu-1d): 5ed43b793-pari katsottu: variantti 1 varjot korkealta ok, mutta a-4s
  pihalle kolmiomaiset valo-varjoläiskät → normaalisiirto (_JuoksuVarjoHaive.zw) skaalautuu varjomatkan suhteessa (Valopohja.PeliVarjoMatka).
  JU:lle 15.2x: sk-1d-alkuvarjo-1 (_tyo/pelikoodari/juoksu-223/) → lokit/pk-1d-alkuvarjo1-d58806806. TEE: vertaa a-4s piha (rajaus y 1300–2000)
  5ed43b793-ajoon; läiskät poissa → PT:lle junarivi (5ed43b793 + d58806806).
  Sivuhavainto: a-16s terassilla iso tumma kolmio molemmissa varianteissa (ei 1d:n vika, ei tutkittu).

## 2. VALMIIT TÄLLÄ VUOROLLA
- Pulun kaupunki/maa-erä (Matkakirja pelikoodari/pulu-kaupungit-maat, työpuu /Users/Shared/Claude/wt/pulu-kaupungit-maat): PT:n pistokoe 1
  (10/30) ja 2 (7/30) korjattu, faktatarkistus 1 870 vastausta (21 Sonnet, 199 korjausta) ja loppulausekierros 540 (12 Sonnet, 113 korjausta),
  kaikki paikallaan tools/pulu-esigenerointi/korjaa-kaumaa.py:llä; viimeisin **1e8360ecc**. RAPORTTI.md loppu. PT: vienti ilman uutta pistokoetta.
  Vanhat kansiot _valmiit/pulu-kaupungit-maat-vienti-20261109(-2,-3) eivät ole vientiin (v1-polut).
- Jäänne: työpuussa seurannaton pulu-esigenerointi/KM/ (väärä ensiajo, ei commitoitu).

## 3. JONO
- Kun yllä olevat kuitattu ja jono tyhjä: rivi PT:lle "JONO TYHJÄ: Pelikoodari".
- Tyylikirjan generointi (tyokalut/tarkista.sh päivittää Tyylikirja.*): palautettu joka kerta git checkoutilla, ei committiin.
- valovahti hylkää myös junan kärjessä 6a2f044b7 (Aurinko.cs, NapaKannet.cs, KartanElama.cs, KaupunkiPuu.shader; ei Pelikoodarin).

## LISÄYS 15.4x
- JU hylkäsi pulu-v2-vienti-20261109 (Lisenssi-rivi puuttui; kansio lukossa) → **/Users/Shared/Claude/proto-3d/_valmiit/pulu-v2-2-vienti-20261109** (vie-paketti.sh --kuiva ok, 44 uutta). JU vie sen ja ajaa sitten 8c5328689 iphone. Vahvistettu JU:lle: korjaukset vain 108 uuteen kohtaan, v1:n 1584 kohtaa ennallaan.
- 15.4x JU: v2-2 VIETY 15.37 (pulu/vastaukset/v2/, 44, julkinen maat.json 200). Ajo EH (8c5328689 iphone sk-pulu-v2) jonossa EC:n (1d-alkuvarjo1 d58806806) perään.
- 15.4x pk-pulu-lahteet-iphone-8841fd32f VALMIS (kuvat p-1…p-5 katsomatta, vain unity.log): keskikohteen HAKU toimii nyt (p-3 "lähin
  kohdekartta:pariisi:Eiffel-torni 1 px, toinen Galerie des Machines 15 px, raja 58, kohdenostot 4"), MUTTA lähde = "generoidut kaupunki
  Pariisi" eikä lähde 2 → luovutuksen riski toteutui: kohdekartta-noston Kohta null / ei kohde:<id>-avainta (tai "toinen" 15 px raja-alueella
  hylkää). TEE: PuluChat.Lahteet lähde 2 kohdenostolle → kohde:<id> (Kohdenostot.Linkitetty/Qid) tai generoi kohteen nimellä; tarkista
  myös toisen kohteen etäisyysehto. Uusi JU-ajo sk-pulu-lahteet. Huom: tämä haara lukee v1:tä (FRA 59 kohtaa) → rebase/merge pelikoodari/pulu-v2
  8c5328689 ennen ajoa, jotta p-4/p-5 saavat kaupunki:pariisi/maa:FRA-valmiit. p-1/p-2 ok (valmiit 5 → lisää 2).
