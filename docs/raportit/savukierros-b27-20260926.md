# 1.0.26-juna juna/b13 f583f1c2 (käännös c15d4487), 26.9.2026 ~21.0x

Fablen pyytämä esikierros ajettuna tällä käännöksellä (175 ja S10 eivät vielä mukana, Natiivisepän
ilmoituksen mukaan — tulevat seuraavassa erässä). iPhone yksin, console-pty-kaappauksella.

## Tulokset

- **Poikkeus 0: PASS.** Ei yhtään NullReferenceExceptionia tai muuta poikkeusta koko session ajalta
  (kolme kylmäkäynnistystä + jatkotestit) — c5e329a9:n Symbolimallit-vika ei ole tässä käännöksessä.
- **Verho kylmästä: POIKKEAMA.** Kolme puhdasta mittausta (terminate+relaunch): **8,0 s**, **4,7 s**,
  **5,5 s** — kaikki selvästi yli 3,5 s -tavoitteen (Natiivisepän oma priorisointi). Ei liity
  poikkeuksiin (0 koko ajan). Build 25:ssä sama mittaus antoi puhtaasti 2,1/2,2 s, joten tämä
  näyttää regressiolta tässä käännöksessä, ei mittausartefaktilta.
- **171 (aloituslento, kohdemaa): OSITTAIN PASS.** VARTIJA 171 laukesi oikein uuden pelin alussa:
  "saapuminen GRC alkaa (korjaus ...), aste 99,4 %, kohdemaa -" — vartija aktiivinen, kohdemaa-tila
  siisti. En ehtinyt kuvakaappauksella todentaa "kohdemaa ei vaalea" -hetkeä kesken laskeutumisen
  (liian nopea ikkuna simulaattorilla, tuttu ongelma aiemmistakin kierroksista) — luotan lokiin.
- **168 (noston avaus ei värjää maakuntaa): PASS.** Avasin nostokortin (Thermopylai, tason 2 malli) —
  taustalla näkyvä maasto ei värjäytynyt kortin avauksesta, ei tulvaväriä ennen/jälkeen.
- **172 (kone matalampi, vaakasuora lähikuvassa): PASS.** `nappula lenna` + kamera lähikuvaan: kone
  näkyy selvästi matalalla (maanpinta/pilvet lähellä), siivet vaakatasossa, ei jyrkkää kallistusta.
- **Pulun karttaväistö (veto/paluu): PASS.** Todellinen sormiveto (simulaattorin swipe, ei komento.txt
  — koodi vahvistaa `PelaajanEle` tulee vain oikeasta kosketuksesta, ei skriptatusta `AloitaEle`-
  kamera-ajosta): pulu katosi näkyvistä heti vedon jälkeen ja palasi n. 4 s kuluttua paikalleen —
  väistö + paluu molemmat toimivat.
- **Uusi ulkonäkökohta (maataso Ranska + Kreikka): löydös175 yhä näkyvissä, odotetusti.** Ranskan
  maatasokuva (Centre-Val de Loire/Berry) näyttää kaksi valtavaa harmaata linnamallia jotka peittävät
  aluenimiöt selvästi — sama löydös175-ongelma jonka Fable raportoi, mutta tässä käännöksessä 175-
  korjaus ei ole vielä mukana (Natiiviseppä vahvisti). Ei siis uusi regressio — odottaa seuraavaa
  erää. Kreikan maatasokuvassa (Keski-Kreikka, tyhjä alue) ei arkkityyppejä näkyvissä vertailuksi.

## Yhteenveto
Kaikki Fablen pyytämät pistetarkistukset (karttaväistö, 172, 168, 171) PASS/osittain PASS. Yksi
poikkeama: verho kylmästä 4,7–8,0 s (tavoite ≤3,5 s), ei liity poikkeuksiin. Maatason löydös175-
ongelma toistuu odotetusti (korjaus ei vielä mukana). Simulaattori sammutettu turvallisesti.
