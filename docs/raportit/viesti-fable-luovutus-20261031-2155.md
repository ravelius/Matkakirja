# PT:n luovutus 31.10.2026 klo 21.55

Edellinen: viesti-fable-luovutus-20261031-1855.md. Viestit aina id:llä (mcp__ccd_session_mgmt__send_message). Osoitteet: /Users/Shared/Claude/osoitekirja.md.

## OMISTAJAN PÄÄTÖKSET TÄLTÄ VUOROLTA (kaikki lokissa)
- **21.08 JUNA 216 LÄHTEE, KUN PARIISIN UUSI KARTTA VALMISTUU** (PR 5745). Ehdot: Pariisin piirroskartta pelissä valmis + valo
  omistajan hyväksymä; muut karttatyöt valmiit. KK tarkistaa Pariisin pelistä G-kuvaa vasten ennen TF:ää; ei uutta julkaisupyyntöä.
- **19.52 "Tehkää Pariisi valmiiksi"** (PR 5735) ja 19.40 G-tyyli hyväksytty Codexissa (PR 5734). Välivaiheet vain PT:lle.
- **21.07 museoiden metrokartta kuin kaupunkikierroksella** (PR 5744): NUI, junaan 216. PT:n linjaus: napautus EI muutu
  (omistaja 20.10. 09.38: teoksen nimi ja seinäkyltti → teoskortti, Teosluettelo → kartta; salissa nimi → kartta). KK:lle kerrottu.
- **21.26 "sessioiden kontekstit eivät pysy kurissa"** + sovellus kaatui ~21.27 → oppi lokissa (PR 5746).

## PARIISI (junan ehto) – tila 21.55
- KS:n lukittu pohja 5 × 7 = 35 palaa (1af3ccf98), projektio sovitettu G:n 11 maamerkkiin.
- Codex ei pysty lukitsemaan geometriaa (posti 1d986baa7, 0/35) → PT hyväksyi HYBRIDIN (acc26b3c0): KS renderöi tavallisen
  kaupungin G-tyyliin, Codex piirtää 9 maamerkkiä + puut/ihmiset/autot/veneet/koneet läpinäkyvinä (KS:n tilaus 88455ded8).
  Referenssi = ALKUPERÄINEN G (pariisi-piirroskartta-G-ilman-punaisia-korostuksia.png, SHA 7c4eac47…).
- KS:n koepala r3-c4 HYLÄTTY (ei näytä G:ltä): puuttuu mustekehys, liian tumma ja tiheä, talot kattokarttana, Seine ja puut.
  Uusi koepala PT:lle ennen koko kaupunkia.
- Natiivikerros 00b0ac3ac (häivytys, Suorista = NUI 5f5890e66, kamera piirroskulmaan) toimii simussa; web f9657ff11.
  Piirroskartalla miniatyyrit piiloon, ihmetähdet ja nimiöt jäävät.
- KS 75 % → luovutus ja nollaus käynnissä (Postivahti).

## VALO (junan ehto)
- VS: koekohtauksen 06 lopullinen pari (kiilto 0,2/0,25 + lodkerroin 5) ajossa → kuvat + värimittaus → PT → KK → omistaja.
- Junassa 216 ec0554ca8: leivottu valo (kerroin 1; osasarja-v6, leivonta-v3, tausta-v87 R2:ssa 20.45, uudet polut).
- Notre-Dame v6k29 R2:ssa, uusin-5.json → v6k29 (vain 216 lukee; uusin-4 → v6k26 ja uusin-3 koskemattomat, uusin-4 vaihdetaan
  vasta lukituksessa). NUI:n simukuva v6k29:stä odottaa.

## REITTIVALINTA (KK:n ehdot ennen omistajaa)
- c3 ok (kamera, 13 sivueunukkia). c4: kohdat 1–2 PK d2e2ab9c2; LAV tausta-v89 = laatan leikkaus pohjoiskäytävän päältä
  (Longzongmen on oikea portti) + porttiaukot + VS:n harmaat kiilat. PK: c4 kokonaisena KK:lle v89:n jälkeen; kulku portin
  läpi erillisenä lisänä. LOD-erä 06fed34e2 (muistimittaus → NS).

## AVOIN
- KONTEKSTIVAHTI-koukku roolien kansioihin = settings.json → vain omistajan omalla viestillä (KK:lle kerrottu).
- Postivahti: kaikkien kontekstit joka kierros YKSI KERRALLAAN (KIERROS.md).
- Viikko 84 % klo 19.00.

## Säännöt, jotka opin
- Media-vienti: JU tarkistaa aina, ettei julkaistu TF lue polkua tai osoitinta; juna 216 lukee uusin-5.json.
- Kun omistajan uusi päätös näyttää kumoavan vanhan, mutta sanamuoto ei kata kohtaa (napautus), vanha linja pysyy ja KK:lle tiedoksi.
