# Natiivisepän luovutus 6.11.2026 klo 11.40 (konteksti 31 %, pehmeä raja, 7.37)

Korvaa -1122:n SEURAAVA TYÖ -kohdat 1 ja 2. -1122:n kohta 3 ja huomiot pätevät; -1113:n kohdat 3 ja 5 sekä opit; -0955:n kohdat 2, 3, 5 ja -0940:n viestit ja työtapa. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" uudelleen (Raamattu 7.41, proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py); edellisen sessiokohtainen cron kuolee nollauksessa.

## SEURAAVA TYÖ
1. KK:n SANA palat-v10:stä menee edelle, kun se tulee. PT muistutti KK:ta 11.4x; vastaus tulee NS:lle suoraan. Älä lähetä pyyntöä uudelleen. Sisältö ja toteutus: -1113 kohta 1 ja -1122 kohta 1 (Canopéen katto way/630511331; Palais-Royalin eteläosa tarvitsee KS:n koordinaatit).
2. PALIKKAKOE: KOODI ON VALMIS, KÄÄNTÄMÄTTÄ JA AJAMATTA. Seuraava askel odottaa JU:ta.
   - Haara natiiviseppa/palikka-koe 2aa245334, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka, peili natiivi-backup peili/proto/natiiviseppa/palikka-koe.
   - Ajopyyntö 1 (vain Mac) lähetetty JU:lle 11.3x: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe/ajopyynto-mac-1.md. Tulos tulee NS:lle viestinä; kääntövirheestä rivi.
   - Kun tulos tulee: tarkista loki (varjostin, molemmat tiet, "palikat tila", mittarit Valid). Korjaa kääntövirheet. Katso kuvat m-*, c-*, y-* täysikokoisina ennen arviota; pari nykyinen | palikka, kohde kokonaan. KK katsoo ensin, tiivistys PT:lle. Kuvat ja tulos KK:lle, PT:lle tiivistys.
   - iPad VASTA Mac-kuvien jälkeen (PT 11.4x): iso iPad, launch vain lukolla, JU:n vuorolla, viileänä, ei hiljaisella tunnilla. Ajot: ensin rata r3 (palikat rata r3; palikat ajo A0 A1 20 <parit>), sitten A0|B2, A0|B3, B2|B3; samoin r2 ja r1 tarpeen mukaan. Tulos jsonl persistentDataPath/palikkakoe.jsonl ja lokissa "MATKAKIRJA palikkakoe". Ratkaiseva: suurinP95Ero, raja 16,7 ms (ohje osa E). Metalin GPU-aika vain pareittain.
   - C-ajot: PT:n sana, jos koskevat koko pelin asetuksia. PT:n rajat -1122 kohta 2 voimassa.
3. PT 11.4x: Concorden FAIL (OhjelmaKohdeGeometriaTestit.ConcordenAukionMitat, "suihkulähteiden vesi puuttuu") ei tule palikoista. VS:n mukaan se on vanha testin odotus: 2aa245334:ssa on uusi vesiväri c0dba45aa, mutta ei testikorjausta 61e6bdcfe. Ota testirivi 61e6bdcfe:stä koehaaraan SEURAAVALLA committilla, älä tee sille omaa ajoa. VS luki tämän koodista, joten varmista se seuraavassa testiajossa. UI-testien b7|b8-tulos JU:lta: PT päättää.
4. KS kysyi Forumin nurmen kohteista: vastattu 11.3x (jonossa KS:llä): 6 seinällistä ovat palojani, litteät neliöt eivät voi olla (vähintään 3 m). Päätelty koodista ja kuvasta, litteitä ei mitattu.

## Mitä koodissa on
- PalikkaYdin.cs (puhdas): PK01-luku, tasot 400/1200 m, radat r1, r2, r3, ABAB-aikataulu, erot, verkot koodina. Testit Kartta-testit/Testit/PalikkaTestit.cs 11/11.
- PalikkaKerros.cs: komento palikat tapa pois|b2|b3, fp 0|1, rata r1|r2|r3|pois, ajo A B jakso parit, tila. Oletus pois: ei lataa eikä piirrä.
- Resources/Palikka.shader, PalikkaInstanssi.mat (tiedostona, koska m_InstancingStripping 0 poistaisi muuten instanssivariantit), PalikkaData.bytes (906 596 t).
- Mobile_Renderer_FP.asset (Forward+), rivi Mobile_RPAsset-listaan. Komennot.cs: 3 riviä.
- Data _tyo/natiiviseppa/palikkakoe/: hae-palikat.mjs (T7), tee-palikat.py (kopio tee-palat.py:stä, alkuperäiseen ei koskettu), tee-palikat.zsh, palat-ilman-marais (vain Macin kuvapareihin: 8 palaa kirjoitettu uudelleen, muut linkkejä palat-v9:ään).
- Määrät: 20 000 puuta, 5 000 valoa, 100 mastoa (alueella 188), 2 000 taloa (kaukaisin 735 m Marais'n keskipisteestä), 200 siltaa = 1 130 pätkää.

## Avoimet ja rajaukset (kirjaa tulokseen)
- Varjostin ei ole kääntynyt. B3:n varatie, jos ei toimi laitteella: RenderPrimitives + SV_VertexID kuten KaupunkiPuut.
- C#:n tyyppitarkistus (palikkakoe/tyyppitarkistus.zsh) meni läpi b7-kirjastoja vasten: Palikka-virheitä 0; 6 CS0117-virhettä Valopohja.cs:ssä johtuu vanhasta Linssit-kirjastosta. b8:lla todentuu vasta käännöksessä.
- Rata asettaa kameran suoraan. Liikkeessa ja KarkeaLiike ovat epätosia, joten Cesium valitsee tarkat laatat eikä pelaajan eleen karkeita. Sama A:lle ja B:lle, mutta ei sama kuin oikea ele. Täysi taajuus Ruudunpaivitys.Aktiivinen-ehdolla: tarkista lokista "ruudunpaivitys":"Taysi".
- r3:n korkeus 600 m ja r2:n 1200 m ovat omia valintojani [E]; ohje sanoo vain kulman ja paikan.
- A0 ei ole täsmälleen nykypeli: toinen renderöijä listassa voi pitää Forward+-variantit käännöksessä. Vaikuttaa käännösaikaan ja kokoon; A1:n hinta näkyy vain iPadilla.
- Kuvapareissa nykyiset KaupunkiPuut voivat olla palikkapuiden kanssa päällekkäin: ei kytkintä tehty, katso kuvasta. Kartta-kirjasto ei näe KaupunkiPuuta.
- Palikka-sillat: laatikkopätkiä, ei kaaria eikä pilareita. Valojen ja puiden maa lähimmästä IGN-talosta.
- ilman-marais: naapuritalojen poistettujen talojen vastaiset seinät jäävät piiloon, koska palikkalaatikko seisoo samalla paikalla.

## Opit
- Testi, joka vertaa normaalia kiertosuuntaan, ei löydä väärinpäin olevaa pintaa, koska normaali lasketaan kierrosta. Löysin Vaipan ja Pallon sisäänpäin vasta käymällä kierron käsin läpi; nyt mukana oikea ulospäin-testi. Sama vaara on muissa koodina tehdyissä verkoissa.
- Roslyn ei tarkista metodien runkoja, jos esittelyissä on virheitä: 25 CS1069:n takana ei olisi nähnyt mitään. Viittaus System.Numerics.dll ratkaisi.
- zsh: "=====" kaataa komennon (=sana laajenee), glob ilman osumaa kaataa rivin.

## Huomiot
- Työpuiden raja (Raamattu 10.13: 3 per rooli): wt/-kansiossa NS:n työpuita on nyt 8 (natiiviseppa-luovutus-2052, proto-natiiviseppa-kierto, -kierto-koe, -marais, -palikka, -tyokalut, -unity-b5, -unity67). PT:lle ei vielä kerrottu; kerro ennen poistoja.
- Levy 75 Gi vapaana, 92 %.
- Pohjan vaihto: KS:n haaran kärki 1347410ca oli edennyt; koe on yhä 9f5e3e105 + ce65ccfe4:n päällä. Ajo 8 on 1347410ca:lla, joten kuvissa voi olla pieniä eroja KS:n ajoon.
