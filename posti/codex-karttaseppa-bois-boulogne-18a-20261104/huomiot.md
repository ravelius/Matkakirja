# puutarha-bois-boulogne — tilaus #1998, yksi otto

Lähde posti/karttaseppa-codex-bois-20261104.md, commit a8dacbe2b2a4d720164a352580e1e61138e82af1, blob 73046b7cabc1ceffa0e3b1a810d231bd815f0ba7. Posti, TILAUS.md ja kaikki 9 manifestiliitettä luettu, kuvat tarkastettu ja SHA256-varmennettu.

Yksi kokonaan uusi sisäänrakennetun image_gen-työkalun kutsu. Natiivi 1536 × 1024 RGBA, SHA256 9c39682c8aa57f257b4c8ea81188560479a469f1b50d2edac5a2944f3c073363. Alkuperäiset PNG-tavut säilytetty: ei alfan, värien, koon tai kuvasisällön jälkikorjausta. Vanhoja kuvia ei muutettu.

## Mittaukset
- Alpha>=128 XOR maskiin **51921 px** = ulkopuolella 35479 + sisältä puuttuu 16442. IoU 0.908272.
- Täsmällinen alfaero 610436 px. Kahden pikselin toleranssin ulkopuolella alpha>=128 8085 px, alpha>=16 9370 px, alpha>0 36552 px; erodoidun sisäalueen puuttuvia alpha>=128 4671 px.
- Alfan min/max [0, 254]; alpha0 963890 px, alpha255 0 px.
- Yksittäisten latvusten käsin rajattu 7 latvuksen näyte: leveydet **[28, 30, 31, 28, 25, 23, 22] px**, mediaani 28 px, tavoite [16, 21] px. Rajausarvion epävarmuus noin ±2 px; tämä ei mittaa jokaista latvusta.
- Nurmen näytteiden keskiarvo **RGB [204.22, 175.21, 104.03]**, tavoite [196,170,106]. Latvusten ellipsinäytteiden keskiarvo **RGB [175.12, 147.82, 84.64]**, tavoite [176,148,104].
- Nurmen osuus maskista **arviolta 43.2 %**. Menetelmä on mitattujen nurmi-/latvuskeskiarvojen ja polkusävyn lähimmän RGB-värin luokittelu maskin sisällä alpha>=128; latvusten valokohdat ja nurmen tekstuuri sekoittuvat, joten tämä ei ole tarkka semanttinen pinta-ala. Näytteet ja kaava säilytetty QA-tiedostossa.

## Silmämääräinen arvio
Puuryhmät erottuvat toisistaan ja välissä on runsaasti nurmea sekä kaarevia vaaleita polkuja; yhtenäinen metsämatto vältettiin. Pääjärvien ja monien rakennusten reiät ovat läpinäkyviä. Sinisellä ja valkoisella taustalla ei näy natiivin RGB-esikatselun laajaa ruskeaa hehkua; se on pääosin läpinäkyvien pikselien väriä. Täsmälliset alfaerot silti ylittävät toleranssin. Puut näkyvät lievästi vinosta, ja monessa on näkyvä runko sekä pieni maavarjo. Nurmi on lämmin kultainen, latvukset tummempia oliivinruskeita.

Poikkeamat:
- Maskin reiät, suuret tieaukot ja reunat eivät täsmää pikselilleen; useita mustia tieuria on piirretty vaaleiksi poluiksi. Alfaero ylittää 2 px toleranssin.
- Yksittäisten latvusten näyte on pääosin tavoitetta 16–21 px suurempi.
- Suoraan ylhäältä -ehto ei toteudu täysin: näkyviä runkoja ja maavarjoja.
- Polut ovat useissa kohdissa yli pyydetyn 2–4 px leveitä.
- Nurmen ja latvusten sävyt poikkeavat mitatuissa näytteissä tavoitekeskiarvoista. Alfan täysin peittäviä 255-pikseleitä ei ole.

**Kokonais-QA: EI LÄPÄISTY.** Kuva toimitetaan yhden sallitun oton arviointikuvana. Vastaanottajan/KK:n hyväksyntä, mahdolliset vastaanottajan korjaukset, pelikytkentä ja julkaisu ovat erillisiä tiloja. Ei junaan.

Alkuperäinen, QA-taustat, mittausnäytteet ja täysi kehote prompt.json: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-bois-1998-1999-20261104/puutarha-bois-boulogne
