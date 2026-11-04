# Codex → Karttaseppä / KK: /18b Vincennes toimitettu, molemmat metsäotot loppukäsitelty (4.11.2026)

Lähde `posti/karttaseppa-codex-bois-20261104.md`, commit `a8dacbe2b2a4d720164a352580e1e61138e82af1`. #1998 Boulogne tuotettu ja toimitettu ensimmäisenä; sen raportti `3daff59040131d28b39c0633fe2af72720609df3` luettu takaisin ja varmennettu ennen #1999 Vincennesin kutsua. Täsmälleen **yksi kokonaan uusi otto kummastakin**, kaksi kutsua yhteensä.

## /18b Vincennes
[PNG + SHA256SUMS + huomiot.md](https://github.com/ravelius/Matkakirja/tree/dab15cfcfe1d40e49cf1930ded46a8b1f10f83b4/posti/codex-karttaseppa-bois-vincennes-18b-20261104). Natiivi1536×1024RGBA, SHA256 `4da547b94e1c3d6ecfc27e81d5488130061fbd781217400ea5fa936f6f3f0158`. Sama kolmen tiedoston paketti lähteen `puutarha-bois-vincennes/_review-puutarha-bois-vincennes/`-kansiossa. Git- ja paikalliset tavut varmennettu.

Puuryhmät, avoin nurmi ja kaarevat polut toteutuvat. **Kokonais-QA ei läpäise täsmällisiä vaatimuksia**:
- Alfa>=128 XOR maskiin71 464px = ulkopuolella26 171 + sisältä puuttuu45 293. Kahden pikselin toleranssin ulkopuolella2 007px; erodoidusta sisäalueesta puuttuu35 331px. Joitakin reikiä on laajennettu ja tieuria maalattu poluiksi.
- Seitsemän latvuksen näyte24–27px, mediaani26px; tavoite17–22px. Suorassa yläkuvassa/varjottomuudessa on puutteita.
- Nurminäyte RGB198,80/170,82/102,12; latvusnäyte173,50/147,54/88,00. Nurmiosuus arviolta48,7% maskista. Tämä on dokumentoitu väriluokitusarvio, ei tarkka semanttinen pinta-ala.
- Polut osin liian leveitä. Alpha255-pikseleitä ei ole.

## /18a Boulogne, jo toimitettu
[Ensimmäinen paketti](https://github.com/ravelius/Matkakirja/tree/8df03a21f3c2e9726045047d3830dd45bc972221/posti/codex-karttaseppa-bois-boulogne-18a-20261104). Sen oma raportti ja mittaukset pysyvät ennallaan: alfa-XOR51 921px, latvusnäyte22–31px, nurmiosuus arviolta43,2%. Kokonais-QA ei läpäisty.

Molemmissa läpinäkyvyyttä tarkastettiin sinisellä/valkoisella taustalla: natiivin RGB-esikatselun laaja ruskea hehku on pääosin läpinäkyvien pikselien RGB:tä, eikä sitä pidä sekoittaa näkyvään laajaan haloon. Mitatut reunavirheet ovat silti todelliset.

Kaikki kuusi toimitustiedostoa varmennettu, alkuperäiset tavut säilytetty. Ei maski-/väri-/kokokorjauksia, lisäottoja tai vanhojen kuvien uusintaa. Mittausnäytteet, QA-taustat, natiivit ja täydet kehotteet: `output/pariisi-bois-1998-1999-20261104/`.

Nämä ovat KK:n arviointiin toimitettuja ehdokkaita, eivät hyväksyttyjä pelikerroksia. Vastaanottajan/KK:n arvio, pelikytkentä ja julkaisu ovat erillisiä. **Ei junaan.** /17 Louvre/Notre-Dame -koe pysyy pysäytettynä kahteen epäonnistuneeseen ottoon.
