# puutarha-bois-vincennes — tilaus #1999, yksi otto

Lähde posti/karttaseppa-codex-bois-20261104.md, commit a8dacbe2b2a4d720164a352580e1e61138e82af1, blob 73046b7cabc1ceffa0e3b1a810d231bd815f0ba7. Posti, TILAUS.md ja kaikki 9 manifestiliitettä luettu, kuvat tarkastettu ja SHA256-varmennettu.

Yksi kokonaan uusi sisäänrakennetun image_gen-työkalun kutsu. Natiivi 1536 × 1024 RGBA, SHA256 4da547b94e1c3d6ecfc27e81d5488130061fbd781217400ea5fa936f6f3f0158. Alkuperäiset PNG-tavut säilytetty: ei alfan, värien, koon tai kuvasisällön jälkikorjausta. Vanhoja kuvia ei muutettu.

## Mittaukset
- Alpha>=128 XOR maskiin **71464 px** = ulkopuolella 26171 + sisältä puuttuu 45293. IoU 0.908488.
- Täsmällinen alfaero 819277 px. Kahden pikselin toleranssin ulkopuolella alpha>=128 2007 px, alpha>=16 2637 px, alpha>0 22870 px; erodoidun sisäalueen puuttuvia alpha>=128 35331 px.
- Alfan min/max [0, 254]; alpha0 781197 px, alpha255 0 px.
- Yksittäisten latvusten käsin rajattu 7 latvuksen näyte: leveydet **[25, 26, 27, 24, 27, 26, 27] px**, mediaani 26 px, tavoite [17, 22] px. Rajausarvion epävarmuus noin ±2 px; tämä ei mittaa jokaista latvusta.
- Nurmen näytteiden keskiarvo **RGB [198.8, 170.82, 102.12]**, tavoite [196,170,106]. Latvusten ellipsinäytteiden keskiarvo **RGB [173.5, 147.54, 88.0]**, tavoite [176,148,104].
- Nurmen osuus maskista **arviolta 48.7 %**. Menetelmä on mitattujen nurmi-/latvuskeskiarvojen ja polkusävyn lähimmän RGB-värin luokittelu maskin sisällä alpha>=128; latvusten valokohdat ja nurmen tekstuuri sekoittuvat, joten tämä ei ole tarkka semanttinen pinta-ala. Näytteet ja kaava säilytetty QA-tiedostossa.

## Silmämääräinen arvio
Erilliset puuryhmät ja niiden väliset avoimet nurmialueet muodostavat rauhallisen kokonaisuuden. Kaarteiset pääpolut hahmottuvat. Järvien ja rakennusten kohdalla on läpinäkyviä reikiä; sinisellä tarkastustaustalla ei näy natiivin RGB-esikatselun laajaa ruskeaa hehkua. Näkyvät latvukset ovat pääosin pyöreitä, mutta kuvakulma on lievästi vino ja puiden alla on tummia maavarjon kaltaisia alueita. Useita maskin sisäalueita, mm. kaakon urheilualueen ympäristöä, on jätetty läpinäkyväksi liian laajasti.

Poikkeamat:
- Alfa ei vastaa maskia: alpha>=128 XOR 71464 px. Sisäalueelta puuttuu 45293 px; 2 px erodoidusta sisäalueesta puuttuu edelleen 35331 px.
- Suuria mustia tieuria on muutettu maalatuiksi poluiksi; kaikkien reikien muodot ja rajat eivät säily.
- Latvusten seitsemän kohteen näyte on tavoitetta 17–22 px suurempi; suorassa yläkuvassa ja varjottomuudessa on puutteita.
- Polut ovat osin yli 2–4 px leveitä. Nurmen ja latvusten sävyt poikkeavat näytteissä tavoitekeskiarvoista.
- Alpha255-pikseleitä ei ole.

**Kokonais-QA: EI LÄPÄISTY.** Kuva toimitetaan yhden sallitun oton arviointikuvana. Vastaanottajan/KK:n hyväksyntä, mahdolliset vastaanottajan korjaukset, pelikytkentä ja julkaisu ovat erillisiä tiloja. Ei junaan.

Alkuperäinen, QA-taustat, mittausnäytteet ja täysi kehote prompt.json: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-bois-1998-1999-20261104/puutarha-bois-vincennes
